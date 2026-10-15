import { PA_MONGOLIA_BOUNDING_BOX_COORDS } from 'components/HomePage/MapComponent/consts'
import { getAQIFromPM2, getAQIColor } from 'components/HomePage/MapComponent/utils'
import { logger } from '../../logger'
import { StationType } from '../types'

const PA_FIELDS = 'name,last_seen,location_type,latitude,longitude,pm2.5'
const PA_GET_SENSORS_DATA = `https://api.purpleair.com/v1/sensors?fields=${PA_FIELDS}&nwlng=${PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LNG}&nwlat=${PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LAT}&selng=${PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LNG}&selat=${PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LAT}`
const MAX_RETRIES = 1
const DEFAULT_RETRY_DELAY_MS = 1000
const MAX_TIMEOUT_MS = 2_147_483_647

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function boundedRetryDelay(milliseconds: number): number {
  return Math.min(MAX_TIMEOUT_MS, Math.max(0, milliseconds))
}

function retryAfterHeaderDelay(retryAfter: string | null): number {
  if (!retryAfter) {
    return DEFAULT_RETRY_DELAY_MS
  }

  const seconds = Number(retryAfter.trim())
  if (Number.isFinite(seconds)) {
    return boundedRetryDelay(seconds * 1000)
  }

  const retryAt = Date.parse(retryAfter)
  return Number.isNaN(retryAt) ? DEFAULT_RETRY_DELAY_MS : boundedRetryDelay(retryAt - Date.now())
}

function initializationRetryDelay(description?: string): number {
  // Couldn't find a definitive source of how description should look like when DataInitializingError is returned.
  const delay = description?.match(/(\d+(?:\.\d+)?)\s*(milliseconds?|ms|seconds?|s|minutes?|m)/i)
  if (!delay) {
    return DEFAULT_RETRY_DELAY_MS
  }

  const unit = delay[2].toLowerCase()
  const millisecondsPerUnit: Record<string, number> = {
    ms: 1,
    millisecond: 1,
    milliseconds: 1,
    s: 1000,
    second: 1000,
    seconds: 1000,
    m: 60_000,
    minute: 60_000,
    minutes: 60_000,
  }

  return boundedRetryDelay(Number(delay[1]) * millisecondsPerUnit[unit])
}

function wait(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function formatPurpleAirError(payload: unknown, fallback: string): Error {
  const errorPayload = isRecord(payload) ? payload : {}
  const errorCode = typeof errorPayload.error === 'string' ? errorPayload.error : undefined
  const description = typeof errorPayload.description === 'string' ? errorPayload.description : undefined
  const message = description ? `${errorCode ?? fallback}: ${description}` : (errorCode ?? fallback)
  return new Error(message)
}

async function parseResponseBody(response: Response): Promise<unknown> {
  let body: string
  try {
    body = await response.text()
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    if (!response.ok) {
      return null
    }
    throw new Error(`PurpleAir response body could not be read: ${reason}`)
  }

  if (!body) {
    return null
  }

  try {
    return JSON.parse(body) as unknown
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error
    }
    if (!response.ok) {
      return null
    }
    throw new Error('PurpleAir response body is not valid JSON')
  }
}

async function fetchSensorData() {
  const apiKey = process.env.PURPLE_AIR_API_KEY
  if (!apiKey) {
    throw new Error('PURPLE_AIR_API_KEY is not configured')
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const attemptNumber = attempt + 1
    const requestStartedAt = Date.now()
    logger.info({
      component: 'purple-air',
      attempt: attemptNumber,
      maxAttempts: MAX_RETRIES + 1,
    }, 'Starting sensor request')

    let response: Response
    try {
      response = await fetch(PA_GET_SENSORS_DATA, {
        headers: { 'x-api-key': apiKey },
      })
    } catch (error) {
      logger.error({
        component: 'purple-air',
        attempt: attemptNumber,
        durationMs: Date.now() - requestStartedAt,
        err: error,
      }, 'Sensor request failed before receiving a response')
      throw error
    }

    logger.info({
      component: 'purple-air',
      attempt: attemptNumber,
      status: response.status,
      ok: response.ok,
      durationMs: Date.now() - requestStartedAt,
    }, 'Sensor response received')
    const data = await parseResponseBody(response)

    if (response.status === 429) {
      if (attempt >= MAX_RETRIES) {
        throw formatPurpleAirError(data, 'PurpleAir rate limit exceeded')
      }

      const retryDelayMs = retryAfterHeaderDelay(response.headers.get('Retry-After'))
      logger.warn({
        component: 'purple-air',
        nextAttempt: attemptNumber + 1,
        retryDelayMs,
      }, 'Rate limited; retrying sensor request')
      await wait(retryDelayMs)
      continue
    }

    if (!response.ok) {
      throw formatPurpleAirError(data, `PurpleAir request failed with HTTP ${response.status}`)
    }

    if (!isRecord(data)) {
      throw new Error('PurpleAir response must be a JSON object')
    }

    if (data?.error === 'DataInitializingError') {
      if (attempt >= MAX_RETRIES) {
        throw formatPurpleAirError(data, 'PurpleAir data is initializing')
      }

      const retryDelayMs = initializationRetryDelay(
        typeof data.description === 'string' ? data.description : undefined,
      )
      logger.warn({
        component: 'purple-air',
        nextAttempt: attemptNumber + 1,
        retryDelayMs,
      }, 'Sensor data is initializing; retrying request')
      await wait(retryDelayMs)
      continue
    }

    if (data?.error) {
      throw formatPurpleAirError(data, 'PurpleAir API request failed')
    }

    return data
  }
}

export const fetchPurpleAirStations = async () => {
  const stations: StationType[] = []
  const data = await fetchSensorData()

  if (!Array.isArray(data.fields) || !Array.isArray(data.location_types) || !Array.isArray(data.data)) {
    throw new Error('PurpleAir response is missing fields, location_types, or data')
  }

  const fields = data.fields
  const locationTypes = data.location_types
  const rawStations = data.data.map(station =>
    station.reduce((sensor, value, index) => {
      sensor[fields[index]] = value
      return sensor
    }, {}),
  )

  const validStations = rawStations.flatMap(sensor => {
    const rawPm25 = sensor['pm2.5']
    if (typeof rawPm25 !== 'number' && typeof rawPm25 !== 'string') {
      return []
    }

    const pm2 = Number(typeof rawPm25 === 'string' ? rawPm25.trim() : rawPm25)
    return Number.isFinite(pm2) && pm2 > 0 ? [{ sensor, pm2 }] : []
  })
  logger.info({
    component: 'purple-air',
    sensorsReceived: rawStations.length,
    sensorsWithValidPm25: validStations.length,
  }, 'Processing sensor response')

  validStations.forEach(({ sensor, pm2 }) => {
    try {
      const stationAQI = getAQIFromPM2(pm2)
      const locationType = locationTypes[sensor['location_type']]

      stations.push({
        name: sensor.name,
        pollution: { aqius: stationAQI, p2: pm2, ts: sensor.last_seen * 1000 },
        location: { coordinates: [sensor.longitude, sensor.latitude] },
        type: locationType === 'outside' ? 'outdoor' : 'indoor',
        sponsoredBy: 'Purple Air',
        color: getAQIColor(stationAQI),
      })
    } catch (error) {
      logger.error({
        component: 'purple-air',
        sensorName: sensor.name,
        err: error,
      }, 'Failed to convert sensor')
    }
  })

  logger.info({
    component: 'purple-air',
    stationsReturned: stations.length,
  }, 'Sensor request completed')
  return stations
}

import { PA_MONGOLIA_BOUNDING_BOX_COORDS } from 'components/HomePage/MapComponent/consts'
import { getAQIFromPM2, getAQIColor } from 'components/HomePage/MapComponent/utils'
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
  const delay = description?.match(/(\d+(?:\.\d+)?)\s*(milliseconds?|ms|seconds?|s|minutes?|m)/i)
  if (!delay) {
    return DEFAULT_RETRY_DELAY_MS
  }

  const unit = delay[2].toLowerCase().replace(/s$/, '')
  const millisecondsPerUnit: Record<string, number> = {
    ms: 1,
    millisecond: 1,
    s: 1000,
    second: 1000,
    m: 60_000,
    minute: 60_000,
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
  const message = description
    ? `${errorCode ?? fallback}: ${description}`
    : (errorCode ?? fallback)
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
    const response = await fetch(PA_GET_SENSORS_DATA, {
      headers: { 'x-api-key': apiKey },
    })
    const data = await parseResponseBody(response)

    if (response.status === 429) {
      if (attempt >= MAX_RETRIES) {
        throw formatPurpleAirError(data, 'PurpleAir rate limit exceeded')
      }

      await wait(retryAfterHeaderDelay(response.headers.get('Retry-After')))
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

      await wait(initializationRetryDelay(
        typeof data.description === 'string' ? data.description : undefined,
      ))
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

  const validStations = rawStations.filter(sensor => parseInt(sensor['pm2.5']) > 0)

  validStations.forEach(sensor => {
    const pm2 = parseInt(sensor['pm2.5'])
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
  })

  return stations
}

import { getAQIColor, getAQIFromPM2, hasStationUpdatedWithinLastWeek } from 'components/HomePage/MapComponent/utils'
import { logger } from '../../logger'
import { StationType } from '../types'

const OPENAQ_API_URL = 'https://api.openaq.org/v3'
const OPENAQ_COUNTRY_CODE = 'MN'
const PM25_PARAMETER_ID = 2
const MAX_LOCATIONS = 1000

interface OpenAQLocation {
  id: number
  name: string
  latitude: number
  longitude: number
  providerName?: string
  pm25SensorIds: Set<number>
}

interface OpenAQReading {
  value: number
  timestamp: string
  timestampMs: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function fetchResults(url: string, apiKey: string): Promise<unknown[]> {
  const response = await fetch(url, {
    headers: { 'X-API-Key': apiKey },
  })

  let data: unknown = null
  try {
    data = await response.json()
  } catch (error) {
    if (response.ok) {
      const reason = error instanceof Error ? error.message : String(error)
      throw new Error(`OpenAQ response is not valid JSON: ${reason}`)
    }
  }

  if (!response.ok) {
    const payload = isRecord(data) ? data : {}
    const message =
      typeof payload.message === 'string'
        ? payload.message
        : typeof payload.detail === 'string'
          ? payload.detail
          : undefined
    logger.error(
      {
        component: 'open-aq',
        status: response.status,
      },
      'OpenAQ request returned an unsuccessful response',
    )
    throw new Error(`OpenAQ request failed with HTTP ${response.status}${message ? `: ${message}` : ''}`)
  }

  if (!isRecord(data) || !Array.isArray(data.results)) {
    throw new Error('OpenAQ response is missing a results array')
  }

  return data.results
}

function parseLocation(value: unknown): OpenAQLocation {
  if (!isRecord(value) || typeof value.id !== 'number' || typeof value.name !== 'string') {
    throw new Error('OpenAQ locations response contains an invalid location')
  }

  const coordinates = value.coordinates
  if (
    !isRecord(coordinates) ||
    typeof coordinates.latitude !== 'number' ||
    typeof coordinates.longitude !== 'number' ||
    !Array.isArray(value.sensors)
  ) {
    throw new Error(`OpenAQ location ${value.id} is missing coordinates or sensors`)
  }

  const pm25SensorIds = new Set<number>()
  value.sensors.forEach(sensor => {
    if (
      isRecord(sensor) &&
      typeof sensor.id === 'number' &&
      isRecord(sensor.parameter) &&
      sensor.parameter.id === PM25_PARAMETER_ID
    ) {
      pm25SensorIds.add(sensor.id)
    }
  })

  const providerName =
    isRecord(value.provider) && typeof value.provider.name === 'string' ? value.provider.name : undefined

  return {
    id: value.id,
    name: value.name,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    providerName,
    pm25SensorIds,
  }
}

function parseLatestPm25(results: unknown[], sensorIds: Set<number>): OpenAQReading | undefined {
  let latestReading: OpenAQReading | undefined

  results.forEach(result => {
    if (!isRecord(result) || typeof result.sensorsId !== 'number' || !sensorIds.has(result.sensorsId)) {
      return
    }

    const datetime = result.datetime
    if (!isRecord(datetime) || typeof datetime.utc !== 'string') {
      return
    }

    const timestampMs = Date.parse(datetime.utc)
    const value =
      typeof result.value === 'number'
        ? result.value
        : typeof result.value === 'string' && result.value.trim()
          ? Number(result.value)
          : Number.NaN

    if (!Number.isFinite(timestampMs) || !Number.isFinite(value) || value < 0) {
      return
    }

    if (!latestReading || timestampMs > latestReading.timestampMs) {
      latestReading = {
        value,
        timestamp: datetime.utc,
        timestampMs,
      }
    }
  })

  return latestReading
}

export const fetchOpenAQStations = async () => {
  const apiKey = process.env.OPENAQ_API_KEY
  if (!apiKey) {
    throw new Error('OPENAQ_API_KEY is not configured')
  }

  const locationsUrl = new URL(`${OPENAQ_API_URL}/locations`)
  locationsUrl.searchParams.set('iso', OPENAQ_COUNTRY_CODE)
  locationsUrl.searchParams.set('parameters_id', String(PM25_PARAMETER_ID))
  locationsUrl.searchParams.set('limit', String(MAX_LOCATIONS))

  const locationResults = await fetchResults(locationsUrl.toString(), apiKey)
  const locations = locationResults.map(parseLocation)
  const locationsWithPm25 = locations.filter(location => location.pm25SensorIds.size > 0)

  const latestResults = await Promise.allSettled(
    locationsWithPm25.map(async location => ({
      location,
      results: await fetchResults(`${OPENAQ_API_URL}/locations/${location.id}/latest`, apiKey),
    })),
  )

  const successfulResults = latestResults.flatMap(result =>
    result.status === 'fulfilled' ? [result.value] : [],
  )
  const failedResults = latestResults.filter(result => result.status === 'rejected')

  latestResults.forEach((result, index) => {
    if (result.status !== 'rejected') {
      return
    }

    const location = locationsWithPm25[index]
    logger.error(
      {
        component: 'open-aq',
        locationId: location.id,
        err: result.reason,
      },
      'Failed to fetch latest OpenAQ readings for location',
    )
  })

  if (locationsWithPm25.length > 0 && successfulResults.length === 0) {
    throw new AggregateError(
      failedResults.map(result => result.reason),
      'Failed to fetch latest OpenAQ readings for all locations',
    )
  }

  const stations: StationType[] = []
  successfulResults.forEach(({ location, results }) => {
    const latestReading = parseLatestPm25(results, location.pm25SensorIds)
    if (!latestReading || !hasStationUpdatedWithinLastWeek(latestReading.timestamp, 'openAQ')) {
      return
    }

    const aqi = getAQIFromPM2(latestReading.value)
    stations.push({
      name: location.name,
      pollution: {
        aqius: aqi,
        p2: Math.trunc(latestReading.value),
        ts: latestReading.timestampMs,
      },
      location: { coordinates: [location.longitude, location.latitude] },
      type: 'outdoor',
      sponsoredBy: location.providerName ?? 'OpenAQ Unknown',
      color: getAQIColor(aqi),
    })
  })

  return stations
}

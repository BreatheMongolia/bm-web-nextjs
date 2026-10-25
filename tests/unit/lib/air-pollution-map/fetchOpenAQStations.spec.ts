import { getAQIColor, getAQIFromPM2, hasStationUpdatedWithinLastWeek } from '@bm-web-nextjs/components/HomePage/MapComponent/utils'
import { fetchOpenAQStations } from '@bm-web-nextjs/lib/air-pollution-map/api-hooks/fetchOpenAQStations'
import { vi } from 'vitest'

vi.mock('@bm-web-nextjs/components/HomePage/MapComponent/utils', () => ({
  getAQIColor: vi.fn(),
  getAQIFromPM2: vi.fn(),
  hasStationUpdatedWithinLastWeek: vi.fn(),
}))

function createResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status })
}

function createLocation(overrides: Record<string, unknown> = {}) {
  return {
    id: 123,
    name: 'Test Station',
    coordinates: { latitude: 47.92, longitude: 106.92 },
    provider: { name: 'Test Provider' },
    sensors: [
      { id: 456, parameter: { id: 2 } },
      { id: 789, parameter: { id: 1 } },
    ],
    ...overrides,
  }
}

function createReading(overrides: Record<string, unknown> = {}) {
  return {
    sensorsId: 456,
    value: 12.8,
    datetime: { utc: '2026-10-25T20:00:00.000Z' },
    ...overrides,
  }
}

describe('fetchOpenAQStations', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubGlobal('fetch', vi.fn())
    vi.stubEnv('OPENAQ_API_KEY', 'test-openaq-key')
    vi.mocked(getAQIFromPM2).mockReturnValue(50)
    vi.mocked(getAQIColor).mockReturnValue('yellow')
    vi.mocked(hasStationUpdatedWithinLastWeek).mockReturnValue(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('should reject before making a request when the API key is missing', async () => {
    const fetchMock = vi.mocked(fetch)
    vi.stubEnv('OPENAQ_API_KEY', '')

    await expect(fetchOpenAQStations()).rejects.toThrow('OPENAQ_API_KEY is not configured')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('should request OpenAQ v3 locations and convert their latest PM2.5 reading', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(createResponse({ results: [createLocation()] }))
      .mockResolvedValueOnce(
        createResponse({
          results: [
            createReading({ value: 12.8, datetime: { utc: '2026-10-25T19:00:00.000Z' } }),
            createReading({ sensorsId: 789, value: 100, datetime: { utc: '2026-10-25T21:00:00.000Z' } }),
            createReading({ value: 14.9, datetime: { utc: '2026-10-25T20:00:00.000Z' } }),
          ],
        }),
      )

    const stations = await fetchOpenAQStations()

    expect(stations).toEqual([
      {
        name: 'Test Station',
        pollution: {
          aqius: 50,
          p2: 14,
          ts: Date.parse('2026-10-25T20:00:00.000Z'),
        },
        location: { coordinates: [106.92, 47.92] },
        type: 'outdoor',
        sponsoredBy: 'Test Provider',
        color: 'yellow',
      },
    ])
    expect(getAQIFromPM2).toHaveBeenCalledWith(14.9)
    expect(getAQIColor).toHaveBeenCalledWith(50)
    expect(hasStationUpdatedWithinLastWeek).toHaveBeenCalledWith('2026-10-25T20:00:00.000Z', 'openAQ')

    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [locationsUrl, locationsConfig] = fetchMock.mock.calls[0]
    const parsedLocationsUrl = new URL(String(locationsUrl))
    expect(parsedLocationsUrl.origin).toBe('https://api.openaq.org')
    expect(parsedLocationsUrl.pathname).toBe('/v3/locations')
    expect(parsedLocationsUrl.searchParams.get('iso')).toBe('MN')
    expect(parsedLocationsUrl.searchParams.get('parameters_id')).toBe('2')
    expect(parsedLocationsUrl.searchParams.get('limit')).toBe('1000')
    expect(locationsConfig?.headers).toEqual({ 'X-API-Key': 'test-openaq-key' })
    expect(String(fetchMock.mock.calls[1][0])).toBe('https://api.openaq.org/v3/locations/123/latest')
    expect(fetchMock.mock.calls[1][1]?.headers).toEqual({ 'X-API-Key': 'test-openaq-key' })
  })

  it('should keep stations when fetching another location fails', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(
        createResponse({
          results: [
            createLocation(),
            createLocation({
              id: 124,
              name: 'Second Station',
              sensors: [{ id: 457, parameter: { id: 2 } }],
            }),
          ],
        }),
      )
      .mockRejectedValueOnce(new Error('First location unavailable'))
      .mockResolvedValueOnce(createResponse({ results: [createReading({ sensorsId: 457 })] }))

    const stations = await fetchOpenAQStations()

    expect(stations).toHaveLength(1)
    expect(stations[0]).toMatchObject({
      name: 'Second Station',
      location: { coordinates: [106.92, 47.92] },
    })
    expect(getAQIFromPM2).toHaveBeenCalledTimes(1)
  })

  it('should reject when fetching latest readings fails for every location', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(
        createResponse({
          results: [
            createLocation(),
            createLocation({
              id: 124,
              name: 'Second Station',
              sensors: [{ id: 457, parameter: { id: 2 } }],
            }),
          ],
        }),
      )
      .mockRejectedValueOnce(new Error('First location unavailable'))
      .mockRejectedValueOnce(new Error('Second location unavailable'))

    await expect(fetchOpenAQStations()).rejects.toThrow(
      'Failed to fetch latest OpenAQ readings for all locations',
    )
  })

  it('should exclude readings older than a week', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(createResponse({ results: [createLocation()] }))
      .mockResolvedValueOnce(createResponse({ results: [createReading()] }))
    vi.mocked(hasStationUpdatedWithinLastWeek).mockReturnValue(false)

    await expect(fetchOpenAQStations()).resolves.toEqual([])
    expect(getAQIFromPM2).not.toHaveBeenCalled()
  })

  it('should reject when the API returns an HTTP error', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(
      createResponse({ message: 'Version 2 endpoints are retired.' }, 410),
    )

    await expect(fetchOpenAQStations()).rejects.toThrow(
      'OpenAQ request failed with HTTP 410: Version 2 endpoints are retired.',
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should reject when the response is missing its results array', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(createResponse({}))

    await expect(fetchOpenAQStations()).rejects.toThrow('OpenAQ response is missing a results array')
  })

  it('should reject when the request fails', async () => {
    const fetchMock = vi.mocked(fetch)
    const error = new Error('Request failed')
    fetchMock.mockRejectedValueOnce(error)

    await expect(fetchOpenAQStations()).rejects.toBe(error)
  })
})

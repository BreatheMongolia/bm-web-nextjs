import { fetchPurpleAirStations } from '@bm-web-nextjs/lib/air-pollution-map/api-hooks/fetchPurpleAirStations'
import { getAQIFromPM2, getAQIColor } from '@bm-web-nextjs/components/HomePage/MapComponent/utils'
import { PA_MONGOLIA_BOUNDING_BOX_COORDS } from '@bm-web-nextjs/components/HomePage/MapComponent/consts'
import { vi } from 'vitest'

vi.mock('@bm-web-nextjs/components/HomePage/MapComponent/utils', () => ({
  getAQIFromPM2: vi.fn(),
  getAQIColor: vi.fn(),
}))

const fields = ['name', 'last_seen', 'location_type', 'latitude', 'longitude', 'pm2.5']

const locationTypes = ['outside', 'inside']

function createResponse(data: unknown, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(data ?? null), { status, headers })
}

interface SensorFixture {
  name: string
  last_seen: number
  location_type: number
  latitude: number | null
  longitude: number | null
  'pm2.5': number | string | null | undefined
}

function createSensor(overrides: Partial<SensorFixture> = {}): unknown[] {
  const sensor: SensorFixture = {
    name: 'Test Station',
    last_seen: 1700000000,
    location_type: 0,
    latitude: 47.92,
    longitude: 106.92,
    'pm2.5': 12,
    ...overrides,
  }

  return [sensor.name, sensor.last_seen, sensor.location_type, sensor.latitude, sensor.longitude, sensor['pm2.5']]
}

function createSUT() {
  const fetchMock = vi.mocked(fetch)
  const getAQIMock = vi.mocked(getAQIFromPM2)
  const getColorMock = vi.mocked(getAQIColor)

  getAQIMock.mockReturnValue(50)
  getColorMock.mockReturnValue('yellow')

  function givenSensors(rows: unknown[][]) {
    fetchMock.mockResolvedValueOnce(
      createResponse({
        fields,
        location_types: locationTypes,
        data: rows,
      }),
    )
  }

  return {
    sut: fetchPurpleAirStations,
    givenSensors,
    fetchMock,
    getAQIMock,
    getColorMock,
  }
}
describe('fetchPurpleAirStations', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubGlobal('fetch', vi.fn())
    vi.stubEnv('PURPLE_AIR_API_KEY', 'test-api-key')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('should return an empty list when no sensors are returned', async () => {
    const { sut, givenSensors, getAQIMock, getColorMock } = createSUT()
    givenSensors([])

    const stations = await sut()

    expect(stations).toEqual([])
    expect(getAQIMock).not.toHaveBeenCalled()
    expect(getColorMock).not.toHaveBeenCalled()
  })

  it('should reject before making a request when the API key is missing', async () => {
    const { sut, fetchMock } = createSUT()
    vi.stubEnv('PURPLE_AIR_API_KEY', '')

    await expect(sut()).rejects.toThrow('PURPLE_AIR_API_KEY is not configured')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('should convert a valid sensor into an outdoor station', async () => {
    const { sut, givenSensors, getAQIMock, getColorMock } = createSUT()
    givenSensors([createSensor()])

    const stations = await sut()

    expect(stations).toEqual([
      {
        name: 'Test Station',
        pollution: {
          aqius: 50,
          p2: 12,
          ts: 1700000000000,
        },
        location: {
          coordinates: [106.92, 47.92],
        },
        type: 'outdoor',
        sponsoredBy: 'Purple Air',
        color: 'yellow',
      },
    ])
    expect(getAQIMock).toHaveBeenCalledTimes(1)
    expect(getAQIMock).toHaveBeenCalledWith(12)
    expect(getColorMock).toHaveBeenCalledTimes(1)
    expect(getColorMock).toHaveBeenCalledWith(50)
  })

  it('should return multiple valid sensors in response order', async () => {
    const { sut, givenSensors, getAQIMock, getColorMock } = createSUT()

    givenSensors([
      createSensor(),
      createSensor({
        name: 'Second Station',
        last_seen: 1700000060,
        latitude: 48.1,
        longitude: 107.1,
        'pm2.5': 25,
      }),
    ])
    getAQIMock.mockReturnValueOnce(50).mockReturnValueOnce(100)
    getColorMock.mockReturnValueOnce('yellow').mockReturnValueOnce('orange')

    const stations = await sut()

    expect(stations).toEqual([
      {
        name: 'Test Station',
        pollution: {
          aqius: 50,
          p2: 12,
          ts: 1700000000000,
        },
        location: {
          coordinates: [106.92, 47.92],
        },
        type: 'outdoor',
        sponsoredBy: 'Purple Air',
        color: 'yellow',
      },
      {
        name: 'Second Station',
        pollution: {
          aqius: 100,
          p2: 25,
          ts: 1700000060000,
        },
        location: {
          coordinates: [107.1, 48.1],
        },
        type: 'outdoor',
        sponsoredBy: 'Purple Air',
        color: 'orange',
      },
    ])
    expect(getAQIMock).toHaveBeenNthCalledWith(1, 12)
    expect(getAQIMock).toHaveBeenNthCalledWith(2, 25)
    expect(getColorMock).toHaveBeenNthCalledWith(1, 50)
    expect(getColorMock).toHaveBeenNthCalledWith(2, 100)
  })

  it('should request sensors using the configured fields, bounding box, and API key', async () => {
    const { sut, givenSensors, fetchMock } = createSUT()
    givenSensors([])

    await sut()

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, config] = fetchMock.mock.calls[0]
    const url = new URL(String(requestUrl))

    expect(url.origin).toBe('https://api.purpleair.com')
    expect(url.pathname).toBe('/v1/sensors')
    expect(url.searchParams.get('fields')).toBe(fields.join(','))
    expect(url.searchParams.get('nwlng')).toBe(String(PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LNG))
    expect(url.searchParams.get('nwlat')).toBe(String(PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LAT))
    expect(url.searchParams.get('selng')).toBe(String(PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LNG))
    expect(url.searchParams.get('selat')).toBe(String(PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LAT))
    expect(config?.headers).toEqual({ 'x-api-key': 'test-api-key' })
  })

  it('should map values correctly when response fields are reordered', async () => {
    const { sut, fetchMock } = createSUT()

    fetchMock.mockResolvedValueOnce(
      createResponse({
        fields: ['pm2.5', 'longitude', 'name', 'latitude', 'location_type', 'last_seen'],
        location_types: locationTypes,
        data: [[12, 106.92, 'Reordered Station', 47.92, 0, 1700000000]],
      }),
    )

    const stations = await sut()

    expect(stations).toHaveLength(1)
    expect(stations[0]).toMatchObject({
      name: 'Reordered Station',
      pollution: {
        p2: 12,
        ts: 1700000000000,
      },
      location: {
        coordinates: [106.92, 47.92],
      },
      type: 'outdoor',
    })
  })

  it.each([
    { label: 'null', value: null },
    { label: 'nonnumeric string', value: 'invalid' },
    { label: 'zero', value: 0 },
    { label: 'negative value', value: -1 },
  ])('should exclude a sensor with a $label PM2.5 reading', async ({ value }) => {
    const { sut, givenSensors, getAQIMock, getColorMock } = createSUT()
    givenSensors([createSensor({ 'pm2.5': value })])

    const stations = await sut()

    expect(stations).toEqual([])
    expect(getAQIMock).not.toHaveBeenCalled()
    expect(getColorMock).not.toHaveBeenCalled()
  })

  it('should exclude a sensor when the PM2.5 field is absent', async () => {
    const { sut, fetchMock, getAQIMock } = createSUT()

    fetchMock.mockResolvedValueOnce(
      createResponse({
        fields: ['name', 'last_seen', 'location_type', 'latitude', 'longitude'],
        location_types: locationTypes,
        data: [['Test Station', 1700000000, 0, 47.92, 106.92]],
      }),
    )

    const stations = await sut()

    expect(stations).toEqual([])
    expect(getAQIMock).not.toHaveBeenCalled()
  })

  it('should retain valid sensors when other readings are invalid', async () => {
    const { sut, givenSensors, getAQIMock } = createSUT()

    givenSensors([
      createSensor({ name: 'Invalid Station', 'pm2.5': 'invalid' }),
      createSensor(), // This one is the valid sensor that should be returned
      createSensor({ name: 'Missing Station', 'pm2.5': null }),
    ])

    const stations = await sut()

    expect(stations).toHaveLength(1)
    expect(stations[0].name).toBe('Test Station')
    expect(getAQIMock).toHaveBeenCalledTimes(1)
  })

  it('should parse a numeric string PM2.5 reading', async () => {
    const { sut, givenSensors, getAQIMock } = createSUT()
    givenSensors([createSensor({ 'pm2.5': '25' })])

    const stations = await sut()

    expect(stations).toHaveLength(1)
    expect(stations[0].pollution.p2).toBe(25)
    expect(getAQIMock).toHaveBeenCalledWith(25)
  })

  it.each([
    { label: 'outside', locationType: 0, expectedType: 'outdoor' },
    { label: 'inside', locationType: 1, expectedType: 'indoor' },
  ])('should map the $label location type to $expectedType', async ({ locationType, expectedType }) => {
    const { sut, givenSensors } = createSUT()
    givenSensors([createSensor({ location_type: locationType })])

    const stations = await sut()

    expect(stations).toHaveLength(1)
    expect(stations[0].type).toBe(expectedType)
  })

  it('should reject when the response body is null', async () => {
    const { sut, fetchMock, getAQIMock } = createSUT()
    fetchMock.mockResolvedValueOnce(createResponse(null))

    await expect(sut()).rejects.toThrow('PurpleAir response must be a JSON object')
    expect(getAQIMock).not.toHaveBeenCalled()
  })

  it('should reject when the request fails', async () => {
    const { sut, fetchMock, getAQIMock } = createSUT()
    const error = new Error('Request failed')

    fetchMock.mockRejectedValueOnce(error)

    await expect(sut()).rejects.toBe(error)
    expect(getAQIMock).not.toHaveBeenCalled()
  })

  it('should use the default delay when the initialization description has no interval', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    fetchMock.mockResolvedValueOnce(
      createResponse({
        error: 'DataInitializingError',
        description: 'Please try again later.',
      }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(999)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should reject when the HTTP response is not successful', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(
      createResponse({ error: 'SyntheticApiError', description: 'The key is restricted.' }, 403),
    )

    await expect(sut()).rejects.toThrow('SyntheticApiError: The key is restricted.')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should use the API error code when the error response has no description', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(createResponse({ error: 'SyntheticApiError' }, 403))

    await expect(sut()).rejects.toThrow('SyntheticApiError')
  })

  it.each([
    {
      response: { description: 'Synthetic failure description.' },
      expectedMessage: 'PurpleAir request failed with HTTP 403: Synthetic failure description.',
    },
    {
      response: {},
      expectedMessage: 'PurpleAir request failed with HTTP 403',
    },
  ])('should use a fallback message when the error payload is incomplete', async ({ response, expectedMessage }) => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(createResponse(response, 403))

    await expect(sut()).rejects.toThrow(expectedMessage)
  })

  it('should reject an API error returned with HTTP 200', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(
      createResponse({
        error: 'SyntheticApiError',
        description: 'Synthetic API error for this unit test.',
      }),
    )

    await expect(sut()).rejects.toThrow('SyntheticApiError: Synthetic API error for this unit test.')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should use the fallback message when an API error code is malformed', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(createResponse({ error: { code: 'SyntheticApiError' } }))

    await expect(sut()).rejects.toThrow('PurpleAir API request failed')
  })

  it('should preserve the HTTP status when an error response is not JSON', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(new Response('<html>Bad Gateway</html>', { status: 502 }))

    await expect(sut()).rejects.toThrow('PurpleAir request failed with HTTP 502')
  })

  it('should reject a successful response with invalid JSON', async () => {
    const { sut, fetchMock } = createSUT()
    fetchMock.mockResolvedValueOnce(new Response('<html>Not JSON</html>', { status: 200 }))

    await expect(sut()).rejects.toThrow('PurpleAir response body is not valid JSON')
  })

  it.each([
    { interval: '500 ms', delayMs: 500 },
    { interval: '500 milliseconds', delayMs: 500 },
    { interval: '2 s', delayMs: 2000 },
    { interval: '2 seconds', delayMs: 2000 },
    { interval: '1 m', delayMs: 60_000 },
    { interval: '1 minute', delayMs: 60_000 },
  ])('should retry after $interval in a DataInitializingError description', async ({ interval, delayMs }) => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()

    fetchMock.mockResolvedValueOnce(
      createResponse({
        error: 'DataInitializingError',
        description: `Please retry after ${interval}.`,
      }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(delayMs - 1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should reject when data is still initializing after one retry', async () => {
    const { sut, fetchMock } = createSUT()
    vi.useFakeTimers()
    fetchMock
      .mockResolvedValueOnce(
        createResponse({
          error: 'DataInitializingError',
          description: 'Retry after 1 second.',
        }),
      )
      .mockResolvedValueOnce(
        createResponse({
          error: 'DataInitializingError',
          description: 'Retry after 1 second.',
        }),
      )

    const result = sut()
    const rejection = expect(result).rejects.toThrow('DataInitializingError: Retry after 1 second.')
    await vi.advanceTimersByTimeAsync(1000)

    await rejection
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should honor Retry-After for a 429 and then retry once', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    fetchMock.mockResolvedValueOnce(
      createResponse(
        {
          error: 'SyntheticRateLimitError',
          description: 'API call limit exceeded.',
        },
        429,
        { 'Retry-After': '2' },
      ),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(1999)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should honor an HTTP-date Retry-After value', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-05T12:00:00.000Z'))
    fetchMock.mockResolvedValueOnce(
      createResponse({ error: 'SyntheticRateLimitError' }, 429, {
        'Retry-After': new Date(Date.now() + 2000).toUTCString(),
      }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(2000)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should still retry a 429 response with a non-JSON body', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    fetchMock.mockResolvedValueOnce(
      new Response('<html>Rate limited</html>', {
        status: 429,
        headers: { 'Retry-After': '1' },
      }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(999)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should use the default delay for an invalid Retry-After value', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    fetchMock.mockResolvedValueOnce(
      createResponse({ error: 'SyntheticRateLimitError' }, 429, { 'Retry-After': 'not a date' }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(999)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should cap Retry-After at the maximum safe timer delay', async () => {
    const { sut, fetchMock, givenSensors } = createSUT()
    vi.useFakeTimers()
    fetchMock.mockResolvedValueOnce(
      createResponse({ error: 'SyntheticRateLimitError' }, 429, { 'Retry-After': '2147484' }),
    )
    givenSensors([])

    const result = sut()
    await vi.advanceTimersByTimeAsync(2_147_483_646)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await expect(result).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('should reject after a second 429 response', async () => {
    const { sut, fetchMock } = createSUT()
    vi.useFakeTimers()
    const rateLimitResponse = () =>
      createResponse(
        {
          error: 'SyntheticRateLimitError',
          description: 'API call limit exceeded.',
        },
        429,
      )
    fetchMock.mockResolvedValueOnce(rateLimitResponse()).mockResolvedValueOnce(rateLimitResponse())

    const result = sut()
    const rejection = expect(result).rejects.toThrow('SyntheticRateLimitError: API call limit exceeded.')
    await vi.advanceTimersByTimeAsync(999)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)

    await rejection
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it.each([
    {
      label: 'sensor list',
      response: {
        fields,
        location_types: locationTypes,
      },
    },
    {
      label: 'fields',
      response: {
        location_types: locationTypes,
        data: [createSensor()],
      },
    },
    {
      label: 'location types',
      response: {
        fields,
        data: [createSensor()],
      },
    },
  ])('should reject when $label are missing', async ({ response }) => {
    const { sut, fetchMock } = createSUT()

    fetchMock.mockResolvedValueOnce(createResponse(response))

    await expect(sut()).rejects.toThrow('PurpleAir response is missing fields, location_types, or data')
  })

  it('should log and skip a station conversion failure while processing remaining stations', async () => {
    const { sut, givenSensors, getAQIMock } = createSUT()
    const conversionError = new Error('AQI conversion failed')
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    givenSensors([
      createSensor({ name: 'First Station', 'pm2.5': 12 }),
      createSensor({ name: 'Failing Station', 'pm2.5': 25 }),
      createSensor({ name: 'Last Station', 'pm2.5': 30 }),
    ])

    getAQIMock.mockImplementation(pm25 => {
      if (pm25 === 25) {
        throw conversionError
      }
      return 50
    })

    const stations = await sut()

    expect(stations.map(station => station.name)).toEqual(['First Station', 'Last Station'])
    expect(getAQIMock.mock.calls.map(([pm25]) => pm25)).toEqual([12, 25, 30])
    expect(consoleError).toHaveBeenCalledWith(
      'failed to convert sensor "Failing Station":',
      conversionError,
    )
  })
})

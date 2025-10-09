import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { getTransformedDataFromOpenAQ } from '../../../components/HomePage/MapComponent/utils'
import { fetchOpenAQStations } from './fetchOpenAQStations'

jest.mock('../../../components/HomePage/MapComponent/utils', () => ({
  getTransformedDataFromOpenAQ: jest.fn(),
}))

describe('fetchOpenAQStations - DI Tests', () => {
  let mock: MockAdapter
  let mockLimiter: any
  let wrapSpy: jest.Mock
  const originalEnv = process.env
  const TEST_API_KEY = 'TEST_API_KEY'
  const OPEN_AQ_URL = 'https://api.openaq.org/v3/locations?country_id=104&limit=500&parameter_id=2'

  const mockApiResponse = {
    data: {
      results: [
        {
          id: 19,
          name: 'MNB',
          locality: null,
          timezone: 'Asia/Ulaanbaatar',
          country: {
            id: 47,
            code: 'MN',
            name: 'Mongolia',
          },
          owner: {
            id: 4,
            name: 'Unknown Governmental Organization',
          },
          provider: {
            id: 116,
            name: 'Agaar.mn',
          },
          isMobile: false,
          isMonitor: true,
          instruments: [
            {
              id: 2,
              name: 'Government Monitor',
            },
          ],
          sensors: [
            {
              id: 5139,
              name: 'pm25 µg/m³',
              parameter: {
                id: 2,
                name: 'pm25',
                units: 'µg/m³',
                displayName: 'PM2.5',
              },
            },
          ],
          coordinates: {
            latitude: 47.929732,
            longitude: 106.888629,
          },
          licenses: null,
          bounds: [106.888629, 47.929732, 106.888629, 47.929732],
          distance: null,
          datetimeFirst: {
            utc: '2016-01-30T00:30:00Z',
            local: '2016-01-30T08:30:00+08:00',
          },
          datetimeLast: {
            utc: '2019-03-13T22:30:00Z',
            local: '2019-03-14T06:30:00+08:00',
          },
        },
      ],
    },
  }

  const mockTransformedData = {
    MNB: {
      name: 'MNB',
      date: '2025-10-06T10:00:00Z',
      sponsoredBy: 'Agaar.mn',
      location: {
        coordinates: [106.888629, 47.929732],
      },
      pollution: {
        p2: 35,
        aqius: 101,
        ts: 1728288000000,
      },
      color: 'yellow',
      type: 'outdoor',
    },
  }

  type SUTParams = {
    mockResponse?: any
    shouldReject?: boolean
    error?: Error
    apiKey?: string | undefined
  }

  const createSUT = ({
    mockResponse,
    shouldReject = false,
    error = new Error('API Error'),
    apiKey = TEST_API_KEY,
  }: SUTParams = {}) => {
    process.env = { ...originalEnv, AQ_KEY: apiKey }

    mock = new MockAdapter(axios)

    if (shouldReject) {
      mock.onGet(OPEN_AQ_URL).replyOnce(() => Promise.reject(error))
    } else {
      mock.onGet(OPEN_AQ_URL).replyOnce(200, mockResponse?.data)
    }

    const expectedCallParams = {
      headers: {
        'X-API-Key': apiKey,
      },
    }

    return {
      execute: () => fetchOpenAQStations(mockLimiter),
      expectedUrl: OPEN_AQ_URL,
      expectedCallParams,
    }
  }

  beforeEach(() => {
    process.env = { ...process.env, AQ_KEY: TEST_API_KEY }

    // Create fresh mock limiter for each test
    wrapSpy = jest.fn()
    mockLimiter = {
      wrap: jest.fn(fn => {
        wrapSpy()
        return fn
      }),
    }
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
    mock.restore()
  })

  describe('successful cases', () => {
    it('should fetch and transform single station data successfully', async () => {
      const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: mockApiResponse })

      ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

      const result = await execute()

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(mockApiResponse.data)
      expect(result).toEqual([mockTransformedData['MNB']])
      expect(wrapSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple stations successfully', async () => {
      const multipleStationsResponse = {
        data: {
          results: [
            mockApiResponse.data.results[0],
            {
              ...mockApiResponse.data.results[0],
              name: 'MNB2',
            },
          ],
        },
      }

      const multipleStationsData = {
        MNB: {
          ...mockTransformedData['MNB'],
          name: 'MNB',
        },
        MNB2: {
          ...mockTransformedData['MNB'],
          name: 'MNB2',
        },
      }

      const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: multipleStationsResponse })

      ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(multipleStationsData)

      const result = await execute()

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(multipleStationsResponse.data)
      expect(result).toEqual([multipleStationsData['MNB'], multipleStationsData['MNB2']])
      expect(wrapSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle empty response data', async () => {
      const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: { data: null } })

      const result = await execute()

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(result).toEqual([]) // One thing I am unsure is wh
      expect(wrapSpy).toHaveBeenCalledTimes(1)
    })
  })
  describe('error cases', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error')
      const { execute, expectedUrl, expectedCallParams } = createSUT({ shouldReject: true, error: mockError })

      const consoleSpy = jest.spyOn(console, 'error')
      const result = await execute()

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(consoleSpy).toHaveBeenCalledWith(mockError)
      expect(result).toEqual([])
      expect(wrapSpy).toHaveBeenCalledTimes(1)
      consoleSpy.mockRestore()
    })

    it('should handle network timeout', async () => {
      const timeoutError = new Error('Network Timeout')
      timeoutError.name = 'TimeoutError'
      const { execute, expectedUrl, expectedCallParams } = createSUT({ shouldReject: true, error: timeoutError })

      const consoleSpy = jest.spyOn(console, 'error')
      const result = await execute()

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(consoleSpy).toHaveBeenCalledWith(timeoutError)
      expect(result).toEqual([])
      expect(wrapSpy).toHaveBeenCalledTimes(1)
      consoleSpy.mockRestore()
    })
  })

  describe('bottleneck edge cases', () => {
    it('should handle rate limiting with proper timing', async () => {
      jest.useFakeTimers()

      const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: mockApiResponse })
      ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

      const resultPromise = execute()

      // Fast-forward timers to simulate rate limiting delays
      jest.advanceTimersByTime(1000)

      const result = await resultPromise

      expect(mock.history.get[0].url).toBe(expectedUrl)
      expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
      expect(result).toEqual([mockTransformedData['MNB']])
      expect(wrapSpy).toHaveBeenCalledTimes(1)

      jest.useRealTimers()
    })

    it('should handle multiple sequential requests with limiter', async () => {
      jest.useFakeTimers()

      const { execute: execute1 } = createSUT({ mockResponse: mockApiResponse })
      ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

      const resultPromise1 = execute1()
      jest.advanceTimersByTime(1000)
      const result1 = await resultPromise1

      const { execute: execute2 } = createSUT({ mockResponse: mockApiResponse })
      ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

      const resultPromise2 = execute2()
      jest.advanceTimersByTime(1000)
      const result2 = await resultPromise2

      expect(result1).toEqual([mockTransformedData['MNB']])
      expect(result2).toEqual([mockTransformedData['MNB']])
      expect(wrapSpy).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
    })
  })
})

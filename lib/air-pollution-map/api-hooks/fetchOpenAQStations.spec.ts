import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchOpenAQStations } from './fetchOpenAQStations'
import { getTransformedDataFromOpenAQ } from '../../../components/HomePage/MapComponent/utils'

jest.mock('../../../components/HomePage/MapComponent/utils', () => ({
  getTransformedDataFromOpenAQ: jest.fn(),
}))

describe('fetchOpenAQStations', () => {
  let mock: MockAdapter
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
            }
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
    'Station Name Example': {
      name: 'Station Name Example',
      date: '2025-10-06T10:00:00Z',
      sponsoredBy: 'OpenAQ Unknown',
      location: {
        coordinates: [106.9176, 47.9213],
      },
      pollution: {
        p2: 35,
        aqius: 101,
        ts: 1696586400000,
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
    // Reset environment
    process.env = { ...originalEnv, AQ_KEY: apiKey }

    mock = new MockAdapter(axios)

    if (shouldReject) {
      mock.onGet(OPEN_AQ_URL).replyOnce(() => Promise.reject(error))
    } else {
      mock.onGet(OPEN_AQ_URL).replyOnce(200, mockResponse.data)
    }

    const expectedCallParams = {
      headers: {
        'X-API-Key': apiKey,
      },
    }

    return {
      execute: () => fetchOpenAQStations(),
      expectedUrl: OPEN_AQ_URL,
      expectedCallParams,
    }
  }

  beforeEach(() => {
    process.env = { ...process.env, AQ_KEY: TEST_API_KEY }
  })

  afterEach(() => {
    process.env = originalEnv
    mock.restore()
  })

  describe('successful cases', () => {
    describe('single station', () => {
      it('should fetch and transform single station data successfully', async () => {
        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: mockApiResponse });

        (getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

        const result = await execute()

        expect(mock.history.get[0].url).toBe(expectedUrl)
        expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
        expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(mockApiResponse.data)
        expect(result).toEqual([mockTransformedData['Station Name Example']])
      })
    })

    describe('multiple stations', () => {
      it('should handle multiple stations successfully', async () => {
        const multipleStationsResponse = {
          data: {
            results: [
              mockApiResponse.data.results[0],
              {
                ...mockApiResponse.data.results[0],
                name: 'MNB2'
              }
            ]
          }
        }

        const multipleStationsData = {
          'Station 1': {
            ...mockTransformedData['Station Name Example'],
            name: 'Station 1'
          },
          'Station 2': {
            ...mockTransformedData['Station Name Example'],
            name: 'Station 2'
          }
        }

        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: multipleStationsResponse });
        
        (getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(multipleStationsData)

        const result = await execute()

        expect(mock.history.get[0].url).toBe(expectedUrl)
        expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
        expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(multipleStationsResponse.data)
        expect(result).toEqual([multipleStationsData['Station 1'], multipleStationsData['Station 2']])
      })
    })

    describe('edge cases', () => {
      it('should handle empty response data', async () => {
        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: { data: null } })

        const result = await execute()

        expect(mock.history.get[0].url).toBe(expectedUrl)
        expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
        expect(result).toEqual([])
      })

      it('should handle empty results array', async () => {
        const emptyResponse = {
          data: {
            results: [],
          },
        }
        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: emptyResponse })

        const result = await execute()

        expect(mock.history.get[0].url).toBe(expectedUrl)
        expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
        expect(result).toEqual([])
      })

      it('should handle invalid coordinates', async () => {
        const invalidCoordinatesResponse = {
          data: {
            results: [
              {
                id: 3,
                name: 'Invalid Station',
                coordinates: {
                  latitude: NaN,
                  longitude: undefined,
                },
              },
            ],
          },
        }
        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: invalidCoordinatesResponse })

        const result = await execute()

        expect(mock.history.get[0].url).toBe(expectedUrl)
        expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
        expect(result).toEqual([])
      })
    })

    describe('error cases', () => {
      describe('authentication errors', () => {
        it('should handle missing API key', async () => {
          const { execute, expectedUrl, expectedCallParams } = createSUT({
            shouldReject: true,
            error: new Error('Unauthorized'),
            apiKey: undefined,
          })

          const result = await execute()

          expect(mock.history.get[0].url).toBe(expectedUrl)
          expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
          expect(result).toEqual([])
        })
      })

      describe('network errors', () => {
        it('should handle API errors gracefully', async () => {
          const mockError = new Error('API Error')
          const { execute, expectedUrl, expectedCallParams } = createSUT({ shouldReject: true, error: mockError })

          const consoleSpy = jest.spyOn(console, 'error')
          const result = await execute()

          expect(mock.history.get[0].url).toBe(expectedUrl)
          expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
          expect(consoleSpy).toHaveBeenCalledWith(mockError)
          expect(result).toEqual([])
          consoleSpy.mockRestore()
        })

        it('should handle rate limiting errors', async () => {
          const rateLimitError = new Error('Too Many Requests')
          rateLimitError.name = '429'
          const { execute, expectedUrl, expectedCallParams } = createSUT({ shouldReject: true, error: rateLimitError })

          const consoleSpy = jest.spyOn(console, 'error')
          const result = await execute()

          expect(mock.history.get[0].url).toBe(expectedUrl)
          expect(mock.history.get[0].headers['X-API-Key']).toBe(expectedCallParams.headers['X-API-Key'])
          expect(consoleSpy).toHaveBeenCalledWith(rateLimitError)
          expect(result).toEqual([])
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
          consoleSpy.mockRestore()
        })
      })
    })
  })
})

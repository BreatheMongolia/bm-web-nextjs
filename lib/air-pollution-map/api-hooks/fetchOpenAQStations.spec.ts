import axios from 'axios'
import { fetchOpenAQStations } from './fetchOpenAQStations'
import { getTransformedDataFromOpenAQ } from '../../../components/HomePage/MapComponent/utils'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('../../../components/HomePage/MapComponent/utils', () => ({
  getTransformedDataFromOpenAQ: jest.fn(),
}))

describe('fetchOpenAQStations', () => {
  const originalEnv = process.env
  const TEST_API_KEY = 'TEST_API_KEY'
  const OPEN_AQ_URL = 'https://api.openaq.org/v2/locations?country_id=104&limit=500&parameter_id=2'

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

    if (shouldReject) {
      mockedAxios.get.mockRejectedValueOnce(error)
    } else {
      mockedAxios.get.mockResolvedValueOnce(mockResponse)
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
    jest.clearAllMocks()
    process.env = { ...process.env, AQ_KEY: TEST_API_KEY }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('successful cases', () => {
    describe('single station', () => {
      it('should fetch and transform single station data successfully', async () => {
        const mockApiResponse = {
          data: {
            results: [
              {
                id: 3,
                name: 'Test Station',
                coordinates: {
                  latitude: 47.9,
                  longitude: 106.9,
                },
              },
            ],
          },
        }

        const mockTransformedData = {
          'station-1': {
            id: 'station-1',
            name: 'Test Station',
            latitude: 47.9,
            longitude: 106.9,
          },
        }

        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: mockApiResponse });
        (getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

        const result = await execute()

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
        expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(mockApiResponse.data)
        expect(result).toEqual([mockTransformedData['station-1']])
      })
    })

    describe('multiple stations', () => {
      it('should handle multiple stations successfully', async () => {
        const multipleStationsResponse = {
          data: {
            results: [
              {
                id: 1,
                name: 'Station 1',
                coordinates: {
                  latitude: 47.9,
                  longitude: 106.9,
                },
              },
              {
                id: 2,
                name: 'Station 2',
                coordinates: {
                  latitude: 48.0,
                  longitude: 107.0,
                },
              },
            ],
          },
        }

        const mockTransformedData = {
          'station-1': {
            id: 'station-1',
            name: 'Station 1',
            latitude: 47.9,
            longitude: 106.9,
          },
          'station-2': {
            id: 'station-2',
            name: 'Station 2',
            latitude: 48.0,
            longitude: 107.0,
          },
        }

        const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: multipleStationsResponse })
        ;(getTransformedDataFromOpenAQ as jest.Mock).mockReturnValueOnce(mockTransformedData)

        const result = await execute()

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
        expect(getTransformedDataFromOpenAQ).toHaveBeenCalledWith(multipleStationsResponse.data)
        expect(result).toEqual([mockTransformedData['station-1'], mockTransformedData['station-2']])
      })
    })
  })

  describe('edge cases', () => {
    it('should handle empty response data', async () => {
      const { execute, expectedUrl, expectedCallParams } = createSUT({ mockResponse: { data: null } })

      const result = await execute()

      expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
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

      expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
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

      expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
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

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
        expect(result).toEqual([])
      })
    })

    describe('network errors', () => {
      it('should handle API errors gracefully', async () => {
        const mockError = new Error('API Error')
        const { execute, expectedUrl, expectedCallParams } = createSUT({ shouldReject: true, error: mockError })

        const consoleSpy = jest.spyOn(console, 'error')
        const result = await execute()

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
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

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
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

        expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl, expectedCallParams)
        expect(consoleSpy).toHaveBeenCalledWith(timeoutError)
        expect(result).toEqual([])
        consoleSpy.mockRestore()
      })
    })
  })
})

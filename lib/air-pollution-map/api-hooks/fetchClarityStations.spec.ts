import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchClarityStations } from './fetchClarityStations'

jest.mock('../../../components/HomePage/MapComponent/utils', () => ({
  getAQIFromPM2: jest.fn(),
  getAQIColor: jest.fn(),
}))

interface ClarityApiResponse {
  request: {
    allDatasources: boolean
    metricSelect: string
    org: string
    outputFrequency: string
    qcAssessment: boolean
    replyWithContinuationToken: boolean
  }
  data: Array<{
    datasourceId: string
    time: string
    metric: string
    raw: number
    value: number | null
    status: 'calibrated-ready' | 'sensor-ready' | 'calibration-missing' | 'calibration-error'
    qcAssessment: string
  }>
  locations: Array<{
    datasourceId: string
    lat: number
    lon: number
  }>
}

interface SUTParams {
  shouldReject?: boolean
  error?: Error
}

describe('fetchClarityStations', () => {
  let mock: MockAdapter
  const originalEnv = process.env
  const TEST_API_KEY = 'TEST_API_KEY'
  const CLARITY_API_URL = 'https://clarity-data-api.clarity.io/v2/recent-datasource-measurements-query'
  const createMockResponse = (): ClarityApiResponse => {
    return {
      request: {
        allDatasources: true,
        metricSelect: 'only pm2_5* + pm10*',
        org: 'nationO3LY',
        outputFrequency: 'minute',
        qcAssessment: true,
        replyWithContinuationToken: true,
      },
      data: [
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:32:14.359Z',
          metric: 'pm10ConcMassIndividual',
          raw: 9.81,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:32:14.359Z',
          metric: 'pm10ConcNumIndividual',
          raw: 8.3,
          value: 8.3,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:32:14.359Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 8.92,
          value: 7.46,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:32:14.359Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 8.25,
          value: 8.25,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:27:38.330Z',
          metric: 'pm10ConcMassIndividual',
          raw: 57.37,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:27:38.330Z',
          metric: 'pm10ConcNumIndividual',
          raw: 23.3,
          value: 23.3,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:27:38.330Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 35.45,
          value: 22.97,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:27:38.330Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 22.93,
          value: 22.93,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:26:36.182Z',
          metric: 'pm10ConcMassIndividual',
          raw: 42.15,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:26:36.182Z',
          metric: 'pm10ConcNumIndividual',
          raw: 20.35,
          value: 20.35,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:26:36.182Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 26.42,
          value: 18.23,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:26:36.182Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 20.09,
          value: 20.09,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:14:49.888Z',
          metric: 'pm10ConcMassIndividual',
          raw: 4.04,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:14:49.888Z',
          metric: 'pm10ConcNumIndividual',
          raw: 3,
          value: 3,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:14:49.888Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 1.85,
          value: 4.68,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T02:14:49.888Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 2.95,
          value: 2.95,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:10:15.581Z',
          metric: 'pm10ConcMassIndividual',
          raw: 84.13,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:10:15.581Z',
          metric: 'pm10ConcNumIndividual',
          raw: 33.02,
          value: 33.02,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:10:15.581Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 52.94,
          value: 30.59,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T02:10:15.581Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 32.5,
          value: 32.5,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:09:13.849Z',
          metric: 'pm10ConcMassIndividual',
          raw: 85.45,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:09:13.849Z',
          metric: 'pm10ConcNumIndividual',
          raw: 37.06,
          value: 37.06,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:09:13.849Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 52.9,
          value: 31.68,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T02:09:13.849Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 36.53,
          value: 36.53,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T01:57:25.400Z',
          metric: 'pm10ConcMassIndividual',
          raw: 5.65,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T01:57:25.400Z',
          metric: 'pm10ConcNumIndividual',
          raw: 4.23,
          value: 4.23,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T01:57:25.400Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 3.54,
          value: 5.26,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T01:57:25.400Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 4.19,
          value: 4.19,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T01:52:49.348Z',
          metric: 'pm10ConcMassIndividual',
          raw: 104.2,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T01:52:49.348Z',
          metric: 'pm10ConcNumIndividual',
          raw: 39.12,
          value: 39.12,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T01:52:49.348Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 59.06,
          value: 36.16,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T01:52:49.348Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 38.43,
          value: 38.43,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T01:51:51.072Z',
          metric: 'pm10ConcMassIndividual',
          raw: 92.84,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T01:51:51.072Z',
          metric: 'pm10ConcNumIndividual',
          raw: 37.46,
          value: 37.46,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T01:51:51.072Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 55.14,
          value: 33.01,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T01:51:51.072Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 36.86,
          value: 36.86,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
      ],
      locations: [
        {
          datasourceId: 'DHYJD8324',
          lat: 47.74201,
          lon: 96.84668,
        },
        {
          datasourceId: 'DXGPA1683',
          lat: 47.91576,
          lon: 106.89403,
        },
        {
          datasourceId: 'DYXKC9770',
          lat: 47.91574,
          lon: 106.89421,
        },
      ],
    }
  }

  const createSUT = ({ shouldReject = false, error = new Error('API Error') }: SUTParams = {}) => {
    process.env = { ...originalEnv, CLARITY_API_KEY: TEST_API_KEY }

    const mockResponse = createMockResponse()

    const requestBody = {
      allDatasources: true,
      metricSelect: 'only pm2_5* + pm10*',
      org: 'nationO3LY',
      outputFrequency: 'minute',
      qcAssessment: true,
      replyWithContinuationToken: true,
    }

    mock = new MockAdapter(axios)

    if (shouldReject) {
      mock.onPost(CLARITY_API_URL).replyOnce(() => Promise.reject(error))
    } else {
      mock.onPost(CLARITY_API_URL).replyOnce(200, mockResponse)
    }

    const expectedCallParams = {
      headers: {
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'x-api-key': TEST_API_KEY,
      },
      data: requestBody,
    }

    return {
      execute: () => fetchClarityStations(),
      expectedCallParams,
      mockResponse,
      requestBody,
    }
  }

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    mock?.restore()
    process.env = originalEnv
  })

  it('should fetch and transform data correctly', async () => {
    const { execute, expectedCallParams } = createSUT()

    const result = await execute()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    expect(mock.history.post[0].url).toBe(CLARITY_API_URL)
    expect(JSON.parse(mock.history.post[0].data)).toEqual(expectedCallParams.data)
    expect(mock.history.post[0].headers).toMatchObject(expectedCallParams.headers)
    expect(result).toHaveLength(3)
    result.forEach(station => {
      expect(station).toHaveProperty('name')
      expect(station).toHaveProperty('pollution')
      expect(station).toHaveProperty('location')
      expect(station).toHaveProperty('type', 'outdoor')
      expect(station).toHaveProperty('color')
      expect(station.pollution).toHaveProperty('aqius')
      expect(station.pollution).toHaveProperty('p2')
      expect(station.pollution).toHaveProperty('ts')
      expect(station.location).toHaveProperty('coordinates')
      expect(station.location.coordinates).toHaveLength(2)
    })
  })
})

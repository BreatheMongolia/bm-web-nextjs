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
    format: string
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
        org: 'nationO3LY',
        allDatasources: true,
        outputFrequency: 'minute',
        format: 'json-long',
        replyWithContinuationToken: true,
        qcAssessment: true,
      },
      data: [
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'no2ConcIndividual',
          raw: 30.52,
          value: 25.05,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm10ConcMassIndividual',
          raw: 42.9,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm10ConcNumIndividual',
          raw: 26.05,
          value: 26.05,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm1ConcMassIndividual',
          raw: 16.67,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm1ConcNumIndividual',
          raw: 24.23,
          value: 24.23,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 27.86,
          value: 19.29,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 25.64,
          value: 25.64,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'relHumidInternalIndividual',
          raw: 52.37,
          value: 52.37,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:20:33.490Z',
          metric: 'temperatureInternalIndividual',
          raw: 0.66,
          value: 0.66,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'no2ConcIndividual',
          raw: 16.46,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm10ConcMassIndividual',
          raw: 43.21,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm10ConcNumIndividual',
          raw: 15.62,
          value: 15.62,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm1ConcMassIndividual',
          raw: 14.83,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm1ConcNumIndividual',
          raw: 14.7,
          value: 14.7,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 25.45,
          value: 16.43,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 15.39,
          value: 15.39,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'relHumidInternalIndividual',
          raw: 60.33,
          value: 60.33,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T17:15:06.457Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.18,
          value: -2.18,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'no2ConcIndividual',
          raw: 15.89,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm10ConcMassIndividual',
          raw: 39.69,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm10ConcNumIndividual',
          raw: 17.48,
          value: 17.48,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm1ConcMassIndividual',
          raw: 16.08,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm1ConcNumIndividual',
          raw: 16.51,
          value: 16.51,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 23.77,
          value: 15.72,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 17.29,
          value: 17.29,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'relHumidInternalIndividual',
          raw: 61.02,
          value: 61.02,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T17:13:02.799Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.29,
          value: -2.29,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'no2ConcIndividual',
          raw: 32.74,
          value: 30.5,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm10ConcMassIndividual',
          raw: 216.8,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm10ConcNumIndividual',
          raw: 124.97,
          value: 124.97,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm1ConcMassIndividual',
          raw: 67.12,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm1ConcNumIndividual',
          raw: 113.36,
          value: 113.36,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 147.39,
          value: 90.79,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 122.23,
          value: 122.23,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'relHumidInternalIndividual',
          raw: 56.31,
          value: 56.31,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T17:03:08.756Z',
          metric: 'temperatureInternalIndividual',
          raw: 0.41,
          value: 0.41,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'no2ConcIndividual',
          raw: 19.73,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm10ConcMassIndividual',
          raw: 52.71,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm10ConcNumIndividual',
          raw: 18.63,
          value: 18.63,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm1ConcMassIndividual',
          raw: 17.73,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm1ConcNumIndividual',
          raw: 17.51,
          value: 17.51,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 30.2,
          value: 19.27,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 18.34,
          value: 18.34,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'relHumidInternalIndividual',
          raw: 61.05,
          value: 61.05,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:57:39.766Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.22,
          value: -2.22,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'no2ConcIndividual',
          raw: 17.71,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm10ConcMassIndividual',
          raw: 58.35,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm10ConcNumIndividual',
          raw: 24.51,
          value: 24.51,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm1ConcMassIndividual',
          raw: 23.54,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm1ConcNumIndividual',
          raw: 23.29,
          value: 23.29,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 36.58,
          value: 21.62,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 24.25,
          value: 24.25,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'relHumidInternalIndividual',
          raw: 61.4,
          value: 61.4,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:55:39.111Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.28,
          value: -2.28,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'no2ConcIndividual',
          raw: 30.48,
          value: 31.26,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm10ConcMassIndividual',
          raw: 8.08,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm10ConcNumIndividual',
          raw: 6.06,
          value: 6.06,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm1ConcMassIndividual',
          raw: 3.38,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm1ConcNumIndividual',
          raw: 5.79,
          value: 5.79,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 5.77,
          value: 6.19,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 5.99,
          value: 5.99,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'relHumidInternalIndividual',
          raw: 53.06,
          value: 53.06,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:45:44.251Z',
          metric: 'temperatureInternalIndividual',
          raw: 0.48,
          value: 0.48,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'no2ConcIndividual',
          raw: 20.28,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm10ConcMassIndividual',
          raw: 57.58,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm10ConcNumIndividual',
          raw: 19.08,
          value: 19.08,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm1ConcMassIndividual',
          raw: 18.61,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm1ConcNumIndividual',
          raw: 18.05,
          value: 18.05,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 29.53,
          value: 20.68,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 18.83,
          value: 18.83,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'relHumidInternalIndividual',
          raw: 60.89,
          value: 60.89,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DXGPA1683',
          time: '2025-10-12T16:40:13.340Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.21,
          value: -2.21,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'no2ConcIndividual',
          raw: 17.09,
          value: null,
          status: 'calibration-error',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm10ConcMassIndividual',
          raw: 57.18,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm10ConcNumIndividual',
          raw: 21.36,
          value: 21.36,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm1ConcMassIndividual',
          raw: 19.64,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm1ConcNumIndividual',
          raw: 20.05,
          value: 20.05,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 33.31,
          value: 20.77,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 21,
          value: 21,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'relHumidInternalIndividual',
          raw: 61.48,
          value: 61.48,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DYXKC9770',
          time: '2025-10-12T16:38:15.668Z',
          metric: 'temperatureInternalIndividual',
          raw: -2.29,
          value: -2.29,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'no2ConcIndividual',
          raw: 30.43,
          value: 24.25,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm10ConcMassIndividual',
          raw: 72.42,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm10ConcNumIndividual',
          raw: 47.93,
          value: 47.93,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm1ConcMassIndividual',
          raw: 33.8,
          value: null,
          status: 'calibration-missing',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm1ConcNumIndividual',
          raw: 45.52,
          value: 45.52,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm2_5ConcMassIndividual',
          raw: 54.2,
          value: 31.91,
          status: 'calibrated-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'pm2_5ConcNumIndividual',
          raw: 47.5,
          value: 47.5,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'relHumidInternalIndividual',
          raw: 51.19,
          value: 51.19,
          status: 'sensor-ready',
          qcAssessment: 'valid',
        },
        {
          datasourceId: 'DHYJD8324',
          time: '2025-10-12T16:28:20.068Z',
          metric: 'temperatureInternalIndividual',
          raw: 0.39,
          value: 0.39,
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

  it('should return unauthorized when API key is missing', async () => {
    delete process.env.CLARITY_API_KEY
    mock = new MockAdapter(axios)
    mock.onPost(CLARITY_API_URL).replyOnce(401, { error: 'Unauthorized' })

    const result = await fetchClarityStations()

    expect(result).toEqual([])
  })

  it('should not call GET endpoint', async () => {
    const { execute } = createSUT()
    await execute()
    expect(mock.history.get.length).toBe(0)
  })

  it('should handle API errors gracefully', async () => {
    const { execute } = createSUT({ shouldReject: true, error: new Error('Network Error') })
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const result = await execute()

    expect(result).toEqual([])
    expect(consoleSpy).toHaveBeenCalledWith(new Error('Network Error'))
    consoleSpy.mockRestore()
  })
})

import axios from 'axios'
import { StationType } from '../types'
import { getAQIColor, getAQIFromPM2 } from '@/components/HomePage/MapComponent/utils'

const CLARITY_API_URL = 'https://clarity-data-api.clarity.io/v2/recent-datasource-measurements-query'

export const fetchClarityStations = async () => {
  const stations: StationType[] = []

  const requestBody = {
    allDatasources: true,
    org: 'nationO3LY',
    outputFrequency: 'minute',
    qcAssessment: true,
    replyWithContinuationToken: false,
  }

  await axios
    .post(CLARITY_API_URL, requestBody, {
      headers: {
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLARITY_API_KEY || '',
      },
    })
    .then(res => {
      if (res && res.data) {
        const transformedStations = getTransformedDataFromClarity(res.data)
        stations.push(...transformedStations)
      }
    })
    .catch(err => console.error(err))

  return stations
}

const getTransformedDataFromClarity = (data: Object): StationType[] => {
  const locations = data['locations'] || []
  const measurements = data['data'] || []

  return locations.map(location => {
    const pm25 = measurements.find(
      m =>
        m['datasourceId'] === location['datasourceId'] &&
        m['metric'] === 'pm2_5ConcMassIndividual' &&
        m['qcAssessment'] === 'valid',
    )

    const p2 = Math.round(pm25['value'] ?? pm25['raw'])

    return {
      name: location['datasourceId'],
      pollution: {
        aqius: getAQIFromPM2(p2),
        p2,
        ts: Date.parse(pm25['time']),
      },
      location: { coordinates: [location['lon'], location['lat']] },
      type: 'outdoor',
      color: getAQIColor(getAQIFromPM2(p2)),
    }
  })
}

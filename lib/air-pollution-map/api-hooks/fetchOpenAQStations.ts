import axios from 'axios'
import Bottleneck from 'bottleneck'
import { getTransformedDataFromOpenAQ } from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'

// country id = 103 -> Mongolia
const OPEN_AQ_URL = 'https://api.openaq.org/v3/locations?country_id=104&limit=500&parameter_id=2'

const createDefaultLimiter = () =>
  new Bottleneck({
    maxConcurrent: 2, // Limit concurrent requests to avoid overwhelming the API
    minTime: 1000, // Minimum 1 second between requests (ensures max 60 req/min)
    reservoir: 2000, // 2000 requests per hour
    reservoirRefreshAmount: 2000,
    reservoirRefreshInterval: 60 * 60 * 1000, // Refresh every hour
    reservoirIncreaseInterval: 60 * 1000, // Add tokens every minute
    reservoirIncreaseAmount: 33, // ~2000 requests/hour = 33.33 req/min
  })

// Added dependency injection for easy testing
export const fetchOpenAQStations = async (limiterForTesting?: Bottleneck) => {
  const limiter = limiterForTesting || createDefaultLimiter()

  const rateLimitedAxiosGet = limiter.wrap(async (url: string, config: any) => {
    return await axios.get(url, config)
  })

  const stations: StationType[] = []

  try {
    const response = await rateLimitedAxiosGet(OPEN_AQ_URL, {
      headers: {
        'X-API-Key': process.env.AQ_KEY || undefined,
      },
    })

    if (response?.data) {
      const transformedData = getTransformedDataFromOpenAQ(response.data)
      if (transformedData && typeof transformedData === 'object') {
        for (const [_, station] of Object.entries(transformedData)) {
          stations.push(station)
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  return stations
}

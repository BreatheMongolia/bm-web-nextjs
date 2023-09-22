import axios from 'axios'
import { getTransformedDataFromOpenAQ, hasStationUpdatedWithinLastWeek } from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'
// country id = 103 -> Mongolia
const OPEN_AQ_URL = 'https://api.openaq.org/v2/locations?country_id=104&limit=500&parameter_id=2'
export const fetchOpenAQStations = async () => {
  const stations: StationType[] = []
  // update
  await axios
    .get(OPEN_AQ_URL)
    .then(res => {
      if (res && res.data) {
        const transformedData = getTransformedDataFromOpenAQ(res.data)
        for (const [_, station] of Object.entries(transformedData)) {
          stations.push(station)
        }
      }
    })
    .catch(err => console.log(err))

  return stations
}

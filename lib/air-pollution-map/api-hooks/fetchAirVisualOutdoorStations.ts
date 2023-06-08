import axios from 'axios'
import { getTransformedDataFromOpenAQ, hasStationUpdatedWithinLastWeek } from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'
import { activeStations } from 'components/HomePage/MapComponent/consts'

const AIRVISUAL_STATIONS_URL = `https://api.airvisual.com/${activeStations}`

export const fetchOpenAQStations = async () => {
  const stations: StationType[] = []
  // update
  await axios
    .get(AIRVISUAL_STATIONS_URL)
    .then(res => {
      if (res.data) {
        // get active stations
        const activeStations = res.data.data
        // get detail of specific api
      }
    })
    .catch(err => console.log(err))

  return stations
}

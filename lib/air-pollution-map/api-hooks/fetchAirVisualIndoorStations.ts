import axios from 'axios'
import {
  getAQIFromPM2,
  getAQIColor,
  hasStationUpdatedWithinLastWeek,
  isStationWithinMongoliaBBox,
} from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'
import { indoorStationLocation, pinIndoorStationsAPI } from 'components/HomePage/MapComponent/consts'

export const fetchAirVisualIndoorStations = async () => {
  const stations: StationType[] = []
  const apiStats = {
    success: 0,
    error: 0,
  }
  await Promise.allSettled(
    pinIndoorStationsAPI.map(async indoorStationAPI => {
      try {
        const response = await axios.get(indoorStationAPI)
        const res = response.data

        if (res) {
          if (hasStationUpdatedWithinLastWeek(res.current.ts, 'airVisual')) {
            const name = res.settings.node_name
            if (
              indoorStationLocation[name] &&
              isStationWithinMongoliaBBox(indoorStationLocation[name].lon, indoorStationLocation[name].lat)
            ) {
              const location = indoorStationLocation[name]
              const lon = location.lon
              const lat = location.lat
              const receivedPollution = res.current
              const aqius = getAQIFromPM2(receivedPollution.p2)
              const pollution = { ...receivedPollution, aqius }
              // log the count
              apiStats.success++
              // return as StationType
              return {
                name,
                pollution,
                location: { coordinates: [lon, lat] },
                type: 'indoor',
                sponsoredBy: 'Air Visual',
                color: getAQIColor(aqius),
              } as StationType
            }
          }
        }
      } catch (error) {
        // log the errors
        apiStats.error++
        return null
      }
    }),
  ).then(result => {
    result.map(res => {
      if (res.status === 'fulfilled' && res.value) {
        stations.push(res.value)
      }
    })
  })
  return stations
}

import axios from 'axios'
import {
  getAQIColor,
  hasStationUpdatedWithinLastWeek,
  isStationWithinMongoliaBBox,
} from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'
import { activeStations, breatheMonAPI } from 'components/HomePage/MapComponent/consts'

const AIRVISUAL_STATIONS_URL = `https://api.airvisual.com/${activeStations}`

export const fetchAirVisualOutdoorStations = async () => {
  const stations: StationType[] = []
  // get active stations
  const activeStations = await axios
    .get(AIRVISUAL_STATIONS_URL)
    .then(res => {
      if (res && res.data) {
        // get active stations
        return res.data.data
      }
      return []
    })
    .catch(err => console.error(err))

  // get the detail active actions
  if (!activeStations) {
    return []
  }
  await Promise.allSettled(
    activeStations.map(async (d: any) => {
      try {
        var specifiedStationAPI = 'v2/station?station='
          .concat(d.station, '&city=Ulaanbaatar&state=Ulaanbaatar&country=Mongolia&key=')
          .concat(breatheMonAPI)

        const res = await axios.get(`https://api.airvisual.com/${specifiedStationAPI}`)

        var station: any = res.data.data
        if (
          station.current.pollution &&
          hasStationUpdatedWithinLastWeek(station.current.pollution.ts, 'airVisual') &&
          isStationWithinMongoliaBBox(station.location.coordinates[0], station.location.coordinates[1])
        ) {
          const receivedPollution = station.current.pollution
          const aqius = receivedPollution.p2.aqius
          const pollution = { ...receivedPollution, aqius }

          const lon = station.location.coordinates[0]
          const lat = station.location.coordinates[1]

          return {
            name: station.name,
            pollution: pollution,
            location: { coordinates: [lon, lat] },
            sponsoredBy: 'Air Visual',
            type: 'outdoor',
            color: getAQIColor(aqius),
          } as StationType
        }
      } catch (error) {
        return null
      }
    }),
  ).then(result => {
    if (result) {
      result.map(res => {
        if (res.status === 'fulfilled' && res.value) {
          stations.push(res.value)
        }
      })
    }
  })

  return stations
}

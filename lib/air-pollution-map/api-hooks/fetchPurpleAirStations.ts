import { purpleAirIndoorStationsAPI } from 'components/HomePage/MapComponent/consts'
import axios from 'axios'
import {
  getAQIFromPM2,
  getAQIColor,
  hasStationUpdatedWithinLastWeek,
  isStationWithinMongoliaBBox,
} from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'

export const fetchPurpleAirStations = async () => {
  const stations: StationType[] = []
  await Promise.allSettled(
    purpleAirIndoorStationsAPI.map(async indoorStationAPI => {
      const res = await axios.get(indoorStationAPI)
      if (res.data) {
        const sensor = res.data.sensor
        if (
          sensor['pm2.5_cf_1'] &&
          hasStationUpdatedWithinLastWeek(sensor.last_seen, 'purpleAir') &&
          isStationWithinMongoliaBBox(sensor.longitude, sensor.latitude)
        ) {
          const name = sensor.name
          const lon = sensor.longitude
          const lat = sensor.latitude
          const pm2 = parseInt(sensor['pm2.5_cf_1'])
          const stationAQI = getAQIFromPM2(pm2)

          return {
            name: name,
            pollution: { aqius: stationAQI, p2: pm2, ts: sensor.last_seen },
            location: { coordinates: [lon, lat] },
            type: 'indoor',
            sponsoredBy: 'Purple Air',
            color: getAQIColor(stationAQI),
          } as StationType
        }
      }
      return null
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

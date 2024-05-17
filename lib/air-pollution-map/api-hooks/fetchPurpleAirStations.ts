import { PURPLE_AIR_API_KEY, PA_MONGOLIA_BOUNDING_BOX_COORDS } from 'components/HomePage/MapComponent/consts'
import axios from 'axios'
import { getAQIFromPM2, getAQIColor } from 'components/HomePage/MapComponent/utils'
import { StationType } from '../types'

// API urls
const PA_FIELDS = 'name,last_seen,location_type,latitude,longitude,pm2.5'
const PA_GET_SENSORS_DATA = `https://api.purpleair.com/v1/sensors?fields=${PA_FIELDS}&nwlng=${PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LNG}&nwlat=${PA_MONGOLIA_BOUNDING_BOX_COORDS.NW_LAT}&selng=${PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LNG}&selat=${PA_MONGOLIA_BOUNDING_BOX_COORDS.SE_LAT}`

export const fetchPurpleAirStations = async () => {
  const stations: StationType[] = []
  // get all purple air sensors first
  // API returns by default MAX_AGE = 7 days && bounding box will set to mongolia
  await axios
    .get(PA_GET_SENSORS_DATA, {
      headers: { 'x-api-key': PURPLE_AIR_API_KEY },
    })
    .then(res => {
      if (res.data) {
        const fields = res.data.fields
        const location_types = res.data.location_types
        const pa_data = res.data.data
        const raw_stations = []
        pa_data.map(station => {
          const object = {}
          // convert the station to an object
          station.map((x, idx) => {
            object[fields[idx]] = x
          })
          raw_stations.push(object)
        })

        // Filter out stations with pm2.5 of 0
        const filtered_stations = raw_stations.filter(x => parseInt(x['pm2.5']) > 0)

        // turn raw_stations into stationTypes
        filtered_stations.map(x => {
          // convert to aqi
          const pm2 = parseInt(x['pm2.5'])
          const stationAQI = getAQIFromPM2(pm2)
          // push
          stations.push({
            name: x['name'],
            pollution: { aqius: stationAQI, p2: pm2, ts: x['last_seen'] * 1000 },
            location: { coordinates: [x['longitude'], x['latitude']] },
            type: location_types[x['location_type']] === 'outside' ? 'outdoor' : x['location_type'],
            sponsoredBy: 'Purple Air',
            color: getAQIColor(stationAQI),
          })
        })
      }
    })
    .catch(err => {
      console.error('failed to get all sensors:', err)
    })
  return stations
}

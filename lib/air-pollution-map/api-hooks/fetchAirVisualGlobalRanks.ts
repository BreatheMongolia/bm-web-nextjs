import axios from 'axios'
import { RankType } from '../types'
import { globalRanking } from 'components/HomePage/MapComponent/consts'

const AIRVISUAL_STATIONS_URL = `https://api.airvisual.com/${globalRanking}`

export const fetchAirVisualGlobalStations = async () => {
  let ranks: RankType[] = []
  await axios
    .get(AIRVISUAL_STATIONS_URL)
    .then(res => {
      if (res.data) {
        if (res.data.data) {
          ranks = [...res.data.data]
        }
      }
    })
    .catch(err => {
      console.log(err)
    })

  return ranks
}

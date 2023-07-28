import { StationType } from 'lib/air-pollution-map/types'
import { AQI_THRESHOLDS } from './consts'
// using OpenAQ API to get Purple Air outdoor stations data
export function getTransformedDataFromOpenAQ(res: any) {
  if (res.results.length) {
    const stationsMap = new Map<string, StationType>()
    for (let i = 0; i < res.results.length; i++) {
      const PM25 = res.results[i].parameters.find((item: { displayName: string }) => item.displayName === 'PM2.5') ?? {}
      const name: string = res.results[i].name

      if (!isStationWithinMongoliaBBox(res.results[i].coordinates.longitude, res.results[i].coordinates.latitude)) {
        continue
      }

      if (!stationsMap[name]) {
        stationsMap[name] = {
          name: name,
          date: PM25.lastUpdated,
          sponsoredBy: 'Purple Air',
          location: { coordinates: [res.results[i].coordinates.longitude, res.results[i].coordinates.latitude] },
          pollution: {
            p2: parseInt(PM25.lastValue),
            aqius: getAQIFromPM2(PM25.lastValue),
            ts: Date.parse(PM25.lastUpdated),
          },
          color: getAQIColor(getAQIFromPM2(PM25.lastValue)),
          type: 'outdoor',
        }
      } else {
        // Multiple responses for the same location, so get the latest one
        if (stationsMap[name].date < PM25.lastUpdated) {
          const current = stationsMap[name]
          current.pollution.aqius = getAQIFromPM2(PM25.lastValue)
          current.pollution.p2 = parseInt(PM25.lastValue)
          current.pollution.ts = Date.parse(PM25.lastUpdated)
          current.color = getAQIColor(getAQIFromPM2(PM25.lastValue))
        }
      }
    }

    return stationsMap
  } else {
    return false
  }
}

// Getting AQI color scale
export const getAQIColor = (aqi: number) => {
  if (aqi < 50) {
    return 'green'
  } else if (aqi < 100) {
    return 'yellow'
  } else if (aqi < 150) {
    return 'orange'
  } else if (aqi < 200) {
    return 'red'
  } else if (aqi < 300) {
    return 'purple'
  } else if (aqi > 300) {
    return 'brown'
  }
}

// Getting health impact category
export const getHealthCategory = (aqi: number) => {
  if (aqi < 50) {
    return 'good'
  } else if (aqi < 100) {
    return 'moderate'
  } else if (aqi < 150) {
    return 'unhealthy_sensitive'
  } else if (aqi < 200) {
    return 'unhealthy'
  } else if (aqi < 300) {
    return 'very_unhealthy'
  } else if (aqi > 300) {
    return 'hazardous'
  }
}

// -------------------------------- Time filtering for indoor and outdoor sensors --------------------------------

// only show/render stations that are updated within last week
export function hasStationUpdatedWithinLastWeek(sensorLastUpdated: any, type?: string) {
  var weekBefore = new Date().getTime() - 168 * 60 * 60 * 1000 // 168(24x7days) * 60 (min) * 60 (sec) * 1000 (ms)

  if (type === 'purpleAir') {
    // Purple Air sensors reading is in UTC epoch time
    let lastUpdateNewDate = new Date(0)
    lastUpdateNewDate.setUTCSeconds(sensorLastUpdated)
    // getTime() uses UTC for time representation, so the calculation would be in client browser timezone.
    // var yesterday = new Date().getTime() - (24 * 60 * 60 * 1000); // we filtered within 24hours before, but decided to change to one week by Aza
    if (lastUpdateNewDate.getTime() >= weekBefore) {
      return sensorLastUpdated
    } else {
      return false
    }
  } else if (type === 'airVisual' || type === 'openAQ') {
    // ts comes as date string
    if (Date.parse(sensorLastUpdated) >= weekBefore) {
      // parses string representation of date and returns the number of milliseconds in UTC
      return sensorLastUpdated
    } else {
      return false
    }
  }
}

const getAQIFromPollutants = ({ pm2, iHi, iLow, bpHi, bpLow }: any) =>
  Math.round(((iHi - iLow) / (bpHi - bpLow)) * (pm2 - bpLow) + iLow)

export const getAQIFromPM2 = (pm2: any) => {
  const threshold = Object.keys(AQI_THRESHOLDS).find(t => pm2 < t)
  return threshold ? getAQIFromPollutants(Object.assign({ pm2 }, AQI_THRESHOLDS[threshold])) : 0
}

export function isZoneWithinBBOX(zoneExtent: any, mapBoundingBox: any) {
  return (
    zoneExtent[1][0] < mapBoundingBox._ne.lng &&
    zoneExtent[0][0] > mapBoundingBox._sw.lng &&
    zoneExtent[1][1] < mapBoundingBox._ne.lat &&
    zoneExtent[0][1] > mapBoundingBox._sw.lat
  )
}

export function isStationWithinBBOX(stationLon: number, stationLat: number, mapBoundingBox: any) {
  return (
    stationLon < mapBoundingBox._ne.lng &&
    stationLon > mapBoundingBox._sw.lng &&
    stationLat < mapBoundingBox._ne.lat &&
    stationLat > mapBoundingBox._sw.lat
  )
}

export function isStationWithinMongoliaBBox(stationLon: number, stationLat: number) {
  return stationLon < 119.979018 && stationLon > 86.874897 && stationLat < 52.148362 && stationLat > 41.581958
}

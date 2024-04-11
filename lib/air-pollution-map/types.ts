import { TakeAction } from "graphql/generated"

export interface MapContextInterface {
  pins: any[]
  addPin: (pin: HTMLDivElement) => void
  mapCurrent: any
  setMapCurrent: Function
  showIndoor: boolean
  showOutdoor: boolean
  setShowIndoor: Function
  setShowOutdoor: Function
  selectedStation: StationType | null
  setSelectedStation: (station: StationType | null) => void
}

export interface StationType {
  city?: string
  country?: string
  pollution: any
  weather?: object
  location: {
    coordinates: number[]
    type?: string
  }
  name: string
  state?: string
  color?: string
  type: string
  sponsoredBy?: string
  units?: object
}

export interface ZoneType {
  city: string
  country: string
  current: {
    pollution: object
    weather: object
  }
  location: {
    coordinates: number[]
    type: string
  }
  name: string
  state: string
  sponsoredBy: string
  units: object
}

export interface RankType {
  city: string
  state: string
  country: string
  ranking: {
    current_aqi: number
    current_aqi_cn: number
  }
}

export interface RecommendationType {
  airQuality: string
  sensorType: string
  description: string
  descriptionMn: string
  advices?: {
    icon?: {
      mediaItemUrl: any
    }
    comment: string
    commentMn: string
    takeAction?: TakeAction[]
  }
}
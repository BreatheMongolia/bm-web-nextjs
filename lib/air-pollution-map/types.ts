export interface MapContextInterface {
  pins: string[]
  setPins: (data: { [key: string]: StationType }) => void
  addPin: (data: StationType) => void
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

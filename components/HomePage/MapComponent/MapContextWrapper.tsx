import { MapContextInterface, StationType } from 'lib/air-pollution-map/types'
import { MapContext } from 'pages/_app'
import { useRef, useState } from 'react'
export const MapContextWrapper = ({ children }) => {
  const [pins, setPins] = useState<any>({})
  const [selectedStation, setSelectedStation] = useState<StationType | null>(null)
  const [openAQStations, setOpenAQStations] = useState<StationType[]>([])
  const [airVisualStations, setAirVisualStations] = useState<StationType[]>([])
  const [purpleAirStations, setPurpleAirStations] = useState<StationType[]>([])
  const [airVisualOutdoorStations, setAirVisualOutdoorStations] = useState<StationType[]>([])
  const [showIndoor, setShowIndoor] = useState(true)
  const [showOutdoor, setShowOutdoor] = useState(true)

  const map = useRef(null)
  const [mapCurrent, setMapCurrent] = useState(map.current)

  const mapData: MapContextInterface = {
    mapCurrent: mapCurrent,
    pins: pins,
    addPin: (station: object) => setPins((oldPins: any) => ({ ...oldPins, ...station })),
    setPins: (data: object) => setPins(data),
    setMapCurrent: (mapIns: any) => setMapCurrent(mapIns),
    selectedStation: selectedStation,
    setSelectedStation: (station: StationType | null) => setSelectedStation(station),
    openAQStations: openAQStations,
    airVisualStations: airVisualStations,
    purpleAirStations: purpleAirStations,
    airVisualOutdoorStations: airVisualOutdoorStations,
    feedAirVisualStations: (data: StationType[]) => {
      setAirVisualStations([...data])
    },
    feedPurpleAirStations: (data: StationType[]) => {
      setPurpleAirStations([...data])
    },
    feedOpenAQStations: (data: StationType[]) => {
      setOpenAQStations([...data])
    },
    feedAirVisualOutdoorStations: (data: StationType[]) => {
      setAirVisualOutdoorStations([...data])
    },
    showIndoor: showIndoor,
    showOutdoor: showOutdoor,
    setShowIndoor: (value: boolean) => {
      setShowIndoor(value)
    },
    setShowOutdoor: (value: boolean) => {
      setShowOutdoor(value)
    },
  }

  return <MapContext.Provider value={mapData}>{children}</MapContext.Provider>
}

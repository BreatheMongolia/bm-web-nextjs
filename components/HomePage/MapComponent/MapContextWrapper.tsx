import { MapContextInterface, RecommendationType, StationType } from 'lib/air-pollution-map/types'
import { MapContext } from 'pages/_app'
import { useRef, useState } from 'react'
export const MapContextWrapper = ({ children }) => {
  const [pins, setPins] = useState<HTMLDivElement[]>([])
  const [selectedStation, setSelectedStation] = useState<StationType | null>(null)
  const [showIndoor, setShowIndoor] = useState(true)
  const [showOutdoor, setShowOutdoor] = useState(true)

  const map = useRef(null)
  const [mapCurrent, setMapCurrent] = useState(map.current)

  const mapData: MapContextInterface = {
    mapCurrent: mapCurrent,
    pins: pins,
    addPin: (pin: HTMLDivElement) => setPins([...pins, pin]),
    setMapCurrent: (mapIns: any) => setMapCurrent(mapIns),
    selectedStation: selectedStation,
    setSelectedStation: (station: StationType | null) => setSelectedStation(station),
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

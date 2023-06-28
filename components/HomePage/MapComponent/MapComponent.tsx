import { H2 } from 'components/generic/Typography'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef, useState } from 'react'
import { InfoPopup } from './Helpers'
import { useTranslation } from 'next-i18next'
import { MapContext } from 'pages/_app'
import AQIScale from './Helpers/AQIScale'
import MapController from './MapController/MapController'
import { LocationOption, leftRadios, locationsWithSensors, rightRadios } from './consts'
import { MapDropdownWrapper } from './MapDropdowns/MapDropdownWrapper'
import { LocationDropdown, RankDropdown, StationsDropdown } from './MapDropdowns'
// import { isStationWithinBBOX } from './utils'
import { RankType, StationType } from 'lib/air-pollution-map/types'
import { StationDetail } from './StationDetail'
import StationPin from './Helpers/StationPin'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'

const MAP_BASE_CONFIG = {
  lng: 106.9176,
  lat: 47.9188,
  zoom: 12,
  style: 'streets-v11',
}
// FIXME: Bad to hardcode the API KEY in the code. But since it's static rendering it was easier this way.
const MAPBOX_KEY =
  'pk.eyJ1IjoiYnJlYXRoZW1vbmdvbGlhIiwiYSI6ImNrMjhnMHU4bDEwOXkzaXFodnFiaW1heHIifQ.7MPVleYVPDUY10UE200Zow'

export const MapComponent = ({
  title,
  descriptionHtml,
  stations,
  globalRanks,
}: {
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
  stations: StationType[]
  globalRanks: RankType[]
}) => {
  const { t } = useTranslation('map')
  // init
  const mapContext = useContext(MapContext)
  const map = mapContext?.mapCurrent
  // refs
  const mapContainer = useRef(null)
  // states
  const [zoom, setZoom] = useState(MAP_BASE_CONFIG.zoom)
  const [showStationDetail, setShowStationDetail] = useState(false)
  const [baseMap, setBaseMap] = useState(map?.style?.stylesheet?.id || MAP_BASE_CONFIG.style)
  const [loadedPins, setLoadedPins] = useState(false)

  // dropdown/map related
  const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string }>({
    value: 'ulaanbaatar',
    label: t('province.ulaanbaatar'),
  })
  const [currentDropdown, setCurrentDropdown] = useState<'location' | 'stations' | 'rank' | 'none'>('location')

  useEffect(() => {
    if (!map) {
      // Initialize map once when the MapComponent rendered at the first time
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [MAP_BASE_CONFIG.lng, MAP_BASE_CONFIG.lat],
        zoom: zoom,
        accessToken: MAPBOX_KEY,
      })
      // disable the scroll since the map is full width of the page, and user can't scroll down
      newMap.scrollZoom.disable()
      // Add navigation control (the +/- zoom buttons)
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right')

      const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial',
      })
      newMap.addControl(scale)
      newMap.resize()
      mapContext?.setMapCurrent(newMap)
      scale.setUnit('metric')
    } else {
      // need to replace the dom node with the saved map instance container div
      document.getElementById('map').replaceWith(map.getContainer())
    }
  }, [])

  useEffect(() => {
    if (!loadedPins && map) {
      loadStationPins()
    }
  }, [map])

  // MapController Hooks
  const onSensorTypeChange = (type: string) => {
    setShowStationDetail(false)
    mapContext?.setSelectedStation(null)

    if (type === 'indoor') {
      mapContext?.setShowIndoor(!mapContext?.showIndoor)
    } else {
      mapContext?.setShowOutdoor(!mapContext?.showOutdoor)
    }
  }
  const onMapStyleChange = (value: string) => {
    setBaseMap(value)
    map?.setStyle('mapbox://styles/mapbox/' + value)
  }
  // Selecting a location from LocationDropdown menu, flies to the location
  const onLocationChange = (location: LocationOption) => {
    if (!map) {
      return
    }
    // hide location dropdown if it was open
    setSelectedLocation(location)
    if (currentDropdown === 'location') {
      setCurrentDropdown('none')
    }
    map?.flyTo({
      center: locationsWithSensors[location.value],
      essential: true,
    })
  }

  const onStationClick = (station: any) => {
    // if(isMobile) {
    //   setIsStationsDropdownOpen(false)
    // }
    mapContext?.setSelectedStation(station)
    // const mapBoundingBox = map.getBounds()

    // I think it's better to fly even if it is within bounds?
    map.flyTo({
      center: station.location.coordinates,
      essential: true,
    })
    // if (!isStationWithinBBOX(station.location.coordinates[0], station.location.coordinates[1], mapBoundingBox)) {
    //   // station lon and lat
    // }
  }

  const loadStationPins = () => {
    stations.map((x, idx) => {
      const pin = document.createElement('div')
      ReactDOM.render(
        <StationPin
          key={x.name + '-' + idx}
          station={x}
          onClick={() => {
            onStationClick(x)
          }}
        />,
        pin,
      )
      mapContext.addPin(pin)
      const coords: [number, number] = [x.location.coordinates[0] ?? 0, x.location.coordinates[1] ?? 0]
      new mapboxgl.Marker(pin).setLngLat(coords).addTo(map)
    })
    setLoadedPins(true)
  }

  return (
    <div className="aqi-map-wrapper">
      <H2 className="mb-12" title={title.mn} descriptionHtml={descriptionHtml.mn} />
      <div className={`map-container bg-zinc-100  rounded-md ${showStationDetail && 'station-detail-open'}`}>
        <div id="map" ref={mapContainer} className="map-wrapper"></div>
        <MapDropdownWrapper title={t(`province.${selectedLocation.value}`)}>
          <LocationDropdown
            onLocationClick={(location: any) => onLocationChange(location)}
            selected={selectedLocation}
            setTitleClick={(isOpen: boolean) => {
              setCurrentDropdown(isOpen ? 'location' : 'none')
            }}
            open={currentDropdown === 'location'}
          />
          <StationsDropdown
            stations={stations}
            onStationClick={(station: any) => onStationClick(station)}
            setTitleClick={(isOpen: boolean) => {
              setCurrentDropdown(isOpen ? 'stations' : 'none')
            }}
            selectedStation={mapContext.selectedStation}
            open={currentDropdown === 'stations'}
          />
          <RankDropdown
            data={globalRanks}
            setTitleClick={(isOpen: boolean) => {
              setCurrentDropdown(isOpen ? 'rank' : 'none')
            }}
            open={currentDropdown === 'rank'}
          />
        </MapDropdownWrapper>
        <InfoPopup />
        <MapController
          leftRadios={leftRadios}
          rightRadios={rightRadios}
          onChangeSensorType={(type: string) => onSensorTypeChange(type)}
          baseMap={baseMap}
          onBaseMapChange={(value: string) => onMapStyleChange(value)}
        />
        <AQIScale />
        <StationDetail
          setHidden={() => {
            mapContext.setSelectedStation(null)
          }}
          station={mapContext.selectedStation}
        />
      </div>
    </div>
  )
}

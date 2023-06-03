import { H2 } from 'components/generic/Typography'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef, useState } from 'react'
import { InfoPopup } from './Helpers'
import { t } from 'i18next'
import { MapContext } from 'pages/_app'
import AQIScale from './Helpers/AQIScale'
import MapController from './MapController/MapController'
import { leftRadios, rightRadios } from './consts'

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
}: {
  title: { en: string; mn: string }
  descriptionHtml: { en: string; mn: string }
}) => {
  // init
  const mapContext = useContext(MapContext)
  const map = mapContext?.mapCurrent
  // refs
  const mapContainer = useRef(null)
  // states
  const [zoom, setZoom] = useState(MAP_BASE_CONFIG.zoom)
  const [showStationDetail, setShowStationDetail] = useState(false)
  const [baseMap, setBaseMap] = useState(map?.style?.stylesheet?.id || MAP_BASE_CONFIG.style)

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

  return (
    <div className="aqi-map-wrapper">
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      <div className={`map-container bg-zinc-100 rounded-md ${showStationDetail && 'station-detail-open'}`}>
        <div id="map_dropdowns"></div>
        <div id="map" ref={mapContainer} className="map-wrapper"></div>
        <InfoPopup />
        <MapController
          leftRadios={leftRadios}
          rightRadios={rightRadios}
          onChangeSensorType={(type: string) => onSensorTypeChange(type)}
          baseMap={baseMap}
          onBaseMapChange={(value: string) => onMapStyleChange(value)}
        />
        {/* Other Layers on top of Map */}
        <AQIScale />
      </div>
    </div>
  )
}

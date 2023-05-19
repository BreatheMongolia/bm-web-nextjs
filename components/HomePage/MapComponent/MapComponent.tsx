import { H2 } from 'components/generic/Typography'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef, useState } from 'react'
import { InfoPopup } from './Helpers'
import { t } from 'i18next'
import { MapContext } from 'pages/_app'
import AQIScale from './Helpers/AQIScale'

const MAP_BASE_CONFIG = {
  lng: 106.9176,
  lat: 47.9188,
  zoom: 12,
  style: 'streets-v11',
}
// Set mapbox API KEY

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
    // FIXME: MapBox API Key not working
    return
    if (!map) {
      // Initialize map once when the MapComponent rendered at the first time
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [MAP_BASE_CONFIG.lng, MAP_BASE_CONFIG.lat],
        zoom: zoom,
        accessToken: process.env.MAPBOX_TOKEN,
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
  return (
    <div className="aqi-map-wrapper">
      <H2 title={title.mn} descriptionHtml={descriptionHtml.mn} />
      <div className={`map-container bg-zinc-100 rounded-md ${showStationDetail && 'station-detail-open'}`}>
        <div id="map_dropdowns"></div>
        <div id="map" ref={mapContainer} className="map-wrapper">
          <InfoPopup />
        </div>
        {/* Other Layers on top of Map */}
        <AQIScale />
      </div>
    </div>
  )
}

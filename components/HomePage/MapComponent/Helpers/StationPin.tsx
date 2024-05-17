import { StationType } from 'lib/air-pollution-map/types'
import { GetMarkerByColor } from './PinMarkers'
import { useContext } from 'react'
import { MapContext } from 'pages/_app'

const StationPin = ({ station, onClick }: { station: StationType; onClick: Function }) => {
  const mapContext = useContext(MapContext)

  const isSelectedStation = false
  const getPinStyle = () => {
    let wrapperClassNames = `text-white font-bold relative transition transition-all hover:-mt-1 hover:scale-125`
    let markerClassNames = `absolute text-center w-full
        ${station.type === 'outdoor' ? 'top-[10px]' : 'top-4'}
        ${isSelectedStation && 'bg-red-100'}`

    let pin = GetMarkerByColor(station.type === 'outdoor' ? 'marker' : 'house', station.color)

    return {
      wrapperClassNames,
      markerClassNames,
      pin,
    }
  }

  const styles = getPinStyle()
  return (
    <div onClick={() => onClick()} className={`${styles.wrapperClassNames} marker-${station.type}`}>
      {styles.pin}
      <span className={styles.markerClassNames}>{station.pollution.aqius < 0 ? 0 : station.pollution.aqius}</span>
    </div>
  )
}

export default StationPin

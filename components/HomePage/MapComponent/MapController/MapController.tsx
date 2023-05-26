import React, { FC, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import './style.scss'
import { MapContext } from 'pages/_app'

type Props = {
  leftRadios: any[]
  rightRadios: any[]
  baseMap: string
  onChangeSensorType: Function
  onBaseMapChange: Function
  showStationDetail: boolean
}

const MapController: FC<Props> = ({
  leftRadios,
  rightRadios,
  onChangeSensorType,
  baseMap,
  showStationDetail,
  onBaseMapChange,
}) => {
  const { t, i18n } = useTranslation()
  const mapContext = useContext(MapContext)

  return (
    <div className={'controller_container'}>
      <div id="sensor_switch">
        {leftRadios.map((item: { id: string; value: string; label: string; sublabel: string }, index) => (
          <div className="radio_wrapper" key={index}>
            <input
              id={item.id}
              className="sensor_type"
              type="checkbox"
              name="stoggle"
              value={item.value}
              checked={item.value === 'outdoor' ? mapContext?.showOutdoor : mapContext?.showIndoor}
              onChange={() => onChangeSensorType(item.value)}
            />
            <label htmlFor={item.id}>
              {t(item.label)}
              <span>{t(item.sublabel)}</span>
            </label>
          </div>
        ))}
      </div>
      <div id="basemap_switch">
        {rightRadios.map((item: { id: string; value: string; label: string }, index) => (
          <div className="radio_wrapper" key={index}>
            <input
              id={item.id}
              className="sensor_type"
              type="radio"
              name="rtoggle"
              value={item.value}
              checked={item.id === baseMap}
              onChange={() => onBaseMapChange(item.id)}
            />
            <label htmlFor={item.id}>{t(item.label)}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapController

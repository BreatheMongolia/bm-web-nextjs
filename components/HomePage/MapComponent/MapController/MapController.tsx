import React, { FC, useContext } from 'react'
import { MapContext } from 'pages/_app'
import { useTranslation } from 'next-i18next'

type Props = {
  leftRadios: any[]
  rightRadios: any[]
  baseMap: string
  onChangeSensorType: Function
  onBaseMapChange: Function
}

const MapController: FC<Props> = ({ leftRadios, rightRadios, onChangeSensorType, baseMap, onBaseMapChange }) => {
  const { t } = useTranslation('map')
  const mapContext = useContext(MapContext)

  return (
    <div
      className="
      absolute z-10
      -bottom-32 sm:-bottom-24 md:bottom-2
      left-0 sm:left-2 md:left-auto right-2 
      sm:w-11/12 md:w-auto
      bg-slate-100 rounded-md p-2 px-4
      border-[0.5px] border-black/20 backdrop-blur-xl	
      flex flex-row justify-between
      text-xs gap-x-2
    "
    >
      <div className="flex flex-col justify-around gap-2">
        {leftRadios.map((item: { id: string; value: string; label: string; sublabel: string }, index) => (
          <div className="flex gap-x-3" key={index}>
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
              <span className="inline-block font-bold">{t(item.label)}</span>
              <br />
              <span className="italic lowercase text-[10px]">{t(item.sublabel)}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-around gap-2">
        {rightRadios.map((item: { id: string; value: string; label: string }, index) => (
          <div className="flex space-x-2 font-bold tracking-wider text-zinc-600" key={index}>
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

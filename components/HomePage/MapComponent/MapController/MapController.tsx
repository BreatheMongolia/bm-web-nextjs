import React, { FC, useContext } from 'react'
import { MapContext } from 'pages/_app'
import { useTranslation } from 'react-i18next'

type Props = {
  leftRadios: any[]
  rightRadios: any[]
  baseMap: string
  onChangeSensorType: Function
  onBaseMapChange: Function
}

const MapController: FC<Props> = ({ leftRadios, rightRadios, onChangeSensorType, baseMap, onBaseMapChange }) => {
  const { t } = useTranslation()
  const mapContext = useContext(MapContext)

  return (
    <div
      className="
      absolute bottom-2 right-2
      bg-slate-100 rounded-md p-2 px-4
      border-[0.5px] border-black/20 backdrop-blur-xl	
      flex flex-row justify-between
      text-xs gap-x-2
    "
    >
      <div className="flex flex-col gap-2 justify-around">
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
              <span className="font-bold inline-block">{t(item.label)}</span>
              <br />
              <span className="italic lowercase text-[10px]">{t(item.sublabel)}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 justify-around">
        {rightRadios.map((item: { id: string; value: string; label: string }, index) => (
          <div className="flex space-x-2 font-bold text-zinc-600 tracking-wider" key={index}>
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

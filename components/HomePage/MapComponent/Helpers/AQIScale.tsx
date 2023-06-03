import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AQIScales } from '../consts'
// import { Path } from '../../../assets/icons'
import cx from 'classnames'
import { Bars2Icon } from '@heroicons/react/24/solid'

const AQIScale = () => {
  const { t } = useTranslation()

  const [shown, setShown] = useState(true)

  return (
    <div
      className={`
      w-[400px] absolute left-1.5 bottom-2 z-10
      overflow-hidden rounded-md bg-white text-xsm
      border-[0.5px] border-black/20 backdrop-blur-xl	
      ${!shown && 'folded'}
    `}
    >
      <div
        className="flex px-3 py-1 items-center bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all text-xs"
        onClick={() => setShown(!shown)}
      >
        <h2 className="grow font-bold">{t('map.aqiTitle')}</h2>
        <div className="aqi-scale-btn">
          <Bars2Icon className="h-5 w-5" />
        </div>
      </div>
      {shown && (
        <div className="flex flex-row px-5">
          {AQIScales.map(item => (
            <div className="text-center text-[10px] flex-1 py-1" key={item.value}>
              <AQIBox key={item.color} color={item.color} value={item.value} />
              <AQIText key={item.text} title={t(item.text)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const AQIBox: FC<{ color: string; value: string }> = ({ color, value }) => {
  return (
    <div className={`font-bold py-0.5 text-white ${color}`}>
      <span>{value}</span>
    </div>
  )
}

const AQIText: FC<{ title: string }> = ({ title }) => {
  return <div className="aqi_scale_text text-[9px] px-0.5 mt-0.5">{title}</div>
}

export default AQIScale

import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AQIScales } from '../consts'
// import { Path } from '../../../assets/icons'
import { Bars2Icon } from '@heroicons/react/24/solid'

const AQIScale = () => {
  const { t } = useTranslation('map')

  const [shown, setShown] = useState(true)

  return (
    <div
      className={`
      absolute left-1.5 z-10
      -bottom-6 sm:bottom-2
      w-11/12 md:w-[400px]
      overflow-hidden rounded-md bg-white text-xsm
      border-[0.5px] border-black/20 backdrop-blur-xl	
      ${!shown && 'folded'}
    `}
    >
      <div
        className="flex items-center px-3 py-1 text-xs transition-all cursor-pointer bg-slate-100 hover:bg-slate-200"
        onClick={() => setShown(!shown)}
      >
        <h2 className="font-bold grow">{t('aqiTitle')}</h2>
        <div className="aqi-scale-btn">
          <Bars2Icon className="w-5 h-5" />
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

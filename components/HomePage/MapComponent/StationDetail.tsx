import { StationType } from 'lib/air-pollution-map/types'
import { useTranslation } from 'next-i18next'
import { getAQIColor } from './utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'

export const StationDetail = ({ setHidden, station }: { setHidden: Function; station: StationType }) => {
  const { t } = useTranslation('map')

  const getFormattedDate = () => {
    const ts = station.pollution.ts
    // date is different if from unicef
    const isUnicef = station.sponsoredBy && station.sponsoredBy === 'unicef'
    const date = isUnicef ? new Date(0) : new Date(ts)
    if (isUnicef) {
      date.setUTCSeconds(ts)
    }
    const mins = date.getMinutes() === 0 ? '00' : date.getMinutes()
    return `${date.getHours()}:${mins} Hrs, ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }
  const aqiColor = station ? getAQIColor(station.pollution.aqius) : ''

  return (
    <AnimatePresence>
      {station && (
        <motion.div
          key="station-detail"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute bottom-2 left-1 z-20 w-3/5"
        >
          <div className={`${aqiColor} flex`}>
            <div className="flex flex-col flex-1">
              <div className="px-4 py-3 text-white">
                <span className="font-bold">{station.name}</span>
                <div className="text-[10px] flex justify-between">
                  <div> {getFormattedDate()} </div>
                  {station.sponsoredBy && (
                    <div className="flex">
                      <span className={`sensor_brand ${aqiColor} ${station.sponsoredBy && 'has_brand'}`}>
                        {station.sponsoredBy}
                      </span>
                      <span className="lowercase italic">{t('stationDetail.' + station.type.toLowerCase())}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="grow text-white p-2 flex items-center justify-center"> 1</div>
                <div className="grow p-2 flex items-center justify-center"> 2</div>
              </div>
            </div>
            <div className="flex-1 px-4 py-3">
              <div className="flex items-center">
                <span className="grow font-bold">{t('stationDetail.Recommendations')}</span>
                <div onClick={() => setHidden(true)} className="cursor-pointer hover:text-black/50">
                  <XMarkIcon className="h-5 w-5" />
                </div>
              </div>
              <div>{/* content */}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

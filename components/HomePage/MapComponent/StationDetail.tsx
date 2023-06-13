import { StationType } from 'lib/air-pollution-map/types'
import { useTranslation } from 'next-i18next'
import { getAQIColor, getHealthCategory } from './utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import { healthCategoryDetailsIndoor, healthCategoryDetailsOutdoor } from './consts'

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
  // helper util to get all the different colors
  const getSectionBgColors = (aqiColor: string) => {
    switch (aqiColor) {
      case 'green':
        return {
          topLeft: 'bg-[#78845a]',
          bottomA: 'bg-[#92ba2a]',
          bottomB: 'bg-[#c8dd94]',
          right: 'bg-[#deeabf]',
          otherBox: 'bg-[#e9f0d2]',
        }
      case 'yellow':
        return {
          topLeft: 'bg-[#90885B]',
          bottomA: 'bg-[#E2C62E]',
          bottomB: 'bg-[#F0E497]',
          right: 'bg-[#F6EEC1]',
          otherBox: 'bg-[#f9f3d4]',
        }
      case 'orange':
        return {
          topLeft: 'bg-[#977a5e]',
          bottomA: 'bg-[#f9963b]',
          bottomB: 'bg-[#fccb9d]',
          right: 'bg-[#fce0c4]',
          otherBox: 'bg-[#fee9d6]',
        }
      case 'red':
        return {
          topLeft: 'bg-[#9b5955]',
          bottomA: 'bg-[#ea3224]',
          bottomB: 'bg-[#f59891]',
          right: 'bg-[#f9c2bd]',
          otherBox: 'bg-[#fbd4d1]',
        }
      case 'purple':
        return {
          topLeft: 'bg-[#856a83]',
          bottomA: 'bg-[#b136d1]',
          bottomB: 'bg-[#deafdb]',
          right: 'bg-[#e8c3f1]',
          otherBox: 'bg-[#f0d5f5]',
        }
      case 'brown':
        return {
          topLeft: 'bg-[#845c4f]',
          bottomA: 'bg-[#9a0421]',
          bottomB: 'bg-[#dc9984]',
          right: 'bg-[#d6b9be]',
          otherBox: 'bg-[#e2ced1]',
        }
      default:
        return { topLeft: '', bottomA: '', bottomB: '', right: '', otherBox: '' }
    }
  }

  const aqiColor = station ? getAQIColor(station.pollution.aqius) : ''
  const bgColors = getSectionBgColors(aqiColor)
  const healthCategory = station ? getHealthCategory(station.pollution.aqius) : ''
  const healthCategoryDetails =
    station && station.type === 'indoor'
      ? healthCategoryDetailsIndoor[healthCategory]
      : healthCategoryDetailsOutdoor[healthCategory]

  // separated the content to make the return method more readable
  const ContentTopLeftArea = () => {
    return (
      <div className={`px-4 py-3 text-white ${bgColors.topLeft}`}>
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
    )
  }
  const ContentBottomAreaA = () => {
    const p2 = station.pollution.p2
    return (
      <div className={`text-white px-2 py-1 flex flex-col items-center justify-center ${bgColors.bottomA}`}>
        <div className="text-xs font-semibold"> {t('stationDetail.usaqi')}</div>
        <div className="font-bold text-5xl"> {station.pollution.aqius} </div>
        {p2 && (
          <div className="text-xs text-center">
            <div className="font-light"> PM2.5 </div>
            <div className="font-bold"> {p2 ? p2.conc || p2 : ''} μg/m3 </div>
          </div>
        )}
      </div>
    )
  }
  const ContentBottomAreaB = () => {
    return (
      <div className={`col-span-2 px-4 py-1 flex items-center justify-center space-x-1 ${bgColors.bottomB}`}>
        <div className={`health_category_icon ${healthCategoryDetails.className}`}></div>
        <div className="font-bold text-sm" style={{ lineHeight: '18px' }}>
          {t(`stationDetail.${station.type}Text.${healthCategory}.category_text`)}
        </div>
      </div>
    )
  }
  return (
    <AnimatePresence>
      {station && (
        // simple fade in/out animation
        <motion.div
          key="station-detail"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute bottom-2 left-1 z-20 w-3/5 rounded-sm overflow-hidden
          border-[0.5px] border-black/20 backdrop-blur-xl
          "
        >
          <div className={`${aqiColor} flex`}>
            <div className="flex flex-col flex-1">
              {/* top left */}
              <ContentTopLeftArea />
              <div className="grid grid-cols-3">
                {/* bottom a */}
                <ContentBottomAreaA />
                {/* bottom b */}
                <ContentBottomAreaB />
              </div>
            </div>
            {/* right */}
            <div className={`flex-1 px-4 py-3 ${bgColors.right}`}>
              <div className="flex items-center">
                <span className="grow font-bold">{t('stationDetail.Recommendations')}</span>
                <div onClick={() => setHidden(true)} className="cursor-pointer hover:text-black/30">
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

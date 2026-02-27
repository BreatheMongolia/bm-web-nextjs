import { StationType, RecommendationType } from 'lib/air-pollution-map/types'
import { useTranslation } from 'next-i18next'
import { getAQIColor } from './utils'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import { RecommendationCard } from '../../Cards/RecommendationCard'
import { getTranslated } from 'lib/utils/getTranslated'

export const StationDetail = ({
  setHidden,
  station,
  recommendation,
  locale,
}: {
  setHidden: Function
  station: StationType
  recommendation: RecommendationType | null
  locale: string
}) => {
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
          otherBox: 'md:bg-[#e9f0d2]',
        }
      case 'yellow':
        return {
          topLeft: 'bg-[#90885B]',
          bottomA: 'bg-[#E2C62E]',
          bottomB: 'bg-[#F0E497]',
          right: 'bg-[#F6EEC1]',
          otherBox: 'md:bg-[#f9f3d4]',
        }
      case 'orange':
        return {
          topLeft: 'bg-[#977a5e]',
          bottomA: 'bg-[#f9963b]',
          bottomB: 'bg-[#fccb9d]',
          right: 'bg-[#fce0c4]',
          otherBox: 'md:bg-[#fee9d6]',
        }
      case 'red':
        return {
          topLeft: 'bg-[#9b5955]',
          bottomA: 'bg-[#ea3224]',
          bottomB: 'bg-[#f59891]',
          right: 'bg-[#f9c2bd]',
          otherBox: 'md:bg-[#fbd4d1]',
        }
      case 'purple':
        return {
          topLeft: 'bg-[#856a83]',
          bottomA: 'bg-[#b136d1]',
          bottomB: 'bg-[#deafdb]',
          right: 'bg-[#e8c3f1]',
          otherBox: 'md:bg-[#f0d5f5]',
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

  // converts current recommendation's advices to an array
  const getAdvices = () => {
    return recommendation?.advices ?? []
  }

  // separated the content to make the return method more readable
  const ContentTopLeftArea = () => {
    return (
      <div className={`px-4 py-3 text-white ${bgColors.topLeft}`}>
        <span className="font-bold">{station.name}</span>
        <div className="text-[10px] flex flex-col md:flex-row gap-y-1 justify-between">
          <div> {getFormattedDate()} </div>
          {station.sponsoredBy && (
            <div className="flex">
              <span className={`sensor_brand ${aqiColor} ${station.sponsoredBy && 'has_brand'}`}>
                {station.sponsoredBy}
              </span>
              <span className="italic lowercase">{t('stationDetail.' + station.type.toLowerCase())}</span>
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
        <div className="text-xs font-semibold uppercase"> {t('stationDetail.usaqi')}</div>
        <div className="text-3xl font-bold md:text-5xl">
          {' '}
          {station.pollution.aqius < 0 ? 0 : station.pollution.aqius}{' '}
        </div>
        {p2 && (
          <div className="text-xs text-center">
            <div className="font-regular"> PM2.5 </div>
            <div className="font-bold"> {p2 ? p2.conc || p2 : ''} μg/m3 </div>
          </div>
        )}
      </div>
    )
  }
  const ContentBottomAreaB = () => {
    return (
      <div className={`col-span-2 px-1 md:px-4 py-1 flex items-center justify-center space-x-1 ${bgColors.bottomB}`}>
        <div className={`health_category_icon ${recommendation?.airQuality}`}></div>
        <div className="text-sm font-bold" style={{ lineHeight: '18px' }}>
          {getTranslated(recommendation?.description, recommendation?.descriptionMn, locale)}
        </div>
      </div>
    )
  }

  const ContentRightArea = () => {
    return (
      <div className={`flex-grow px-1 md:px-2 py-0.5 md:py-2 ${bgColors.right}`}>
        <div className="flex items-center">
          <span className="hidden font-bold grow md:inline-block">{t('stationDetail.Recommendations')}</span>
          <div
            onClick={() => setHidden(true)}
            className="absolute text-white cursor-pointer hover:text-black/30 right-1 top-1 md:relative md:right-auto md:top-auto md:text-inherit"
          >
            <XMarkIcon className="w-5 h-5" />
          </div>
        </div>
        {/* Recommended Area */}
        <div className="grid grid-cols-3 gap-1 md:grid-cols-1 xl:grid-cols-2">
          {getAdvices().map((advice, idx) => (
            <div key={'recommendationCard' + idx} className={`${bgColors.otherBox} rounded-md`}>
              <RecommendationCard
                slug={advice.takeAction.nodes?.[0]?.slug}
                icon={advice.icon.node}
                comment={advice.comment}
                commentMn={advice.commentMn}
                locale={locale}
              />
            </div>
          ))}
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
          className="absolute bottom-24 md:bottom-2 md:left-1 z-20 w-full md:w-3/5 rounded-sm overflow-hidden
          border-[0.5px] border-black/20 backdrop-blur-xl
          "
        >
          <div className={`${aqiColor} flex flex-col md:flex-row items-stretch`}>
            <div className="flex flex-col grow">
              {/* top left */}
              <ContentTopLeftArea />
              <div className="grid grid-cols-3 grow">
                {/* bottom a */}
                <ContentBottomAreaA />
                {/* bottom b */}
                <ContentBottomAreaB />
              </div>
            </div>
            {/* right */}
            <ContentRightArea />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

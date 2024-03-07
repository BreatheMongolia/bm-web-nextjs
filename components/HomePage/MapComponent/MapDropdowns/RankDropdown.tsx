import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { RankType } from 'lib/air-pollution-map/types'
import { useTranslation } from 'next-i18next'
import { getAQIColor } from '../utils'

export const RankDropdown = ({
  data,
  setTitleClick,
  open,
}: {
  data: RankType[]
  setTitleClick: Function
  open: boolean
}) => {
  const { t } = useTranslation('map')
  // show ub rank
  const ubRank = data.findIndex(x => x.city === 'Ulaanbaatar')

  function buildCountryAQIUrl(rank: RankType) {
    const country = rank.country.toLowerCase().replaceAll(' ', '-')
    const state = rank.state.toLowerCase().replaceAll(' ', '-')
    const city = rank.city.toLowerCase().replaceAll(' ', '-')
    return `https://www.iqair.com/us/${country}/${state}/${city}`
  }
  return (
    <div className="font-semibold">
      <div
        className={`flex items-center pl-4 cursor-pointer bg-sky-50 text-black hover:bg-slate-300 py-2 ${open && 'border-b-[1px] border-[#4870d7]/50 '
          }`}
        onClick={() => setTitleClick(!open)}
      >
        <div className="grow text-xs">
          {t('stationDetail.uBWorldRanking')} #{ubRank === -1 ? 1 : ubRank}
        </div>
        <div className="px-3">
          <ChevronDownIcon className={`h-5 w-5 transition-all ${open && 'rotate-180'}`} />
        </div>
      </div>
      <div className={`overflow-hidden transition-all overflow-y-auto ${!open ? 'h-0' : 'h-48'}`}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                const url = buildCountryAQIUrl(item)
                window.open(url, '_blank')
              }}
              title={`AirVisual AQI Rank for ${(item.country, item.city)}`}
              className={`py-3 text-zinc-900 pl-4 text-xs
                    border-b-[0.5px] border-slate-300 cursor-pointer
                    hover:bg-[#4870d7] hover:text-white
                    flex items-center px-3 gap-x-1
                    ${ubRank === index && 'bg-amber-200'} 
                `}
            >
              <span className="grow">
                {index + 1}. {item.city}, {item.country}
              </span>
              <span>{item.ranking.current_aqi}</span>
              <div className={`aqi_circle ${getAQIColor(item.ranking.current_aqi)}`}> </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

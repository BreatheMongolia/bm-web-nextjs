import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'

export const RankDropdown = ({
  ubRank,
  data,
  setTitleClick,
  open,
}: {
  ubRank: number
  data: []
  setTitleClick: Function
  open: boolean
}) => {
  const { t } = useTranslation('map')
  return (
    <div className="font-semibold">
      <div
        className={`flex items-center pl-4 cursor-pointer bg-sky-50 text-black hover:bg-slate-300 py-2 ${
          open && 'border-b-[1px] border-[#4870d7]/50 '
        }`}
        onClick={() => setTitleClick(!open)}
      >
        <div className="grow text-xs">{t('stationDetail.uBWorldRanking')}</div>
        <div className="px-3">
          <ChevronDownIcon className={`h-5 w-5 transition-all ${open && 'rotate-180'}`} />
        </div>
      </div>
      <div className={`overflow-hidden transition-all overflow-y-auto ${!open ? 'h-0' : 'h-48'}`}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-3 text-zinc-900 pl-4 text-xs
                    border-b-[0.5px] border-slate-300 
                `}
            >
              <span> {t(item)} </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

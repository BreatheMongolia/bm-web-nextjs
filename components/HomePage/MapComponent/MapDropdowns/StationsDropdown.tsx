import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'

export const StationsDropdown = ({
  stations,
  onStationClick,
  setTitleClick,
  open,
}: {
  stations: any
  onStationClick: Function
  setTitleClick: Function
  open: boolean
}) => {
  const { t } = useTranslation('map')
  return (
    <div className="font-semibold">
      <div
        className="flex items-center pl-4 cursor-pointer bg-sky-50 border-b-[1px] border-[#4870d7]/50  text-black hover:bg-slate-300 py-2"
        onClick={() => setTitleClick(!open)}
      >
        <div className="grow text-xs">{t('stationDetail.selectAStation')}</div>
        <div className="px-3">
          <ChevronDownIcon className={`h-5 w-5 transition-all ${open && 'rotate-180'}`} />
        </div>
      </div>
      <div className={`overflow-hidden transition-all overflow-y-auto ${!open ? 'h-0' : 'h-48'}`}>
        {stations.map(zone => {
          return (
            <div
              key={zone.value}
              className={`py-3 text-zinc-900 pl-4 text-xs
                    border-b-[0.5px] border-slate-300 cursor-pointer
                    hover:bg-[#4870d7] hover:text-white
                `}
              onClick={() => onStationClick(zone)}
            >
              <span> {t(zone.label)} </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

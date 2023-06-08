import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'
import { locationOptions } from '../consts'

export const LocationDropdown = ({
  onLocationClick,
  setTitleClick,
  open,
  selected,
}: {
  onLocationClick: Function
  selected: any
  setTitleClick: Function
  open: boolean
}) => {
  const { t } = useTranslation('map')
  console.log(selected)
  return (
    <div className="font-semibold">
      <div
        className="flex items-center pl-4 cursor-pointer bg-[#4870d7] mb-[1px] hover:bg-[#4870d7]/90 py-2"
        onClick={() => setTitleClick(!open)}
      >
        <div className="grow text-xs">{t('selectProvince')}</div>
        <div className="px-3">
          <ChevronDownIcon className={`h-5 w-5 transition-all ${open && 'rotate-180'}`} />
        </div>
      </div>
      <div className={`overflow-hidden transition-all overflow-y-auto ${!open ? 'h-0' : 'h-48'}`}>
        {locationOptions.map(zone => {
          return (
            <div
              key={zone.value}
              className={`py-3 text-zinc-900 pl-4 text-xs
                    border-b-[0.5px] border-slate-300 cursor-pointer
                    hover:bg-[#4870d7] hover:text-white
                    ${selected.value === zone.value && ' bg-[#4870d7]/20'}
                `}
              onClick={() => onLocationClick(zone)}
            >
              <span> {t(zone.label)} </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

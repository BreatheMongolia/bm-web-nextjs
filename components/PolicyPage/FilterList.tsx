import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

type FilterButtonProps = {
  id: number
  name: string
  isActive: boolean
  onClick?: any
  children?: JSX.Element
}

export const FilterList = (props: FilterButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [delayHandler, setDelayHandler] = useState(null)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleMouseEnter = event => {
    setIsDropdownOpen(true)
    clearTimeout(delayHandler)
  }

  const handleMouseLeave = () => {
    setDelayHandler(setTimeout(() => setIsDropdownOpen(false), 500))
  }

  return (
    <div
      className="relative flex place-content-start gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={toggleDropdown}
          className={`w-28 border border-[#ADC4CC] font-semibold text-black py-1 rounded-2xl flex gap-3 justify-center items-center  ${props.isActive && 'bg-bm-blue text-white hover:bg-bm-blue-hover'
            }`}
        >
          {props.name}
          {props.children &&
            (isDropdownOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />)}
        </button>
      </div>
      {props.children && isDropdownOpen && !isMobile && (
        <div
          className={`absolute top-10 left- bg-white z-50 rounded-r-lg rounded-bl-lg border border-[#D9D9D9] w-44 font-normal`}
        >
          {props.children}
        </div>
      )}
      {props.children && isDropdownOpen && isMobile && <div className="mt-2 mb-2 py-2 bg-white">{props.children}</div>}
    </div>
  )
}

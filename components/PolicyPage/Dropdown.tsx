import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
<<<<<<< HEAD
=======
import { useMediaQuery } from 'react-responsive'
>>>>>>> develop

export type OptionProps = {
  id?: string
  label: string
  value: string
}

type DropdownProps = {
  id: string
  label: string
  selectedOption?: string
  onClick?: (e: string) => void
  options: OptionProps[]
}

export const Dropdown = ({ id, label, onClick, selectedOption, options = [] }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
<<<<<<< HEAD
=======
  const isMobile = useMediaQuery({ maxWidth: 767 })
>>>>>>> develop
  const ref = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const handleOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
<<<<<<< HEAD
    <div className="relative md:w-28 col-span-2" onClick={toggleDropdown} id={id} ref={ref}>
      <div className={`${(id === 'year' || id === 'statuses') && 'md:w-28 col-span-3'}`}>
        <button
          onClick={() => setIsDropdownOpen(false)}
          className={`flex w-full px-3 border border-[#ADC4CC] font-semibold text-black py-1 rounded-xl gap-3 items-center ${
=======
    <div className="relative flex place-content-start gap-2" onClick={toggleDropdown} id={id} ref={ref}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsDropdownOpen(false)}
          className={`w-28 border border-[#ADC4CC] font-semibold text-black py-1 rounded-xl flex gap-3 justify-center items-center  ${
>>>>>>> develop
            selectedOption && 'bg-bm-blue text-white hover:bg-bm-blue-hover'
          }`}
        >
          {label}
          {isDropdownOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
      </div>

<<<<<<< HEAD
      {isDropdownOpen && (
        <div
          className={`absolute top-10 bg-white ${
            (id === 'topics' || id === 'year') && 'md:left-0 right-0'
          } z-50 rounded-r-lg rounded-bl-lg border border-[#D9D9D9] w-48 font-normal`}
=======
      {isDropdownOpen && !isMobile && (
        <div
          className={`absolute top-10 left- bg-white z-50 rounded-r-lg rounded-bl-lg border border-[#D9D9D9] w-48 font-normal`}
>>>>>>> develop
        >
          {options.map((option, idx) => (
            <div
              key={option.id || option.value || idx}
              className="block px-2 py-2 hover:bg-gray-100 hover:text-bm-blue border-b border-dashed text-sm"
              onClick={() => {
                onClick(option.value)
              }}
            >
              <input
                id={selectedOption + idx}
                type="checkbox"
                className="mr-2"
                checked={option.value === selectedOption}
                readOnly
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
<<<<<<< HEAD
=======
      {isDropdownOpen && isMobile && (
        <div className="mt-2 mb-2 py-2 bg-white">
          {options.map((option, idx) => (
            <div
              key={option.id || idx}
              className="block px-2 py-2 hover:bg-gray-100 hover:rounded-xl hover:text-bm-blue mx-auto w-[95%] l-[90%]"
              onClick={() => {
                onClick(option.value)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
>>>>>>> develop
    </div>
  )
}

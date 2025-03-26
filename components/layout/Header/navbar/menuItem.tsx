import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

type MenuItemProps = {
  title: string | JSX.Element
  href?: string
  isActive: boolean
  target?: string
  children?: JSX.Element
}

export const MenuItem = (props: MenuItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [delayHandler, setDelayHandler] = useState(null)
  const isMobile = useMediaQuery({ maxWidth: 680 || 767 })

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
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center justify-between">
        {props.href ? (
          <Link
            className={`hover:text-bm-blue font-semibold ${props.isActive && ' text-bm-blue'}`}
            href={props.href}
            target={props.target}
          >
            {props.title}
          </Link>
        ) : (
          <button
            className={`text-xsm uppercase hover:text-bm-blue font-semibold  ${props.isActive && ' text-bm-blue'}`}
          >
            {props.title}
          </button>
        )}
        {props.children && (
          <button onClick={toggleDropdown} className="ml-2 focus:outline-none">
            <ChevronDownIcon className={`h-5 w-5`} />
          </button>
        )}
      </div>
      {props.children && isDropdownOpen && !isMobile && (
        <div className="absolute left-1 top-8 mt-2 mb-2 w-60 py-2 bg-white shadow-lg rounded-xl z-10">
          {props.children}
        </div>
      )}
      {props.children && isDropdownOpen && isMobile && <div className="mt-2 mb-2 py-2 bg-white">{props.children}</div>}
    </div>
  )
}

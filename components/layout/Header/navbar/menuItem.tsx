import Link from 'next/link'
import { useState } from 'react'

type MenuItemProps = {
  title: string | JSX.Element
  href: string
  isActive: boolean
  target?: string
  children?: JSX.Element
}

export const MenuItem = (props: MenuItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [delayHandler, setDelayHandler] = useState(null)

  const handleMouseEnter = event => {
    setIsDropdownOpen(true)
    clearTimeout(delayHandler)
  }

  const handleMouseLeave = () => {
    setDelayHandler(setTimeout(() => setIsDropdownOpen(false), 500))
  }
  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
      className={`hover:text-bm-blue font-semibold ${props.isActive && ' text-bm-blue'}`}
      href={props.href}
      target={props.target}
      >
        {props.title}
      </Link>
      {props.children && isDropdownOpen && (
        <div className="absolute left-0 mt-2 mb-2 w-60 py-2 bg-white shadow-lg rounded-xl">
          {props.children}
        </div>
      )}
    </div>
  )
}

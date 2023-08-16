import React, { FC, useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Desktop from '../Desktop'
import Mobile from '../Mobile'
import Link from 'next/link'

type Props = {
  handleMenuToggle?: Function
}

const SearchBar: FC<Props> = ({ handleMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const matchUrl = `/${i18n.language}`
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setIsOpen(true)
      router.push(`${matchUrl}/search?s=${e.target.value}`)
    }
  }

  const closeSearchBar = e => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeSearchBar)
    return () => {
      document.removeEventListener('click', closeSearchBar)
    }
  }, [])

  return (
    <>
      <Desktop>
        <div className="header-search-container" ref={containerRef}>
          <div
            className={cx('header-search', isOpen && 'open')}
            onClick={() => {
              setIsOpen(true)
              inputRef.current.focus()
            }}
          >
            <input type="text" ref={inputRef} onKeyDown={e => handleKeyDown(e)} />
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="header-search-container">
          <Link href="/search">
            <div className="h-[40px] w-[40px] hover:bg-black/10 rounded flex items-center justify-center">
              <MagnifyingGlassIcon className="h-6 w-6 -scale-x-100" />
            </div>
          </Link>
        </div>
      </Mobile>
    </>
  )
}

export default SearchBar

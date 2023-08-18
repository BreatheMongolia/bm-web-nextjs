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

const SearchBar: FC<Props> = () => {
  // const matchUrl = `/${i18n.language}`

  return (
    <div className="header-search-container">
      <Link href="/search">
        <div className="h-[40px] w-[40px] hover:bg-black/10 rounded flex items-center justify-center">
          <MagnifyingGlassIcon className="h-6 w-6 -scale-x-100" />
        </div>
      </Link>
    </div>
  )
}

export default SearchBar

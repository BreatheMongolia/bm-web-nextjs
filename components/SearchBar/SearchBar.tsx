import React, { FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type Props = {
  handleMenuToggle?: Function
}

const SearchBar: FC<Props> = () => {
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

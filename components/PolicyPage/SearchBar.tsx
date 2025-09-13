import React, { FC, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'

type Props = {
  onSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBar: FC<Props> = ({ onSubmit }) => {
  const inputRef = useRef(null)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (onSubmit) {
        onSubmit(e)
      }
    }
  }

  return (
    <div className="flex lg:w-full md:w-[468px] sm:w-full md:text-lg text-sm align-center shadow-md border-[#E5E5E5] rounded-[10px] overflow-hidden bg-white px-[16px] mr-[10px] relative">
      <MagnifyingGlassIcon className="w-6 h-6 absolute left-[16px] mt-1 top-[calc(50% - 12px)]" color="#BBBBBB" />
      <input
        className="outline-none pl-[34px]"
        id="policy-search-input"
        name="policy-search-input"
        type="text"
        placeholder={useTranslation('policy').t('searchButton')}
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default SearchBar

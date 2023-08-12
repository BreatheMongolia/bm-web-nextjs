import React, { FC, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

type Props = {
  value: string
  count: number
}

const SearchBar: FC<Props> = ({ value, count }) => {
  const [searchValue, setSearchValue] = useState(value)
  const inputRef = useRef(null)
  const router = useRouter()
  const { t, i18n } = useTranslation('search')
  const matchUrl = `/${i18n.language}`

  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      router.push(`${matchUrl}/search?s=${e.target.value}`)
    }
  }

  const handleSearchClick = () => {
    if (inputRef.current.value !== '') {
      router.push({
        pathname: `${matchUrl}/search`,
        search: `?s=${inputRef.current.value}`,
      })
    }
    if (inputRef.current.value === '') {
      router.push({
        pathname: `${matchUrl}/search`,
      })
    }
  }

  return (
    <div className="search-form-container">
      <div className="search-form">
        <input
          type="text"
          placeholder="Хайлт хийх"
          ref={inputRef}
          onKeyDown={e => handleKeyDown(e)}
          defaultValue={searchValue}
        />
        <div className="search-btn" onClick={() => handleSearchClick()}>
          <MagnifyingGlassIcon />
        </div>
      </div>

      <div className="search-result">
        <b>{count}</b> {t('results')} <b>"{searchValue}"</b>
      </div>
    </div>
  )
}

export default SearchBar

import React, { FC, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

type Props = {
    onSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBar: FC<Props> = ({ onSubmit }) => {
    const [searchValue, setSearchValue] = useState();
    const inputRef = useRef(null)

    return (
        <div className="flex align-center shadow-md border-[#E5E5E5] rounded-[10px] overflow-hidden h-[44px] bg-white px-[16px] py-[10px] mr-[10px]">
            <MagnifyingGlassIcon className="w-6 h-6" color="#BBBBBB" />
            <div className="bg-[#BBBBBB] w-[2px] mx-[16px]"></div>
            <input
                className="outline-none"
                id="policy-search-input"
                name="policy-search-input"
                type="text"
                placeholder="Хайлт хийх"
                ref={inputRef}
                onKeyDown={e => onSubmit(e)}
                defaultValue={searchValue}
            />
        </div>
    )
}

export default SearchBar

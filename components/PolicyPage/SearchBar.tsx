import React, { FC, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

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
        <div className="flex align-center shadow-md border-[#E5E5E5] rounded-[10px] overflow-hidden h-[44px] bg-white px-[16px] py-[10px] mr-[10px] relative">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-[16px] top-[calc(50% - 12px)]" color="#BBBBBB" />
            <input
                className="outline-none pl-[34px]"
                id="policy-search-input"
                name="policy-search-input"
                type="text"
                placeholder="Хайлт хийх"
                ref={inputRef}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default SearchBar

import React from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ placeholder }) => {
    return (
        <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
            <MdSearch />
            <input className='bg-transparent border-none text-white' type='text' placeholder={placeholder} />
        </div>
    )
}

export default Search

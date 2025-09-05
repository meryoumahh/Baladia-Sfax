'use client'
import Link from 'next/link'
import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchButton = () => {
  return (
    <Link
    href={'#'}>
        <div className='bg-blue-500 rounded-full p-2.5 '>
            <CiSearch />
        </div>
    </Link>
  )
}

export default SearchButton
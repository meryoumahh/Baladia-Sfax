'use client'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight } from "react-icons/fi";

const SearchButton = () => {
  return (
    <Link
    href={'#'}>
        <div className='bg-blue-500 rounded-full w-15 h-15 flex items-center justify-center'>
            <FiArrowRight color='#cbd5e1' size={25} />
        </div>
    </Link>
  )
}

export default SearchButton
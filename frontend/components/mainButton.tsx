'use client'
import Link from 'next/link'
import React from 'react'

const MainButton = ({
  href = '#',
  children
}: {
  href?: string
  children: React.ReactNode
}) => {
  return (
    <Link href={href}>
      <div className='bg-amber-50 text-neutral-900 font-medium font-inter text-s sm:text-l py-1 px-3 w-fit rounded-full flex items-center '>
        {children}
      </div>
    </Link>
  )
}

export default MainButton
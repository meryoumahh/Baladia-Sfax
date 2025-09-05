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
      <div className='bg-blue-500 text-white text-xl font-bold py-2 px-3 rounded-full flex items-center gap-2'>
        {children}
      </div>
    </Link>
  )
}

export default MainButton
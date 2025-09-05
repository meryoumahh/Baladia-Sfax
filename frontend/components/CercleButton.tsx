'use client'
import Link from 'next/link'
import React from 'react'

const CercleButton = ({ 
  href = '#', 
  children 
}: { 
  href?: string; 
  children: React.ReactNode; 
}) => {
  return (
    <Link href={href}>
      <div className='bg-blue-500 rounded-full w-15 h-15 flex items-center justify-center'>
        {children}
      </div>
    </Link>
  )
}

export default CercleButton
import React from 'react'
import Link from 'next/link'
const SecondButton = ({
      href = '#',
      children
    }: {
      href?: string
      children: React.ReactNode
}) => {
  return (
    <Link href={href}>
      <div className='bg-blue2 text-amber-50  font-inter font-medium text-s sm:text-l py-1 px-3 w-fit rounded-full flex items-center'>
        {children}
      </div>
    </Link>
  )
}

export default SecondButton
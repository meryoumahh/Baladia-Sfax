'use client'
import Link from 'next/link'
import React from 'react'

type SpecialButtonProps = {
  variant: 'main' | 'sec'
  href?: string
  onClick?: () => void
  children: React.ReactNode
}

const SpecialButtons = ({ variant, href = '#', onClick, children }: SpecialButtonProps) => {
  // Define styles for each variant
  const baseClasses =
    'font-light  sm:font-light text-xs sm:text-xl  font-inter py-1 px-3 w-fit flex items-center gap-2 border-[3px]'

  const styles = {
    main: `${baseClasses} bg-amber-50 text-[#58A0C8] rounded-bl-full rounded-tl-full border-[#58A0C8]`,
    sec: `${baseClasses} bg-blue2 text-amber-50 rounded-br-full rounded-tr-full border-[#58A0C8]`
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={styles[variant]}>
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <div className={styles[variant]}>
        {children}
      </div>
    </Link>
  )
}

export default SpecialButtons

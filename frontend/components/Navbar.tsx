import React from 'react'
import MainButtonG from './MainButtonG'
import Link from "next/link"
import Image from "next/image"
const Navbar = () => {
  return (
    <>
    <div className='flex justify-between  align-middle'>
    <Image className='m-4'
    src="/images/logo.png"
    width={120}
    height={120}
    alt="logo" 
    />
    <div className='flex justify-end items-center space-x-6 py-4 '>
        <Link href ="#" className='text-xl'>Acceuil</Link>
        <Link href ="#" className='text-xl'>A propos</Link>
        <Link href ="#" className='text-xl'>Services</Link>
        <Link href ="#" className='text-xl'>Contact</Link>
        <MainButtonG href='auth/signin'>
            Se Connecter
        </MainButtonG>
    </div>
    </div>
    </>
  )
}

export default Navbar
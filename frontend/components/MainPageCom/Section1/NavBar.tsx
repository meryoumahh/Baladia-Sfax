import React from 'react'
import Link from 'next/link'
import MainButton from '../../MainButton'
import SecondButton from '../../SecondButton'
import { logoutUser } from '../../../app/utils/auth'
import { useRouter } from 'next/navigation'

interface NavBarProps {
  user?: any;
  redirectToDashboard?: (user: any) => void;
}

const NavBar = ({ user, redirectToDashboard }: NavBarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <nav className=" shadow-sm  w-full my-0">
      <div className=" mx-auto px-4 py-4 flex justify-between items-center align-middle">
        {/* Logo */}
        <Link href="/">
          <span className="hidden sm:inline text-xl font-bold font-josefin font-blue">Baladia</span>
        </Link>

        {/* Menu Links */}
        <div className="flex space-x-6 flex-wrap align-end items-center">
          <Link href="/" className="hover:text-[#58A0C8] text-amber-50 font-inter font-medium text-s sm:text-l">Home</Link>
          <Link href="/about" className="hover:text-[#58A0C8] text-amber-50 font-inter font-medium text-s sm:text-l">About</Link>
          <Link href="/services" className="hover:text-[#58A0C8] text-amber-50 font-inter font-medium text-s sm:text-l">Services</Link>
          <Link href="/contact" className="hover:text-[#58A0C8] text-amber-50 font-inter font-medium text-s sm:text-l">Contact</Link>
          {user ? (
            <button 
              onClick={() => redirectToDashboard && redirectToDashboard(user)}
              className="bg-[#58A0C8] text-white px-4 py-2 rounded-full hover:bg-[#4a8bb8] font-inter font-medium text-s sm:text-l"
            >
              Reclamer
            </button>
          ) : (
            <SecondButton href="/auth/signin">Reclamer</SecondButton>
          )}
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 font-inter font-medium text-s sm:text-l"
            >
              Se Déconnecter
            </button>
          ) : (
            <MainButton href="/auth/signin">Se Connecter</MainButton>
          )}
          
        </div>
      </div>
    </nav>
  )
}

export default NavBar
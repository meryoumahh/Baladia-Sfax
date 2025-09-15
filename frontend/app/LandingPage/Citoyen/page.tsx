"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/app/utils/auth';
import { logoutUser } from '@/app/utils/auth';
import { FiUser } from 'react-icons/fi';
import { FiEye  } from 'react-icons/fi';
import { FaMapMarkerAlt } from "react-icons/fa";
import RecList from '@/components/Reclamtion/ReclamationList';
import { FaPen } from "react-icons/fa";
import InfoBar from '@/components/MainPageCom/Section1/InfoBar';
import Link from 'next/link';
const page = () => {
  const [user, setUser] = useState<any>(null);
  const [existing, setExisting] = useState(false)
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUser(userInfo);
        setExisting(true);
      }
    } catch (error) {
      // User not authenticated, show landing page normally
    }
  };

  const redirectToDashboard = (user: any) => {
    if (user.is_staff) {
      router.push('/Dashboard/Admin');
    } else if (user.role === 'agent') {
      router.push('/Dashboard/Agent');
    } else if (user.role === 'citoyen') {
      router.push('/Dashboard/citoyen');
    }
  };
   const handleLogOut = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <>
      <InfoBar/>
      <div className="flex flex-col justify-center  gap-15 items-center min-h-screen w-full bg-blue1"
             style={{ backgroundImage: "url('/images/wordswhite.png')" }}>

              {user && (
                <div className="w-full py-2 text-center border-b flex justify-between items-center px-20">
                  <Link href="/">
                    <span className="hidden sm:inline text-xl font-bold font-josefin font-blue">Baladia</span>
                  </Link>
                  <span className="text-black">Rebonjour, {user.first_name}!</span>
                  <div className='flex justify-between gap-10'>
                  <button 
                    onClick={() => redirectToDashboard(user)}
                    className="ml-4 bg-green-600 text-white px-4 py-1 rounded-full  hover:bg-green-700"
                  >
                    Mon tableau de bord
                  </button>
                  <button
                        onClick={handleLogOut}
                        className="bg-red-500 text-white px-4 py-1 rounded-full "
                    >
                        Deconnecter
                  </button>
                  </div>
                </div>
              )}
              <div className='flex flex-col '>
                <h1 className='bg-[#58A0C8] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Consulter la liste de vos réclamations déposées et leurs états.</h1>
                <h1 className='bg-[#113f67] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Déposer de Nouvelles reclamations.</h1>
              </div>
              <div className='flex flex-col bg-white shadow-2xl w-2/3 p-10 rounded-xl'>
              <RecList/>
              </div>
          </div>
    </>
  )
}

export default page

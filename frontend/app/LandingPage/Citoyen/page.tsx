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
import { FaPlus } from 'react-icons/fa';
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
                <div className="w-full py-2 text-center shadow-sm flex justify-between items-center px-10">
                  <Link href="/">
                    <span className="hidden sm:inline text-xl font-extrabold font-josefin font-blue">Baladia</span>
                  </Link>
                  
                  <div className='flex justify-between gap-5'>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-3 py-1 rounded-xl text-amber-50 hover:bg-[#58A0C8] hover:text-amber-50 active:bg-[#3c92c1] transition"
                    >
                      Accueil
                    </button>
                  <button 
                   
                    className="ml-4 text-amber-50 px-3 py-1 rounded-xl  hover:bg-[#58A0C8] active:bg-[#3c92c1] transition "
                  >
                    Mon tableau de bord
                  </button>
                  <button
                      onClick={() => window.location.href = '/'}
                      className="px-3 py-1 rounded-xl text-amber-50 hover:bg-[#58A0C8] hover:text-amber-50 active:bg-[#3c92c1] transition"
                    >
                      Nouveautés
                    </button>
                  <button
                        onClick={handleLogOut}
                        className="bg-red-500 text-amber-50 px-3 py-1 rounded-xl "
                    >
                        Deconnecter
                  </button>
                  </div>
                </div>
              )}
              <div className='flex flex-col w-9/10 justify-center items-center align-middle bg-amber-50 rounded-xl p-5 '>
                <div className='flex justify-between p-20'>
                  <div className='flex flex-col g-10 text-start px-30'>
                  <h1 className='text-3xl font-extrabold text-[#113f67]'>Tableau de bord : </h1>
                  <h2 className='text-xl font-medium text-[#113f67]'>Suivez vos réclamations et signalements d’infrastructures.</h2>
                  </div> 
                  <button 
                   onClick={() => router.push('/Dashboard/citoyen/')}
                  className='flex justify-center items-center gap-2 text-amber-50 bg-[#113f67] rounded-xl px-5 mx-25 h-10 shadow-xl active:bg-[#3c92c1] transition'>
                    <FaPlus size={15}/> Ajouter Reclamation
                  </button>

                </div>
                  
                <div className='flex gap-4 w-full justify-center items-center'>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>Résolu</h1>
                  <span className='text-2xl font-medium text-green-500'>2</span></div>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>En cours</h1>
                  <span className='text-2xl font-medium text-amber-700'>2</span></div>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>En attente</h1>
                  <span className='text-2xl font-medium text-red-500'>2</span></div>
                </div>
              </div>




              <div className='flex flex-col bg-amber-50 shadow-2xl w-9/10 p-10 rounded-xl'>
              <RecList/>
              </div>
          </div>
    </>
  )
}

export default page

"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/app/utils/auth';
import { logoutUser } from '@/app/utils/auth';
import { FiSettings } from 'react-icons/fi';
import { FiEye  } from 'react-icons/fi';
import { FaPen } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
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
      {user && (
        <div className="bg-green-100 py-2 text-center border-b flex justify-between items-baseline px-20">
          <span className="text-green-800">Rebonjour, {user.first_name}!</span>
           <div className='flex justify-between gap-10'>
          <button 
            onClick={() => redirectToDashboard(user)}
            className="ml-4 bg-green-600 text-white px-4 py-1 rounded-full mt-4 hover:bg-green-700"
          >
            Mon tableau de bord
          </button>
          <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-1 rounded-full mt-4"
            >
                Deconnecter
          </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center  gap-15 items-center min-h-screen w-full bg-amber-50"
                   style={{ backgroundImage: "url('/images/wordblue.png')" }}>
                    <div className='flex flex-col '>
                      <h1 className='bg-[#58A0C8] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Consulter la liste de vos réclamations déposées et leurs états.</h1>
                      <h1 className='bg-[#113f67] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Déposer de Nouvelles reclamations.</h1>
                    </div>
                    <div className='flex gap-5'>
                  <button
                    onClick={()=>{
                      router.push("/Dashboard/Citoyen")
                    }}
                    className={`flex items-center justify-center gap-4 px-16 py-8 text-xl font-semibold rounded-lg bg-[#113F67] text-white hover:bg-[#58A0C8]-700 transition-colors duration-200 shadow-2xl min-w-80 h-24`}
                  >
                    <FiEye/>
                    Voir Toutes les Reclamations
                  </button>
            
                  <button
                    onClick={()=>{
                      router.push("/Dashboard/Citoyen")
                    }}
                    className={`flex items-center justify-center gap-4 px-16 py-8 text-xl font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 shadow-2xl min-w-80 h-24`}
                  >
                    <FaCheckCircle />
                    Valider Citoyens
                  </button>
                  </div>
                  <div className='flex gap-5'>
                  <button
                    onClick={()=>{
                      router.push("/Dashboard/Citoyen")
                    }}
                    className={`flex items-center justify-center gap-4 px-16 py-8 text-xl font-semibold rounded-lg bg-[#58A0C8] text-white hover:bg-[#58A0C8]-700 transition-colors duration-200 shadow-2xl min-w-80 h-24`}
                  >
                    <FiEye/>
                    List Agents
                  </button>
            
                  
                  </div>
                </div>
    </>
  )
}

export default page

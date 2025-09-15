"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logoutUser } from '@/app/utils/auth';
import { FiEye  } from 'react-icons/fi';
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from 'next/link';
const Page = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
    } catch (error) {
      // User not authenticated
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
    <div>
      {user && (
        <div className="bg-green-100 py-2 border-b flex justify-between items-center px-20">
          <Link href="/">
          <span className="hidden sm:inline text-xl font-bold font-josefin font-blue">Baladia</span>
        </Link>
          <span className="text-green-800">Rebonjour, {user.first_name}!</span>
          <div className="flex gap-4">
            <button 
              onClick={() => redirectToDashboard(user)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mon tableau de bord
            </button>
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Deconnecter
            </button>
          </div>
        </div>
      )}

       <div className="flex flex-col justify-center  gap-15 items-center min-h-screen w-full bg-amber-50"
       style={{ backgroundImage: "url('/images/wordblue.png')" }}>
        <div className='flex flex-col '>
          <h1 className='bg-[#58A0C8] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Consulter la liste des réclamations déposées par les citoyens.</h1>
          <h1 className='bg-[#113f67] text-amber-50 shadow-2xl px-5 py-2 font-bold text-3xl'>Visualiser les problèmes signalés directement sur la carte pour mieux intervenir.</h1>
        </div>
        <div className='flex gap-5'>
      <button
        onClick={()=>{
          router.push("/Dashboard/Agent")
        }}
        className={`flex items-center justify-center gap-4 px-16 py-8 text-xl font-semibold rounded-lg bg-[#113F67] text-white hover:bg-[#58A0C8]-700 transition-colors duration-200 shadow-2xl min-w-80 h-24`}
      >
        <FiEye/>
        Voir Mes Traveaux
      </button>

      <button
        onClick={()=>{
          router.push("/Dashboard/Agent")
        }}
        className={`flex items-center justify-center gap-4 px-16 py-8 text-xl font-semibold rounded-lg bg-[#58A0C8] text-white hover:bg-[#113F67]-700 transition-colors duration-200 shadow-2xl min-w-80 h-24`}
      >
        <FaMapMarkerAlt />
        Voir Map
      </button>
      </div>
    </div>
      
    </div>
  );
};

export default Page;

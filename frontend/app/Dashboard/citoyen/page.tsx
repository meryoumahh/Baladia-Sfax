"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logoutUser } from '../../utils/auth';
import FormReclamation from '@/components/Reclamtion/FormReclamation';
import Link from 'next/link';
import InfoBar from '@/components/MainPageCom/Section1/InfoBar';
interface User {
  first_name: string;
  email: string;
  role: string;
}

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifyCitoyenAccess();
  }, []);

  const verifyCitoyenAccess = async () => {
    try {
      const userDetails = await getUserInfo();
      if (!userDetails || userDetails.role !== 'citoyen') {
        router.push('/auth/signin');
        return;
      }
      setUser(userDetails);
    } catch (error) {
      router.push('/auth/signin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = async () => {
    await logoutUser();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Verifying access...</div>
      </div>
    );
  }

  return (
    <>
    <InfoBar/>
    <div className="flex flex-col min-h-screen w-full bg-blue1"
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
                   onClick={() => router.push('/LandingPage/Citoyen')}
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
      <FormReclamation/>
    </div></>
  );
}

export default page
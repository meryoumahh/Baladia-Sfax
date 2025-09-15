"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from './utils/auth';
import InfoBar from "@/components/MainPageCom/Section1/InfoBar";
import SectionOne from "@/components/MainPageCom/Section1/SectionOne";
import SectionTwo from "@/components/MainPageCom/Section2/SectionTwo";
import SectionThree from "@/components/MainPageCom/Section3/SectionThree";
import Image from "next/image";
import Footer from "@/components/MainPageCom/Section3/Footer";

export default function Home() {
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
      router.push('/LandingPage/Admin');
    } else if (user.role === 'agent') {
      router.push('/LandingPage/Agent');
    } else if (user.role === 'citoyen') {
      router.push('/LandingPage/Citoyen');
    }
  };

  return (
    <>
      {user && (
        <div className="bg-green-100 p-4 text-center border-b">
          <span className="text-green-800">Welcome back, {user.first_name}!</span>
          <button 
            onClick={() => redirectToDashboard(user)}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Dashboard
          </button>
        </div>
      )}
      <SectionOne/>
      <SectionTwo />
      <SectionThree/>
      <Footer/>
    </>
  );
}

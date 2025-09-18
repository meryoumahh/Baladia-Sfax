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
import InfoBar from '@/components/MainPageCom/Section1/InfoBar';
import Link from 'next/link';
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import RecList from '@/components/Reclamtion/ReclamationList';
import AdminReclamationList from '@/components/Reclamtion/AdminReclamationList';
import Agents from '@/components/Admindashboard/Agents';
import Citoyens from '@/components/Admindashboard/Citoyens';
import { registerServiceProvider } from '@/app/utils/auth';
const page = () => {
  const [user, setUser] = useState<any>(null);
  const [existing, setExisting] = useState(false)
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminActiveView') || 'citoyens';
    }
    return 'citoyens';
  });
  const [role, setRole] = useState("citoyen");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  
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
const handleServiceProviderSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      telephone,
      role,
      serviceCategory,
    };

    try {
      await registerServiceProvider(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.telephone,
        userData.role,
        userData.serviceCategory
      );
      alert("Service Provider registration works successfully!");
    } catch (e) {
      alert(
        "Failed to register service provider with info: \n" +
          userData.firstName + ", " +
          userData.lastName + ", " +
          userData.email + ", " +
          userData.password + ", " +
          userData.telephone + ", " +
          userData.role + ", " +
          userData.serviceCategory
      );
      console.error(e);
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
      {user && (
        <div className="w-full py-2 text-center shadow-sm flex justify-between items-center px-10 bg-blue1">
         <Link href="/">
            <span className="hidden sm:inline text-xl font-extrabold font-josefin font-blue">Baladia</span>
          </Link>
          
          <div className='flex justify-between gap-5'>
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
      
      <div className="flex min-h-screen w-full">
        {/* Left Sidebar */}
        <div
          className={`bg-[#58A0C8] text-white transition-all duration-300 min-h-full ${
            collapsed ? "w-16" : "w-56"
          }`}
        >
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-4 focus:outline-none hover:bg-[#3c92c1] w-full flex items-center"
          >
            <FaBars className="w-5 h-5" />
            {!collapsed && <span className="ml-2"></span>}
          </button>

          {/* Navigation items */}
          <nav className="mt-4">
            <ul>
              <li 
                onClick={() => {
                  setActiveView('citoyens');
                  localStorage.setItem('adminActiveView', 'citoyens');
                }}
                className={`flex items-center p-4 hover:bg-[#3c92c1] cursor-pointer ${
                  activeView === 'citoyens' ? 'bg-[#3c92c1]' : ''
                }`}
              >
                <FaHome className="w-5 h-5" />
                {!collapsed && <span className="ml-3">List Citoyens</span>}
              </li>
              <li 
                onClick={() => {
                  setActiveView('agents');
                  localStorage.setItem('adminActiveView', 'agents');
                }}
                className={`flex items-center p-4 hover:bg-[#3c92c1] cursor-pointer ${
                  activeView === 'agents' ? 'bg-[#3c92c1]' : ''
                }`}
              >
                <FaUser className="w-5 h-5" />
                {!collapsed && <span className="ml-3">List Agents</span>}
              </li>
              <li 
                onClick={() => {
                  setActiveView('reclamations');
                  localStorage.setItem('adminActiveView', 'reclamations');
                }}
                className={`flex items-center p-4 hover:bg-[#3c92c1] cursor-pointer ${
                  activeView === 'reclamations' ? 'bg-[#3c92c1]' : ''
                }`}
              >
                <FaCog className="w-5 h-5" />
                {!collapsed && <span className="ml-3">List Reclamations</span>}
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-15 items-center w-full bg-blue1 min-h-full p-4"
               style={{ backgroundImage: "url('/images/wordswhite.png')" }}>
            {activeView === 'citoyens' && (
              <div className="w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Liste des Citoyens</h2>
                <div className="bg-white rounded-lg p-4">
                  <Citoyens/>
                </div>
              </div>
            )}
            
            {activeView === 'agents' && (
              <div className="w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Liste des Agents</h2>
                <div className="bg-white rounded-lg p-4">
                  <Agents/>
                </div>
              </div>
            )}
            
            {activeView === 'reclamations' && (
              <div className="w-full">
                <AdminReclamationList/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default page

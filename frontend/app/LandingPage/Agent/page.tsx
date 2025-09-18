"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logoutUser, updateUserProfile } from '@/app/utils/auth';
import { FiUser } from 'react-icons/fi';
import { FaHome, FaUser as FaUserIcon, FaBars } from "react-icons/fa";
import InfoBar from '@/components/MainPageCom/Section1/InfoBar';
import Link from 'next/link';
import AgentReclamationList from '@/components/Reclamtion/AgentReclamationList';

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agentActiveView') || 'reclamations';
    }
    return 'reclamations';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ first_name: '', last_name: '', telephone: '' });
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
    if (typeof window !== 'undefined') {
      const activeView = localStorage.getItem('agentActiveView');
      if (activeView) {
        setActiveView(activeView);
      }
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUser(userInfo);
        setEditData({ 
          first_name: userInfo.first_name, 
          last_name: userInfo.last_name, 
          telephone: userInfo.telephone 
        });
      }
    } catch (error) {
      // User not authenticated
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
              Accueil
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
            {!collapsed && <span className="ml-2">Collapse</span>}
          </button>

          {/* Navigation items */}
          <nav className="mt-4">
            <ul>
              <li 
                onClick={() => {
                  setActiveView('reclamations');
                  localStorage.setItem('agentActiveView', 'reclamations');
                }}
                className={`flex items-center p-4 hover:bg-[#3c92c1] cursor-pointer ${
                  activeView === 'reclamations' ? 'bg-[#3c92c1]' : ''
                }`}
              >
                <FaHome className="w-5 h-5" />
                {!collapsed && <span className="ml-3">Mes Réclamations</span>}
              </li>
              <li 
                onClick={() => {
                  setActiveView('profile');
                  localStorage.setItem('agentActiveView', 'profile');
                }}
                className={`flex items-center p-4 hover:bg-[#3c92c1] cursor-pointer ${
                  activeView === 'profile' ? 'bg-[#3c92c1]' : ''
                }`}
              >
                <FaUserIcon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">Mon Profil</span>}
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-15 items-center w-full bg-blue1 min-h-full p-4"
               style={{ backgroundImage: "url('/images/wordswhite.png')" }}>
            
            {activeView === 'reclamations' && (
              <div className="w-full">
                <AgentReclamationList/>
              </div>
            )}
            
            {activeView === 'profile' && (
              <div className='w-9/10'>
                <div className='bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl overflow-hidden'>
                  {/* Header */}
                  <div className='bg-[#3c92c1] p-8 text-center relative'>
                    <div className='absolute top-4 right-4'>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition border border-white/30'
                      >
                        {isEditing ? '✕ Annuler' : '✎ Modifier'}
                      </button>
                    </div>
                    
                    <div className='w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/40'>
                      <FiUser className='text-white text-4xl' />
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2'>{user?.first_name} {user?.last_name}</h1>
                    <p className='text-white/80'>{user?.email}</p>
                    <div className='mt-4'>
                      <span className='bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold'>
                        🛠️ Agent Municipal
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className='p-8'>
                    <div className='grid md:grid-cols-2 gap-8'>
                      {/* Personal Info */}
                      <div className='space-y-6'>
                        <h3 className='text-xl font-semibold text-[#113f67] flex items-center gap-2'>
                          <FiUser className='text-lg' /> Informations Personnelles
                        </h3>
                        
                        <div className='space-y-4'>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                              <label className='text-sm font-medium text-gray-600 block mb-2'>Prénom</label>
                              {isEditing ? (
                                <input
                                  type='text'
                                  value={editData.first_name}
                                  onChange={(e) => setEditData({...editData, first_name: e.target.value})}
                                  className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113f67] focus:border-transparent'
                                />
                              ) : (
                                <p className='text-lg font-semibold text-[#113f67]'>{user?.first_name}</p>
                              )}
                            </div>
                            
                            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                              <label className='text-sm font-medium text-gray-600 block mb-2'>Nom</label>
                              {isEditing ? (
                                <input
                                  type='text'
                                  value={editData.last_name}
                                  onChange={(e) => setEditData({...editData, last_name: e.target.value})}
                                  className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113f67] focus:border-transparent'
                                />
                              ) : (
                                <p className='text-lg font-semibold text-[#113f67]'>{user?.last_name}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                            <label className='text-sm font-medium text-gray-600 block mb-2'>Email</label>
                            <p className='text-lg text-[#113f67] mb-1'>{user?.email}</p>
                            <p className='text-xs text-gray-500'>🔒 Non modifiable</p>
                          </div>
                          
                          <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                            <label className='text-sm font-medium text-gray-600 block mb-2'>Téléphone</label>
                            {isEditing ? (
                              <input
                                type='text'
                                value={editData.telephone}
                                onChange={(e) => setEditData({...editData, telephone: e.target.value})}
                                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#113f67] focus:border-transparent'
                              />
                            ) : (
                              <p className='text-lg text-[#113f67]'>{user?.telephone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Role Info */}
                      <div className='space-y-6'>
                        <h3 className='text-xl font-semibold text-[#113f67] flex items-center gap-2'>
                          🛠️ Informations Professionnelles
                        </h3>
                        
                        <div className='bg-blue-50 border-2 border-blue-200 p-6 rounded-xl'>
                          <div className='flex items-center gap-4 mb-4'>
                            <div className='w-12 h-12 rounded-full flex items-center justify-center bg-blue-500'>
                              <span className='text-white text-xl'>🛠️</span>
                            </div>
                            <div>
                              <h4 className='text-lg font-bold text-blue-800'>Agent Municipal</h4>
                              <p className='text-sm text-blue-600'>Gestion des réclamations citoyennes</p>
                            </div>
                          </div>
                          
                          <div className='bg-blue-100 border border-blue-300 rounded-lg p-4'>
                            <p className='text-sm text-blue-800'>
                              <strong>Responsabilités:</strong> Traitement et résolution des réclamations assignées par l'administration.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {isEditing && (
                      <div className='flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200'>
                        <button
                          onClick={async () => {
                            try {
                              const updatedUser = await updateUserProfile(editData);
                              setUser(updatedUser);
                              setIsEditing(false);
                              alert('✓ Profil mis à jour avec succès!');
                            } catch (error) {
                              alert('⚠️ Erreur lors de la mise à jour');
                            }
                          }}
                          className='bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-lg font-medium'
                        >
                          ✓ Sauvegarder
                        </button>
                        <button
                          onClick={() => {
                            setEditData({ 
                              first_name: user?.first_name, 
                              last_name: user?.last_name, 
                              telephone: user?.telephone 
                            });
                            setIsEditing(false);
                          }}
                          className='bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition shadow-lg font-medium'
                        >
                          ✕ Annuler
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

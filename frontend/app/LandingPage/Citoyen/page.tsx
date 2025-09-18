"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, updateUserProfile } from '@/app/utils/auth';
import { logoutUser } from '@/app/utils/auth';
import { FiUser } from 'react-icons/fi';
import { FiEye  } from 'react-icons/fi';
import { FaMapMarkerAlt } from "react-icons/fa";
import RecList from '@/components/Reclamtion/ReclamationList';
import { FaPen } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import InfoBar from '@/components/MainPageCom/Section1/InfoBar';
import Link from 'next/link';
import FormReclamation from '@/components/Reclamtion/FormReclamation';
import { getUserStats } from '@/app/utils/reclamationStats';
const page = () => {
  const [user, setUser] = useState<any>(null);
  const [existing, setExisting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showProfile, setShowProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('citoyenActiveView') === 'profile';
    }
    return false;
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ first_name: '', last_name: '', telephone: '' })
  const [stats, setStats] = useState({ resolu: 0, en_cours: 0, en_attente: 0 })
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
    // Restore view state from localStorage
    if (typeof window !== 'undefined') {
      const activeView = localStorage.getItem('citoyenActiveView');
      if (activeView === 'profile') {
        setShowProfile(true);
        setShowForm(false);
      } else if (activeView === 'form') {
        setShowForm(true);
        setShowProfile(false);
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
        setExisting(true);
        fetchStats();
      }
    } catch (error) {
      // User not authenticated, show landing page normally
    }
  };

  const fetchStats = async () => {
    try {
      const userStats = await getUserStats();
      console.log('Stats API Response:', userStats);
      setStats(userStats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Fallback to default values if API fails
      setStats({ resolu: 0, en_cours: 0, en_attente: 0 });
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
                    onClick={() => { 
                      setShowForm(false); 
                      setShowProfile(false); 
                      localStorage.setItem('citoyenActiveView', 'dashboard');
                    }}
                    className={`ml-4 px-3 py-1 rounded-xl transition ${!showForm && !showProfile ? 'bg-[#3c92c1] text-amber-50' : 'text-amber-50 hover:bg-[#58A0C8] active:bg-[#3c92c1]'}`}
                  >
                    Mon tableau de bord
                  </button>
                  <button 
                    onClick={() => { 
                      setShowForm(true); 
                      setShowProfile(false); 
                      localStorage.setItem('citoyenActiveView', 'form');
                    }}
                    className={`px-3 py-1 rounded-xl transition ${showForm ? 'bg-[#3c92c1] text-amber-50' : 'text-amber-50 hover:bg-[#58A0C8] active:bg-[#3c92c1]'}`}
                  >
                    Ajouter Reclamation
                  </button>
                  <button
                      onClick={() => { 
                        setShowProfile(true); 
                        setShowForm(false); 
                        localStorage.setItem('citoyenActiveView', 'profile');
                      }}
                      className={`px-3 py-1 rounded-xl transition ${showProfile ? 'bg-[#3c92c1] text-amber-50' : 'text-amber-50 hover:bg-[#58A0C8] active:bg-[#3c92c1]'}`}
                    >
                      Profile
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
              {!showForm && !showProfile && (
              <div className='flex flex-col w-9/10 justify-center items-center align-middle bg-amber-50 rounded-xl p-5 '>
                <div className='flex justify-between p-20'>
                  <div className='flex flex-col g-10 text-start px-30'>
                  <h1 className='text-3xl font-extrabold text-[#113f67]'>Tableau de bord : </h1>
                  <h2 className='text-xl font-medium text-[#113f67]'>Suivez vos réclamations et signalements d’infrastructures.</h2>
                  </div> 
                  <button 
                   onClick={() => {
                     setShowForm(true);
                     localStorage.setItem('citoyenActiveView', 'form');
                   }}
                  className='flex justify-center items-center gap-2 text-amber-50 bg-[#113f67] rounded-xl px-5 mx-25 h-10 shadow-xl active:bg-[#3c92c1] transition'>
                    <FaPlus size={15}/> Ajouter Reclamation
                  </button>

                </div>
                  
                <div className='flex gap-4 w-full justify-center items-center'>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>Résolu</h1>
                  <span className='text-2xl font-medium text-green-500'>{stats.resolu}</span></div>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>En cours</h1>
                  <span className='text-2xl font-medium text-amber-700'>{stats.en_cours}</span></div>
                  <div className='w-1/4 bg-amber-50  border-1 border-gray-100 shadow-xl py-3 px-9 text-start rounded-2xl'>
                  <h1 className='text-s font-meduim text-[#113f67]'>En attente</h1>
                  <span className='text-2xl font-medium text-red-500'>{stats.en_attente}</span></div>
                </div>
              </div>
              )}




              {showProfile && (
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
                        
                        {/* Account Status */}
                        <div className='space-y-6'>
                          <h3 className='text-xl font-semibold text-[#113f67] flex items-center gap-2'>
                            🛡️ Statut du Compte
                          </h3>
                          
                          <div className={`p-6 rounded-xl border-2 ${
                            user?.citoyen_profile?.isValid 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-amber-50 border-amber-200'
                          }`}>
                            <div className='flex items-center gap-4 mb-4'>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                user?.citoyen_profile?.isValid 
                                  ? 'bg-green-500' 
                                  : 'bg-amber-500'
                              }`}>
                                <span className='text-white text-xl'>
                                  {user?.citoyen_profile?.isValid ? '✓' : '⏳'}
                                </span>
                              </div>
                              <div>
                                <h4 className={`text-lg font-bold ${
                                  user?.citoyen_profile?.isValid 
                                    ? 'text-green-800' 
                                    : 'text-amber-800'
                                }`}>
                                  {user?.citoyen_profile?.isValid ? 'Compte Validé' : 'En Attente'}
                                </h4>
                                <p className={`text-sm ${
                                  user?.citoyen_profile?.isValid 
                                    ? 'text-green-600' 
                                    : 'text-amber-600'
                                }`}>
                                  {user?.citoyen_profile?.isValid 
                                    ? 'Accès complet aux services' 
                                    : 'Vérification en cours'}
                                </p>
                              </div>
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

              {showForm && (
                <FormReclamation onBack={() => { setShowForm(false); fetchStats(); }} />
              )}
              
              {!showForm && !showProfile && (
                <div className='flex flex-col bg-amber-50 shadow-2xl w-9/10 p-10 rounded-xl'>
                  <RecList/>
                </div>
              )}
          </div>
    </>
  )
}

export default page

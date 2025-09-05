"use client";
import React, { useState } from 'react'
import MainButton from '@/components/mainButton'
import { FiArrowRight } from "react-icons/fi";
import Image from 'next/image';
import Link from 'next/link';
import { useNavigate } from "react-router-dom";


import { loginUser , getUserInfo } from "../../utils/auth";

const page = () => {
  /*const navigate = useNavigate();*/
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (email === "" || password === "") {
    alert("Email and password are required");
    return;
  }

  console.log({ email, password });

  try {
    await loginUser(email, password);
    alert("Login successful");
    
  } catch (e) {
    alert("Login failed hehe");
    console.error(e);
  }
};


  return (
    <main className='min-h-screen flex items-center justify-center p-4 '>
      <div className='grid grid-cols-1 lg:grid-cols-2  max-w-4xl w-full border-2 border-blue-500 rounded-4xl shadow-xl/20'>
        
        {/* Header - 1st col, 1st row */}
        <div className='flex flex-col items-center p-4  rounded-tl-3xl'>
          <div className='flex flex-col items-center'>
            <Image 
              src="/images/logo.png"
              width={80}
              height={80}
              alt="logo" 
              className="mb-2"
            />
            <h2 className='text-xl text-center'>Explorez, réservez, vivez.</h2>
          </div>
        </div>
        
        {/* Slogan - 2nd col, 2nd row */}
        <div className='bg-blue-500 rounded-tr-3xl p-4 flex flex-col justify-center items-center'>
          <div className="  text-center ">
            <div className="flex flex-col justify-end">
                    <h2 className="text-3xl bg-slate-300 text-blue-500 text-center w-fit  px-1">Decouvrir La Tunisie</h2>
                    <div className="flex ">
                    <div className="bg-slate-300 w-7 h-7"></div>
                    <h2 className="text-[21px] text-slate-300 text-center">Votre Petit Coin De Paradis</h2>
                </div>
            </div>
          </div>
        </div>
        
        {/* Form - 1st col, 2nd+3rd row */}
        <div className='flex flex-col p-4  rounded-bl-3xl'>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <label className="text-blue-500 font-semibold text-start">Nom d'utilisateur:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="nom d'utilisateur"
              className="border border-blue-500 p-2 rounded-3xl"
              required
            />

            <label className="font-semibold text-blue-500 text-start">Mot de Passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de Passe"
              className="border border-blue-500 p-2 rounded-3xl"
              required
            />
            
            <div className='flex justify-end'>
              <Link href={"/"} className='text-blue-500 font-bold text-sm'>
                Mot de Passe oubliée?
              </Link>
            </div>
            <Link href ={"/"}>
            <div onClick={handleSubmit}
              
             
              className="bg-blue-500 text-slate-300 py-2 rounded-3xl font-bold hover:bg-blue-600 transition"
            >
              Se connecter
            </div>
            </Link>
            <div className='flex justify-end gap-2 text-sm'>
              <span className="text-blue-500">Vous n'avez pas un compte?</span>
              <Link href="/auth/ParentRegister" className='font-bold text-blue-500'>Créer un!</Link>
            </div>
          </form>
        </div>
        
        {/* Touch/Image - 2nd col, 3rd row */}
        <div className='bg-blue-500 rounded-br-3xl p-4'>
          <div className="relative w-full h-40">
            <Image
              src="/images/white.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
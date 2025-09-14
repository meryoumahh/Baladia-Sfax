"use client";
import React, { useState,useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { loginUser , getUserInfo } from "../../utils/auth";

const page = () => {
  const [email, setemail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [user, setUser] = useState<any>("")
  const router = useRouter();

  useEffect(() => {
    const getUser  = async () => {
      const userDetails = await getUserInfo()
      if (userDetails){
        setUser(userDetails)
      }
    }
    getUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Email and password are required");
      return;
    }

    try {
      await loginUser(email, password);
      const userDetails = await getUserInfo();
      if(userDetails) {
        setUser(userDetails);
      }

      if(userDetails.is_staff){
        router.push("../../Dashboard/Admin")
      } else if(userDetails.role ==='agent'){
        router.push("../../Dashboard/Agent")
      } else if(userDetails.role ==='citoyen'){
        router.push("../../Dashboard/citoyen")
      }
    } catch (e) {
      alert("Login failed");
      console.error(e);
    }
  };

  return (
    <main className="bg-contain bg-center  h-screen bg-amber-50 flex flex-col justify-center items-center "
      style={{ backgroundImage: "url('/images/wordblue.png')" }}>
        <div className='flex justify-center items-center gap-1'>
          <div className='flex flex-col gap-1 w-full '>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full bg-amber-50 p-20 rounded-tl-3xl rounded-bl-3xl shadow-2xl">
              <label className="text-[#113F67] font-semibold text-start">Nom d'utilisateur:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="nom d'utilisateur"
                className="w-full border border-[#113F67] p-2 rounded-3xl"
                required
              />

              <label className="font-semibold text-[#113F67] text-start">Mot de Passe:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de Passe"
                className="w-full border border-[#113F67] p-2 rounded-3xl"
                required
              />

              <div className='flex justify-end'>
                <Link href={"/"} className='text-[#113F67] font-bold text-sm'>
                  Mot de Passe oubliée?
                </Link>
              </div>

              {/* Fix: Use button instead of div */}
              <button
                type="submit"
                className="bg-[#113F67] text-slate-300 py-2 rounded-3xl font-bold hover:bg-[#58A0C8] transition"
              >
                Se connecter
              </button>

              <div className='flex justify-end gap-2 text-sm'>
                <span className="text-[#113F67]">Vous n'avez pas un compte?</span>
                <Link href="/auth/ParentRegister" className='font-bold text-[#113F67]'>Créer un!</Link>
              </div>
            </form>
          </div>

          <div className='flex flex-col  bg-[#113f67] justify-center items-start w-full h-full px-10 rounded-br-3xl rounded-tr-3xl shadow-2xs'
            style={{ backgroundImage: "url('/images/wordswhite.png')" }}>
            <div className='bg-amber-50 text-4xl text-[#58A0C8] font-bold px-5 p-3'>Votre Voix, </div>
            <div className='bg-[#58A0C8] text-3xl text-amber-50 font-bold px-3 py-3'> Notre Action.</div>
          </div>
        </div>
    </main>
  )
}

export default page

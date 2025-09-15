import React from 'react'
import MainButton from '../../MainButton'
import SecondButton from '../../SecondButton'
import Link from 'next/link'
import NavBar from './NavBar'
import SpecialButtons from './SpecialButtons'
import InfoBar from './InfoBar'

interface SectionOneProps {
  user?: any;
  redirectToDashboard?: (user: any) => void;
}

const SectionOne = ({ user, redirectToDashboard }: SectionOneProps) => {
  return (
    <>
    <InfoBar />
    <div
  className="bg-contain bg-center  h-screen bg-blue1 flex flex-col gap-2 sm:gap-5" // full viewport height
  style={{ backgroundImage: "url('/images/wordsWhite.png')" }}
>
  
  <NavBar user={user} />
  <div className="flex justify-center items-center  mt-auto sm:mt-auto ">
    <div className='bg-amber-50 w-5xl  rounded-t-4xl pt-20 px-20 flex flex-col justify-center gap-4 sm:gap-8 mt-5 sm:mt-10 mx-20'>
        <div className='flex flex-col  sm:flex-row justify-items-start pb-4 sm:pb-5' >
            <h1 className='font-inter font-blue text-3xl sm:text-4xl font-extrabold '>Votre Voix, </h1>
            <h1 className='font-inter font-neutral-900 text-3xl sm:text-4xl font-extrabold '> Notre Action.</h1>
        </div>
            <h3 className='text-center sm:text-left  pb-10 sm:pb-20 font-inter text-s sm:text-xl'>Soumettez vos demandes de services municipaux 
                pour les réparations routières et les services quotidiens.
                Suivez l’avancement en temps réel et recevez 
                des mises à jour de nos agents dédiés.
            </h3>
         <div className='flex gap-1 justify-center items-center pb-10 sm:pb-20'>
            {user ? (
              <SpecialButtons 
                variant="main" 
                href="#" 
                onClick={() => redirectToDashboard && redirectToDashboard(user)}
              >
                Voir Tableau de Bord
              </SpecialButtons>
            ) : (
              <SpecialButtons variant="main" href="/auth/signin">
                Se Connecter
              </SpecialButtons>
            )}
            <SpecialButtons variant="sec" href="/register">
                Reclamer
            </SpecialButtons>
        </div>
    </div>  
</div>
</div>
</>
  )
}

export default SectionOne
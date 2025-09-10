import React from 'react'
import SpecialButtons from '../Section1/SpecialButtons'
import Footer from './Footer'
const SectionThree = () => {
  return (
    <div className="bg-contain bg-center  h-fit bg-blue1 flex flex-col gap-2 sm:gap-5 text-start items-start p-20" // full viewport height
  style={{ backgroundImage: "url('/images/wordsWhite.png')" }}
>       
    <p className='font-blue text-5xl font-bold text-start '>Prêt(e) à Soumettre Votre Demande ?</p>
    <p className='text-amber-50 text-3xl font-bold text-start'>Rejoignez des milliers de citoyens qui font confiance à notre plateforme
        pour les services municipaux. Votre demande compte pour nous.</p>


    <div className='flex gap-1 justify-center items-center pb-10 sm:pb-20 w-full mt-10'>
            <SpecialButtons variant="main" href="/connecter">
                Se Connecter
            </SpecialButtons>
            <SpecialButtons variant="sec" href="/connecter">
                Reclamer
            </SpecialButtons>
            
        </div>
    
</div>
  )
}

export default SectionThree
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-neutral-900 flex justify-around w-full p-20'>

        <div className='flex flex-col gap-3'>
        <h3 className="font-bold text-lg  text-amber-50 font-inter">Liens Rapides</h3>
        <p className='font-inter text-amber-50 text-2s'>Accueil</p>
        <p className='font-inter text-amber-50 text-2s'>Reclamer</p>
        <p className='font-inter text-amber-50 text-2s'>A Propos</p>
        </div>

        <div className='flex flex-col gap-3'>
        <h3 className="font-bold text-lg text-amber-50 font-inter">Liens Rapides</h3>
        <p className='font-inter text-amber-50 text-2s'>Accueil</p>
        <p className='font-inter text-amber-50 text-2s'>Reclamer</p>
        <p className='font-inter text-amber-50 text-2s'>A Propos</p>
        </div>


        <div className='flex flex-col gap-3'>
        <h3 className="font-bold text-lg text-amber-50 font-inter">Liens Rapides</h3>
        <p className='font-inter text-amber-50 text-2s'>Accueil</p>
        <p className='font-inter text-amber-50 text-2s'>Reclamer</p>
        <p className='font-inter text-amber-50 text-2s'>A Propos</p>
        </div>    </div>
  )
}

export default Footer
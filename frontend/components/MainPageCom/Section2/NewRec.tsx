import React from 'react'
import Link from 'next/link'
interface CardProps {
  type: string
  description: string
  localisation: string
  etat: string
  update: string
  href: string 
  
}
const NewRec : React.FC<CardProps> = (
    {
        type,
        description,
        localisation,
        etat,
        update,
        href,
    }
) => {
  return (
    <div className='flex flex-col items-center p-6 m-2 bg-blue2 rounded-xl '>
        <div className='flex justify-between items-baseline w-full my-2'>
            <h3 className='text-amber-50 font-inter text-xl font-bold'>{type}</h3>
            <span className='bg-emerald-500 p-2 m-2 text-xs font-inter rounded-full text-amber-50 '>{etat}</span>
        </div>
        <div className='flex flex-col text-left my-2'>
            <p className='text-s font-inter'>{description}</p>
            <p className='text-s font-inter'>Localisaion : {localisation}</p>
            <p className='text-s font-inter'>Dernière mise à jour : {update}</p>
        </div>
        <Link className='bg-amber-50 p-2 m-2 text-s font-inter font-light rounded-full mt-5' href={href} >Details</Link>
    </div>
  )
}

export default NewRec
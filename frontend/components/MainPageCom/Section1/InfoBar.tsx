import React from 'react'

const InfoBar = () => {
  return (
    <div className='bg-neutral-900 flex justify-between flex-wrap p-3'>
        <div className='flex justify-between gap-8'>
            <p className='text-amber-50 font-gulzar'>Urgence : +216 999-0000</p>
            <p className='text-blue-500 font-gulzar'>support@cityservices.gov</p>
        </div>
        <p className='text-amber-50 font-gulzar'>Lundi - Vendredi : 8h00 - 18h00</p>
    </div>
  )
}

export default InfoBar
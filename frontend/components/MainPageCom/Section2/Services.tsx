import React from 'react'

interface CardProps {
  title: string
  description: string
  
}
const Services : React.FC<CardProps> = (
    {
        title,
        description,
    }
) => {
  return (
    <div className='flex flex-col justify-center items-center max-w-2xs gap-2 bg-blue2 p-10 rounded-2xl'>
        <h3 className='text-neutral-900 font-inter font-bold text-s sm:text-xl'>{title}</h3>
        <p className="text-amber-50 font-inter font-light text-xs sm:text-xl">{description}</p>
    </div>
  )
}

export default Services
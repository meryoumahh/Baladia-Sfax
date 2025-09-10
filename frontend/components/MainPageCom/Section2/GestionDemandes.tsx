import React from 'react'
interface CardProps {
  title: string
  description: string
  Icon: React.ElementType // The icon component from react-icons
  iconBg?: string // optional background color for the icon container
  iconColor?: string // optional color for the icon
}

const GestionDemandes: React.FC<CardProps> = ({
  title,
  description,
  Icon,
  
}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center max-w-sm gap-4 m-5'>
      <div className={'flex justify-center items-center w-16 h-16 rounded-full bg-blue2'}>
        <Icon className={'text-xl sm:text-3xl text-amber-50'} />
      </div>
      <div className='flex flex-col gap-2 text-center'>
        <h3 className='font-inter text-lg sm:text-xl font-semibold font-blue'>
          {title}
        </h3>
        <p className='font-inter text-xs sm:text-sm font-semibold text-neutral-900'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default GestionDemandes
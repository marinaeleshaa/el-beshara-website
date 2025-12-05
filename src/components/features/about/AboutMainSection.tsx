import React from 'react'
import AboutMainLeft from './AboutMainLeft'
import AboutMainRight from './AboutMainRight'
import Image from 'next/image'

const AboutMainSection = () => {
  return (
    <div className='flex flex-col md:flex-row md:gap-x-10  justify-evenly items-center '>
        <AboutMainLeft className='w-full md:w-1/3 '/>
        <AboutMainRight className='w-full md:w-2/3'/>
    </div>
  )
}

export default AboutMainSection
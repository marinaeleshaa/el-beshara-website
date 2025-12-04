import Image from 'next/image'
import React from 'react'

const WhyChooseUsBottom = ({className}:{className:string}) => {
  return (
    <div className={`${className}  rounded-lg`}>
        <div className='w-full h-full'>

        <Image src="/home/hero.jpg" alt="about" width={900} height={900} className="object-cover rounded-lg w-full h-full "/>
        </div>
    </div>
  )
}

export default WhyChooseUsBottom
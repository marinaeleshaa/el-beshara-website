import Image from 'next/image'
import React from 'react'

const WhyChooseUsLeft = ({className}:{className:string}) => {
  return (
   <div className={`${className}  rounded-lg`}>
        <div className='h-full'>
            <Image src="/home/about1.jpg" alt="about" width={900} height={900} className="object-cover rounded-lg w-full h-full "/>
        </div>
    </div>
  )
}

export default WhyChooseUsLeft
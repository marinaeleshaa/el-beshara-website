import React from 'react'
import GalleryHomeLeft from './StudioHomeLeft'
import GalleryHomeRight from './StudioHomeRight'

const GalleryHomeLayout = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-x-20 lg:gap-x-30 gap-5 justify-center items-center ">
        <GalleryHomeRight className="w-full md:w-1/2" />
        <GalleryHomeLeft className="w-[80%] mx-auto md:w-1/2" />
    </div>
  )
}

export default GalleryHomeLayout
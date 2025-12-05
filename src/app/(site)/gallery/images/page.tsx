import Masonry from '@/components/Masonry'
import { images } from '@/data/images'
import React from 'react'

const page = () => {

  return (
    <div className='min-h-screen'>
      <Masonry items={images} mediaType='image'/>
    </div>
  )
}

export default page
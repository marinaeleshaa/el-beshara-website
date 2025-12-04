import ContactLayout from '@/components/features/contact/ContactLayout'
import PageHero from '@/components/shared/PageHero'
import React from 'react'

const page = () => {
  return (
    <div className='space-y-10'>
      <PageHero/>
      <ContactLayout/>
    </div>
  )
}

export default page
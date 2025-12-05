import ContactLayout from '@/components/features/contact/ContactLayout'
import PageHero from '@/components/shared/PageHero'
import React from 'react'

export const metadata = {
  title: 'Contact | El-Beshara Studio',
  description: 'Creating amazing musical experiences for the world.',
}
const page = () => {
  return (
    <div className='space-y-10'>
      <PageHero/>
      <ContactLayout/>
    </div>
  )
}

export default page
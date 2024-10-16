import Footer from '@/components/Footer'
import ServicesPage from '@/components/Services'
import Page from '@/components/ZenithHero'
import React from 'react'

const page = () => {
  return (
      <div>
          <Page />
          <ServicesPage />
          <Footer />
    </div>
  )
}

export default page
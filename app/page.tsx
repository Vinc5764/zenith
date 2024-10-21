import React from 'react'
import ZenithHero from '@/components/ZenithHero'


// import Pricing from '@/components/Pricing'

// import Agent from '@/components/Agent'

import Footer from '@/components/Footer'

import ServicesPage from '@/components/Services'
// import WorkflowSection from '@/components/Workflow'

  
const page = () => {
  return (
    <div>
      <ZenithHero/>
      <ServicesPage />
      <Footer/>
    </div>
  )
}

export default page
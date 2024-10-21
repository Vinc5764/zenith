import React from 'react'
import ZenithHero from '@/components/ZenithHero'
import ServiceSection from '@/components/ServiceSection'
import Component from '@/components/Corporate'
// import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
// import Agent from '@/components/Agent'
import News from '@/components/News'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
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
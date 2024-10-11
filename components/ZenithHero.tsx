'use client'
import Link from 'next/link'
import { Play, Menu } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import image from '../public/jason.jpg'

 const  Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-[#001f3f] text-white" >
      {/* Top bar */}
      <div className="bg-[#001428] py-2 px-4 text-xs flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <span>Help</span>
          <span>Support</span>
          <span>Contact</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
          <span>Hours: Mon-Fri: 8am - 7pm</span>
          <span>Phone: (+1) 222 3334445</span>
          <span>Mail: hello@zenithcapital.ca</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4" >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#c9a55a] rounded-full"></div>
            <span className="text-2xl font-bold">Zenith</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-[#c9a55a]">Home</Link>
            <Link href="/about" className="hover:text-[#c9a55a]">About</Link>
            <Link href="/service" className="hover:text-[#c9a55a]">Service</Link>
            <Link href="/portfolio" className="hover:text-[#c9a55a]">Portfolio</Link>
            <Link href="/news" className="hover:text-[#c9a55a]">News</Link>
            <Link href="/pages" className="hover:text-[#c9a55a]">Pages</Link>
            <Link href="/contact" className="hover:text-[#c9a55a]">Contact</Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/sign-in" className="hover:text-[#c9a55a]">Sign In</Link>
            <button className="bg-[#c9a55a] text-[#001f3f] px-4 py-2 rounded">Reserved Our Services</button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-white" size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link href="/" className="block py-2 hover:text-[#c9a55a]">Home</Link>
            <Link href="/about" className="block py-2 hover:text-[#c9a55a]">About</Link>
            <Link href="/service" className="block py-2 hover:text-[#c9a55a]">Service</Link>
            <Link href="/portfolio" className="block py-2 hover:text-[#c9a55a]">Portfolio</Link>
            <Link href="/news" className="block py-2 hover:text-[#c9a55a]">News</Link>
            <Link href="/pages" className="block py-2 hover:text-[#c9a55a]">Pages</Link>
            <Link href="/contact" className="block py-2 hover:text-[#c9a55a]">Contact</Link>
            <Link href="/sign-in" className="block py-2 hover:text-[#c9a55a]">Sign In</Link>
            <button className="bg-[#c9a55a] text-[#001f3f] px-4 py-2 rounded mt-2 w-full">Reserved Our Services</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('../public/jason.jpg')] md:h-[500px] bg-cover bg-center" >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10"data-aos='fade-up'>
          <p className="text-[#c9a55a] mb-2 text-sm md:text-base">EMPOWERING YOUR INVESTMENT & FINANCIAL FUTURE</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Navigating Prosperity,<br />Securing Tomorrow.</h1>
          <button className="bg-[#c9a55a] text-[#001f3f] px-6 py-3 rounded w-fit">Book free consultation</button>
        </div>
        <button className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white bg-opacity-20 rounded-full p-3 md:p-4"data-aos='fade-up'>
          <Play className="text-white" size={20} />
        </button>
      </div>

      {/* Event Section */}
      <div className="container mx-auto py-8 px-4"data-aos='fade-up'>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            <p className="text-[#c9a55a] mb-2 text-sm">22 OCTOBER 2023, 08:00 PM EDT</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Smart investing strategies: building wealth for the future</h2>
            <button className="bg-white text-[#001f3f] px-6 py-3 rounded">Register yourself now</button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Image height={200} width={200} src={image} alt="Investment seminar" className="w-full h-48 md:h-64 object-cover rounded" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-3 md:p-4">
              <Play className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Page
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Menu, Home, Info, Briefcase, Image as ImageIcon, Newspaper, Book, Phone, LogIn, Calendar, UserPlus } from 'lucide-react'

import logoImage from '@/public/kan-Photoroom.png'
import heroImage from '@/public/logoface.jpg'
import eventImage from '@/public/logo.jpg'

const NavItem = ({ href, icon: Icon, label }) => (
  <Link href={href} className="flex items-center space-x-2 hover:text-[#c9a55a]">
    <Icon size={20} />
    <span className="sr-only md:not-sr-only">{label}</span>
  </Link>
)

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/service", icon: Briefcase, label: "Service" },
    { href: "/portfolio", icon: ImageIcon, label: "Portfolio" },
    { href: "/news", icon: Newspaper, label: "News" },
    { href: "/pages", icon: Book, label: "Pages" },
    { href: "/contact", icon: Phone, label: "Contact" },
  ]

  return (
    <div className="bg-[#001f3f] text-white min-h-screen">
      <nav className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <Image src={logoImage} alt="Logo" className="w-20" />
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <NavItem href="/sign-in" icon={LogIn} label="Sign In" />
            <button className="bg-[#c9a55a] text-[#001f3f] px-4 py-2 rounded flex items-center space-x-2">
              <Briefcase size={20} />
              <span>Reserve</span>
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-white" size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
            <NavItem href="/sign-in" icon={LogIn} label="Sign In" />
            <button className="bg-[#c9a55a] text-[#001f3f] px-4 py-2 rounded w-full flex items-center justify-center space-x-2">
              <Briefcase size={20} />
              <span>Reserve</span>
            </button>
          </div>
        )}
      </nav>

      <div className="relative h-[500px]">
        <Image src={heroImage} alt="Hero" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center space-y-4" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold">Navigating Prosperity</h1>
            <button className="bg-[#c9a55a] text-[#001f3f] px-6 py-3 rounded flex items-center space-x-2 mx-auto">
              <Phone size={20} />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
        <button className="absolute bottom-8 right-8 bg-white bg-opacity-20 rounded-full p-4" data-aos="fade-up">
          <Play className="text-white" size={24} />
        </button>
      </div>

      <div className="container mx-auto py-8 px-4" data-aos="fade-up">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2 text-[#c9a55a]">
              <Calendar size={20} />
              <span>22 OCTOBER 2023, 08:00 PM EDT</span>
            </div>
            <h2 className="text-3xl font-bold">Smart Investing Strategies</h2>
            <button className="bg-white text-[#001f3f] px-6 py-3 rounded flex items-center space-x-2">
              <UserPlus size={20} />
              <span>Register Now</span>
            </button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Image src={eventImage} alt="Investment seminar" width={500} height={300} className="rounded" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-4">
              <Play className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
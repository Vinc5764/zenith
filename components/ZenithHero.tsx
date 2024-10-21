'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Menu, Home, Briefcase, LogIn } from 'lucide-react'

import heroImage from '@/public/logoface.jpg'

const NavItem = ({ href, icon: Icon, label }) => (
  <Link href={href} className="flex items-center space-x-2 hover:text-[#c9a55a] transition-colors duration-300">
    <span className="max-md:hidden"><Icon size={20} /></span>
    <span>{label}</span>
  </Link>
)

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/service", icon: Briefcase, label: "Service" },
  ]

  return (
    <div className="text-white min-h-screen">
      <nav className="container bg-[#285481] mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">KAN</h1>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <NavItem href="/sign-in" icon={LogIn} label="Sign In" />
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="text-white" size={24} />
          </button>
        </div>

        {/* Mobile Menu with Tailwind Animations */}
        <div
          className={`mt-4 md:hidden transition-all duration-500 ease-in-out transform ${
            isMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
          <NavItem href="/sign-in" icon={LogIn} label="Sign In" />
        </div>
      </nav>

      <div className="relative h-[500px]">
        <Image src={heroImage} alt="Hero" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center space-y-4" data-aos="fade-up">
          </div>
        </div>
        <button
          className="absolute bottom-8 right-8 bg-white bg-opacity-20 rounded-full p-4"
          data-aos="fade-up"
        >
          <Play className="text-white" size={24} />
        </button>
      </div>
    </div>
  )
}

export default Page

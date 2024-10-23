import { Calendar, Play, UserPlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import eventImage from '@/public/logo.jpg'
const Header = () => {
  return (
    <div>
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

export default Header

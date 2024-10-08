"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Twitter, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <footer className="bg-[#0a2d4d] text-white py-12"data-aos='fade-up'>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className={`space-y-4 ${animate ? 'animate-fade-right' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Zenith
            </h2>
            <p className="text-sm">
              Sed ut perspiciatis unde omnis iste natus errors voluptatem accusantium doloremque laudantium.
            </p>
            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <Twitter className="w-6 h-6" />
                <Youtube className="w-6 h-6" />
                <Linkedin className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className={`space-y-2 ${animate ? 'animate-fade-right' : 'opacity-0'} animation-delay-200`}>
            <h3 className="font-semibold text-lg mb-4">Quicklinks</h3>
            {["Investment", "Careers", "FAQS", "Resources", "Shareholder", "Agencies"].map((item, index) => (
              <p key={index} className="text-sm">{item}</p>
            ))}
          </div>

          <div className={`space-y-2 ${animate ? 'animate-fade-left' : 'opacity-0'} animation-delay-200`}>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            {["About Company", "Services", "Portfolio", "Case Study", "News"].map((item, index) => (
              <p key={index} className="text-sm">{item}</p>
            ))}
          </div>

          <div className={`space-y-2 ${animate ? 'animate-fade-left' : 'opacity-0'} animation-delay-400`}>
            <h3 className="font-semibold text-lg mb-4">Customer</h3>
            {["Customer Help", "Investment", "Return Policy", "Insurance"].map((item, index) => (
              <p key={index} className="text-sm">{item}</p>
            ))}
          </div>

          <div className={`space-y-4 ${animate ? 'animate-fade-left' : 'opacity-0'} animation-delay-600`}>
            <h3 className="font-semibold text-lg">Newsletter</h3>
            <p className="text-sm">Sed ut perspiciatis unde omniste natus errors volupta accus</p>
            <div className="space-y-2">
              <Input type="email" placeholder="Add email" className="bg-white text-black" />
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>Copyright 2024 by eightheme</p>
        </div>
      </div>
    </footer>
  )
}
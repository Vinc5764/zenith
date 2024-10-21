"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import logoImage from '@/public/kan-Photoroom.png'

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Youtube, href: "https://youtube.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
]

const quickLinks = [
  { icon: MapPin, text: "Investment" },
  { icon: Mail, text: "Careers" },
  { icon: Phone, text: "Contact" },
]

export default function Footer() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <footer className="bg-[#0a2d4d] mt-5 text-white py-12" data-aos='fade-up'>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`space-y-6 ${animate ? 'animate-fade-right' : 'opacity-0'}`}>
            <Image src={logoImage} alt="Logo" width={150} height={50} />
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className={`space-y-4 ${animate ? 'animate-fade-up' : 'opacity-0'} animation-delay-200`}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            {quickLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <link.icon className="w-5 h-5 text-amber-600" />
                <span className="text-sm">{link.text}</span>
              </div>
            ))}
          </div>

          <div className={`space-y-4 ${animate ? 'animate-fade-left' : 'opacity-0'} animation-delay-400`}>
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <div className="flex">
              <Input type="email" placeholder="Your email" className="bg-white text-black rounded-r-none" />
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-l-none">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 KAN Assets Management. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
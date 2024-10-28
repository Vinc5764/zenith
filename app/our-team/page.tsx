import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HamburgerMenu from "@/components/HamburgerMenu"
import teamMember1 from '@/public/profile.jpg'
import teamMember2 from '@/public/profile1.jpg'
import teamMember3 from '@/public/profile2.jpg'


import logo from '@/public/kan-logo-2-removebg-preview.png'

const teamMembers = [
  { name: "Nana Anim Nuamah", role: "CEO & Founder", profilePic: teamMember2, url: "https://www.instagram.com/mrkitchengh?igshid=dnIxMHljcXVqbDdp" },
    // Add more team members as needed
    { name: "Emily Anim Nuamah", role: "HR Manager", profilePic: teamMember1, url: "https://www.instagram.com/mrkitchengh?igshid=dnIxMHljcXVqbDdp" },
{ name: "Enam Cudjoe", role: "Software Developer", profilePic: teamMember3, url: "https://www.instagram.com/mrkitchengh?igshid=dnIxMHljcXVqbDdp" },
{ name: "Simon Adjei", role: "Software Developer", profilePic: teamMember3, url: "https://www.instagram.com/mrkitchengh?igshid=dnIxMHljcXVqbDdp" },

]

const navLinks = [
  { href: "/management", label: "Management Consulting" },
  { href: "/accounting", label: "Accounting Tax & Audit" },
  { href: "/compliance", label: "Compliance" },
    { href: "/portfolio", label: "Portfolio Management" },
   { href: "/our-team", label: "Our Team" },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 bg-white shadow-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={100} height={48} />
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[#0033A1] hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href={`/sign-in`}>
            <Button variant="outline" className="text-[#0033A1] border-[#0033A1] hover:bg-[#0033A1] hover:text-white">Login</Button>
          </Link>
          <HamburgerMenu links={navLinks} />
        </div>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#0033A1]">Meet Our Team</h1>
          {/* <p className="text-xl mb-8 text-gray-600">Our dedicated team works together to deliver exceptional service across various industries.</p> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <a href={member.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src={member.profilePic}
                      alt={`${member.name} profile picture`}
                      width={200}
                      height={100}
                      className="mx-auto mb-4"
                    />
                    <div className="text-center">
                      <h2 className="font-semibold text-[#0033A1] text-lg">{member.name}</h2>
                      <p className="text-gray-500">{member.role}</p>
                      <div className="flex items-center justify-center mt-2 text-[#0033A1]">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

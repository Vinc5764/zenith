"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import logo from '@/public/kan-Photoroom.png'
import HamburgerMenu from "@/components/HamburgerMenu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import profile from '@/public/profile.jpg'
import profile1 from '@/public/profile1.jpg'
import profile2 from '@/public/profile2.jpg'


const navLinks = [
  { href: "/management", label: "Management Consulting" },
  { href: "/accounting", label: "Accounting Tax & Audit" },
  { href: "/compliance", label: "Compliance" },
  { href: "/portfolio", label: "Portfolio Management" },
]

const portfolios = [
  {
    name: "Gracefields",
    sector: "Agriculture",
    logo: profile,
    companies: [
      { name: "Gidi farms", url: "https://www.gidifarms.com" }
    ]
  },
  {
    name: "Cornerstone",
    sector: "Industry & Manufacturing",
    logo: profile1,
    companies: [
      { name: "mrkitchen", url: "https://www.mrkitchen.com" }
    ]
  },
  {
    name: "Midstack",
    sector: "Finance",
    logo: profile2,
    companies: [
      { name: "corebanc", url: "https://www.corebanc.com" }
    ]
  }
]

export default function PortfolioManagementPage() {
  const [open, setOpen] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)

  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio)
    setOpen(true)
  }

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
          <h1 className="text-4xl font-bold mb-4 text-[#0033A1]">Diverse Portfolio Management</h1>
          <p className="text-xl mb-8 text-gray-600">Strategic investments across various sectors for optimal growth</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <button onClick={() => handlePortfolioClick(portfolio)} className="w-full text-left">
                    <Image
                      src={portfolio.logo}
                      alt={`${portfolio.name} logo`}
                      width={200}
                      height={100}
                      className="mx-auto mb-4"
                    />
                    <div className="flex flex-col items-center justify-center text-[#0033A1]">
                      <span className="font-semibold">{portfolio.name}</span>
                      <span className="text-sm text-gray-600">({portfolio.sector})</span>
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPortfolio?.name} Portfolio</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedPortfolio?.companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              >
                <span>{company.name}</span>
                <ExternalLink size={16} className="text-[#0033A1]" />
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
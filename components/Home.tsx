import Image from "next/image"
import Link from "next/link"
import logo from '@/public/kan-Photoroom.png'
import { Button } from "@/components/ui/button"
import HamburgerMenu from "@/components/HamburgerMenu"
import profile from '@/public/corporate.jpg'

const navLinks = [
  { href: "/management", label: "Management Consulting" },
  { href: "/accounting", label: "Accounting Tax & Audit" },
  { href: "/compliance", label: "Compliance" },
  { href: "/portfolio", label: "Portfolio Management" },
]

export default function FinancialServicesPage() {
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
          <div className="mb-8">
            <Image
              src={profile}
              alt="Financial Services"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="bg-gradient-to-r from-[#f45846] to-[#0066FF] text-transparent bg-clip-text">
            <h1 className="text-4xl font-bold mb-4">Assets Under Management</h1>
            <p className="text-4xl md:text-6xl font-bold flex justify-center items-center">
              <span className="text-2xl md:text-4xl mr-2">GHS</span>
              <span>3,400,000</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
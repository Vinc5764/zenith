import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import logo from '@/public/kan-Photoroom.png'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const companies = [
  { name: "Accounting Firm A", logo: "/placeholder.svg", url: "https://www.accountingfirma.com" },
  { name: "Accounting Firm B", logo: "/placeholder.svg", url: "https://www.accountingfirmb.com" },
  { name: "Accounting Firm C", logo: "/placeholder.svg", url: "https://www.accountingfirmc.com" },
]

const navLinks = [
  { href: "/management", label: "Management Consulting" },
  { href: "/accounting", label: "Accounting Tax & Audit" },
  { href: "/compliance", label: "Compliance" },
  { href: "/portfolio", label: "Portfolio Management" },
]

export default function AccountingPage() {
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
        <Button variant="outline" className="text-[#0033A1] border-[#0033A1] hover:bg-[#0033A1] hover:text-white">
          Login
        </Button>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#0033A1]">Expert Accounting Services</h1>
          <p className="text-xl mb-8 text-gray-600">Providing comprehensive financial reporting and analysis for your business</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companies.map((company) => (
              <Card key={company.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <a href={company.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={200}
                      height={100}
                      className="mx-auto mb-4"
                    />
                    <div className="flex items-center justify-center text-[#0033A1]">
                      <span className="font-semibold mr-2">{company.name}</span>
                      <ExternalLink size={16} />
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
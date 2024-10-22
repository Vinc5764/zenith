import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import logo from '@/public/kan-Photoroom.png'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HamburgerMenu from "@/components/HamburgerMenu"
import profile from '@/public/news.jpg'
import profile1 from '@/public/news1.jpg'
import profile2 from '@/public/news2.jpg'


const companies = [
  { name: "Company A", logo:profile, url: "https://www.companya.com" },
  { name: "Company B", logo:profile1, url: "https://www.companyb.com" },
  { name: "Company C", logo:profile2, url: "https://www.companyc.com" },
]

const navLinks = [
  { href: "/management", label: "Management Consulting" },
  { href: "/accounting", label: "Accounting Tax & Audit" },
  { href: "/compliance", label: "Compliance" },
  { href: "/portfolio", label: "Portfolio Management" },
]

export default function ManagementConsultingPage() {
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
          <h1 className="text-4xl font-bold mb-8 text-[#0033A1]">Optimize Business Process</h1>
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
import Image from "next/image"
import { Button } from "@/components/ui/button"
import corporate from '@/public/corporate.jpg'

export default function Component() {
  return (
    <div className="bg-white"data-aos='fade-up'>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800">Maximizing Your Financial Potential</h1>
          <Button variant="link" className="text-amber-600 hover:text-amber-700">
            Secure your financial Future Today!
          </Button>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 relative">
            <Image
              src={corporate}
              alt="Professional woman in white blazer"
              width={500}
              height={600}
              className="rounded-lg"
            />
            <div className="absolute top-1/4 -right-2 bg-[#0a2d4d] text-white p-6 rounded-lg shadow-lg z-10 max-w-[280px]">
              <h3 className="text-xl font-bold mb-2">Guiding Your</h3>
              <h3 className="text-xl font-bold mb-2">Finances to</h3>
              <h3 className="text-xl font-bold mb-2">Success</h3>
              <p className="text-lg">Since 1987</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-amber-600 font-semibold mb-4">/ CORPORATE</h4>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              The best partner for investment security and growth
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <ul className="space-y-4">
              {[
                "Financial Services",
                "Accounting & Audit",
                "Investment Plans",
                "Management and Audit"
              ].map((service, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-amber-600 font-bold mr-2">{String(index + 1).padStart(2, '0')}.</span>
                  <span className="text-gray-800 font-semibold">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
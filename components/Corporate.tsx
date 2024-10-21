import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, BarChart2, PieChart, TrendingUp } from "lucide-react"
import corporate from '@/public/corporate.jpg'

export default function Component() {
  const services = [
    { icon: DollarSign, name: "Financial Services" },
    { icon: BarChart2, name: "Accounting & Audit" },
    { icon: PieChart, name: "Investment Plans" },
    { icon: TrendingUp, name: "Management and Audit" }
  ]

  return (
    <div className="bg-white" data-aos='fade-up'>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Financial Potential</h1>
          <Button variant="link" className="text-amber-600 hover:text-amber-700 mt-2">
            Secure Future <ArrowRight className="ml-2 h-4 w-4" />
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
              <h3 className="text-2xl font-bold mb-2">Guiding</h3>
              <h3 className="text-2xl font-bold mb-2">Finances to</h3>
              <h3 className="text-2xl font-bold mb-2">Success</h3>
              <p className="text-xl mt-4">Since 1987</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-amber-600 mr-4"></div>
              <h4 className="text-amber-600 font-semibold uppercase">Corporate</h4>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Investment Security & Growth
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg shadow-sm">
                  <service.icon className="text-amber-600 w-12 h-12 mb-4" />
                  <span className="text-gray-800 font-semibold">{service.name}</span>
                </div>
              ))}
            </div>
            {/* <Button className="w-full mt-8 bg-[#0a2d4d] text-white hover:bg-[#0a2d4d]/90">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Import service images
import consultingImage from '@/public/prosper.jpg'
import accountingImage from '@/public/logo.jpg'
import portfolioImage from '@/public/agent.jpg'
import complianceImage from '@/public/jason.jpg'

export default function Component() {
  const services = [
    {
      title: "Management Consulting",
      description: "Strategic advice for business growth",
      image: consultingImage,
      icon: "📊",
    },
    {
      title: "Accounting & Tax",
      description: "Comprehensive financial services",
      image: accountingImage,
      icon: "📈",
    },
    {
      title: "Portfolio Management",
      description: "Optimizing your investment portfolio",
      image: portfolioImage,
      icon: "💼",
    },
    {
      title: "Compliance",
      description: "Ensuring regulatory adherence",
      image: complianceImage,
      icon: "✅",
    }
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href="/services" key={index}>
              <Card className="group bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full" data-aos='zoom-in-up'>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    // layout="fill"
                    // objectFit="center"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  {/* <div className="flex items-center text-amber-600 font-semibold mt-auto">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div> */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
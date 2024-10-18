import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

// Import service images
import consultingImage from '@/public/prosper.jpg'
import accountingImage from '@/public/logo.jpg'
import portfolioImage from '@/public/corporate.jpg'
import complianceImage from '@/public/jason.jpg'
import placeholder from '@/public/Placeholder.svg'

export default function ServicesPage() {
  const services = [
    {
      title: "Management Consulting",
      description: "Strategic advice to optimize your business operations and growth",
      image: consultingImage,
      items: [
        { name: "Strategy Development", logo: placeholder, url: "#" },
        { name: "Operational Efficiency", logo: placeholder, url: "#" },
        { name: "Digital Transformation", logo: placeholder, url: "#" },
      ]
    },
    {
      title: "Accounting & Tax",
      description: "Comprehensive financial services to ensure accurate reporting and tax optimization",
      image: accountingImage,
      items: [
        { name: "Financial Reporting", logo: placeholder, url: "#" },
        { name: "Tax Planning", logo: placeholder, url: "#" },
        { name: "Bookkeeping", logo: placeholder, url: "#" },
      ]
    },
    {
      title: "Portfolio Management",
      description: "Expert management of your investments to maximize returns",
      image: portfolioImage,
      items: [
        { name: "Gracefields", subtitle: "Gidi Farm", logo: placeholder, url: "#" },
        { name: "Cornerstone", subtitle: "Mister Kitchen", logo: placeholder, url: "https://misterkitchen.com" },
        { name: "Mid Stack", subtitle: "Core Bank", logo: placeholder, url: "https://corebank.com" },
      ]
    },
    {
      title: "Compliance",
      description: "Ensuring your business adheres to all relevant laws, regulations, and standards",
      image: complianceImage,
      items: [
        { name: "Regulatory Compliance", logo: placeholder, url: "#" },
        { name: "Risk Assessment", logo: placeholder, url: "#" },
        { name: "Audit Services", logo: placeholder, url: "#" },
      ]
    }
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comprehensive solutions tailored to your business needs
        </p>
        
        <div className="mb-16 text-center bg-amber-100 rounded-lg p-8 shadow-inner">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assets Under Management</h2>
          <p className="text-5xl font-bold text-amber-600">$2,700,000</p>
        </div>

        <Tabs defaultValue={services[0].title} className="w-full">
          <TabsList className="w-full justify-start h-8 overflow-y-hidden overflow-x-auto py-8">
            {services.map((service, index) => (
              <TabsTrigger key={index} value={service.title} className="px-4 py-2 text-sm md:text-base">
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.map((service, index) => (
            <TabsContent key={index} value={service.title}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-2 bg-white shadow-xl" data-aos="fade-right">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-[60vh] mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {service.items.map((item, itemIndex) => (
                        <Link href={item.url} key={itemIndex} className="group">
                          <Card className="bg-gray-50 hover:bg-white transition-colors duration-300">
                            <CardContent className="flex flex-col items-center p-4">
                              <Image
                                src={item.logo}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="mb-4"
                              />
                              <p className="text-sm font-medium text-center group-hover:text-amber-600 transition-colors duration-300">{item.name}</p>
                              {item.subtitle && (
                                <p className="text-xs text-gray-500 text-center">{item.subtitle}</p>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 text-white shadow-xl" data-aos="fade-left">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Why Choose Our {service.title}?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ArrowUpRight className="w-6 h-6 mr-2 text-amber-400 flex-shrink-0" />
                        <span>Industry-leading expertise in {service.title.toLowerCase()}</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowUpRight className="w-6 h-6 mr-2 text-amber-400 flex-shrink-0" />
                        <span>Tailored {service.title.toLowerCase()} solutions for your business</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowUpRight className="w-6 h-6 mr-2 text-amber-400 flex-shrink-0" />
                        <span>Proven track record of success in {service.title.toLowerCase()}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
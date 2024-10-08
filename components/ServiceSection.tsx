import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import service from '@/public/service.jpg'
import service1 from '@/public/service1.jpg'
import service2 from '@/public/service2.jpg'

export default function Component() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <h2 className="text-sm font-semibold text-center text-amber-600 uppercase tracking-wide mb-2">/ SERVICE</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Discover our expertise by<br />learning what we offer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Portfolio Management",
              image: service,
              alt: "Team discussing portfolio management"
            },
            {
              title: "Financial Planning",
              image: service1,
              alt: "Financial advisors planning together"
            },
            {
              title: "Wealth Management",
              image: service2,
              alt: "Professional working on wealth management"
            }
          ].map((service, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-md"data-aos='zoom-in-up'>
              <CardHeader className="p-0">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="pt-4 px-6">
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{service.title}</CardTitle>
                <p className="text-gray-600 mb-4">
                  Cultivating change enthusiasts fuels success, resulting in superior, more efficient, and robust
                  innovations.
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button variant="default" className="bg-[#0a2d4d] text-white hover:bg-[#0a2d4d]/90">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import profile from '@/public/profile.jpg'
import profile1 from '@/public/profile1.jpg'
import profile2 from '@/public/profile2.jpg'

const testimonials = [
  {
    name: "Anne Hatteway",
    role: "CEO",
    image: profile,
    rating: 5,
    highlight: "Superior innovations"
  },
  {
    name: "Daniel Foreman",
    role: "CEO",
    image: profile1,
    rating: 5,
    highlight: "Ignites progress"
  },
  {
    name: "David Antonio",
    role: "CEO",
    image: profile2,
    rating: 5,
    highlight: "Shapes tomorrow"
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Quote className="w-8 h-8 text-amber-600 mr-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Client Testimonials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md overflow-hidden" data-aos='fade-up'>
              <div className="relative h-48">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile picture`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm opacity-75">{testimonial.role}</p>
                </div>
              </div>
              <CardContent className="pt-6">
                <div className="flex mb-4" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">&apos;{testimonial.highlight}&apos;</p>
              </CardContent>
              <CardFooter className="bg-amber-50 py-4">
                <Quote className="w-8 h-8 text-amber-600 mr-2" />
                <p className="text-sm text-gray-600 italic">Kan transformed our business</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import profile from '@/public/profile.jpg'
import profile1 from '@/public/profile1.jpg'
import profile2 from '@/public/profile2.jpg'

const testimonials = [
  {
    name: "Anne Hatteway",
    role: "CEO",
    image: profile,
    content: "Cultivating change enthusiasts fuels success, resulting in superior, more efficient, and robust innovations. Your leadership ignites progress; we stand ready to ready advance your history and shape tomorrow."
  },
  {
    name: "Daniel Foreman",
    role: "CEO",
    image: profile1,
    content: "Cultivating change enthusiasts fuels success, resulting in superior, more efficient, and robust innovations. Your leadership ignites progress; we stand ready to ready advance your history and shape tomorrow."
  },
  {
    name: "David Antonio",
    role: "CEO",
    image: profile2,
    content: "Cultivating change enthusiasts fuels success, resulting in superior, more efficient, and robust innovations. Your leadership ignites progress; we stand ready to ready advance your history and shape tomorrow."
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-center text-amber-600 font-semibold mb-2">/ TESTIMONIAL</h2>
        <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What our valued clients say<br />about zenith
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md"data-aos='fade-up'>
              <CardContent className="pt-6">
                <div className="flex mb-4" aria-label={`Rating: 5 out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile picture`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
                <svg className="w-8 h-8 text-amber-600 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import news from '@/public/news.jpg'
import news1 from '@/public/news1.jpg'
import news2 from '@/public/news2.jpg'
import Image from "next/image"

const newsItems = [
  {
    title: "Global Investment Trends",
    image: news,
    date: "June 15, 2023",
    readTime: "5 min read",
    category: "Investment",
  },
  {
    title: "Asset Management Strategies",
    image: news1,
    date: "June 20, 2023",
    readTime: "4 min read",
    category: "Management",
  },
  {
    title: "Tech Giants & AI Investment",
    image: news2,
    date: "June 25, 2023",
    readTime: "6 min read",
    category: "Technology",
  },
]

export default function Component() {
  return (
    <div className="bg-white text-[#0a192f] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-[#b8860b] text-white px-4 py-2 rounded-full">
            <h2 className="text-sm uppercase font-bold">Latest News</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="border-none shadow-lg overflow-hidden" data-aos='zoom-in-up'>
              <div className="relative">
                <Image src={item.image} alt={item.title} layout="responsive" width={400} height={225} className="object-cover" />
                <div className="absolute top-4 left-4 bg-white text-[#0a192f] px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{item.date}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{item.readTime}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="bg-[#0a192f] hover:bg-[#152a4e] text-white w-full flex items-center justify-center">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
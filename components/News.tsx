import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import news from '@/public/news.jpg'
import news1 from '@/public/news1.jpg'
import news2 from '@/public/news2.jpg'
import Image from "next/image"

const newsItems = [
  {
    title: "Global Investment Trends: Opportunities and Risks in 2023",
    image: news,
    description: "/ SINGLE NEWS Global Investment Trends: Opportunities and Risks in 2023 Book free consultation Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Effective Asset Management Strategies for Sustainable Growth",
    image: news1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Tech Giants' Investment Plans in Artificial Intelligence Raise...",
    image: news2,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]

export default function Component() {
  return (
    <div className="bg-white text-[#0a192f] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm uppercase text-[#b8860b] mb-2 md:mb-4 text-center">/ NEWS</h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Management and Investment News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="border border-gray-200 flex flex-col"data-aos='zoom-in-up'>
              <CardHeader className="p-0">
                <Image src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg sm:text-xl font-bold mb-2">{item.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="bg-[#0a192f] hover:bg-[#152a4e] text-white w-full">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
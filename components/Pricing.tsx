import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"

export default function Component() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-none"data-aos='fade-up'>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Standard Pack</CardTitle>
              <p className="text-gray-600">For small-medium enterprise</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-gray-800 mb-4">
                <span className="text-2xl align-top">$</span>99
                <span className="text-xl font-normal text-gray-600">/Month</span>
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>5 Users</li>
                <li>20 Projects</li>
                <li>Limited Support</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="default" className="bg-[#0a2d4d] text-white hover:bg-[#0a2d4d]/90">
                Get Quote Now
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#0a2d4d] text-white"data-aos='fade-up'>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">Corporate Pack</CardTitle>
              <p className="text-gray-300">For corporate business</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold mb-4">
                <span className="text-2xl align-top">$</span>199
                <span className="text-xl font-normal text-gray-300">/Month</span>
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>5 Users</li>
                <li>20 Projects</li>
                <li>Limited Support</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="default" className="bg-amber-600 text-white hover:bg-amber-700">
                Get Quote Now
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4"data-aos='fade-up'>
            <h4 className="text-amber-600 font-semibold">/ PRICING</h4>
            <h2 className="text-3xl font-bold text-gray-800">
              Exploring our comprehensive and flexible pricing plans
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button variant="outline" className="text-[#0a2d4d] border-[#0a2d4d]">
              <Play className="mr-2 h-4 w-4" /> Play presentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
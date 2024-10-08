import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import agent from '@/public/agent.jpg'
import agent1 from '@/public/agent1.jpg'

export default function Component() {
  return (
    <div className="bg-[#0a192f] text-white p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-sm uppercase mb-4">/ AGENT</h2>
            <h1 className="text-4xl font-bold mb-6">
              Meet our expert Investment to help you secure your asset
            </h1>
            <Button className="bg-[#b8860b] hover:bg-[#9a7209] text-white">
              View All Agents
            </Button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Bobby Brown",
                title: "Consultant",
                image: agent,
              },
              {
                name: "Eddie Murphy",
                title: "Consultant",
                image: agent1,
              },
            ].map((agent) => (
              <Card key={agent.name} className="bg-white text-[#0a192f]"data-aos='fade-up'>
                <CardHeader>
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <CardTitle className="text-xl font-bold">{agent.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">/ {agent.title}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#0a192f] hover:bg-[#152a4e] text-white">
                    Contact Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
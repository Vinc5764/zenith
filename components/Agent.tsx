import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Phone, Mail, Linkedin } from "lucide-react"
import agent from '@/public/agent.jpg'
import agent1 from '@/public/agent1.jpg'

export default function Component() {
  const agents = [
    {
      name: "Bobby Brown",
      title: "Investment Consultant",
      image: agent,
      phone: "+1 234 567 8901",
      email: "bobby@example.com",
      linkedin: "bobby-brown"
    },
    {
      name: "Eddie Murphy",
      title: "Financial Advisor",
      image: agent1,
      phone: "+1 234 567 8902",
      email: "eddie@example.com",
      linkedin: "eddie-murphy"
    },
  ]

  return (
    <div className="bg-[#0a192f] text-white p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="inline-block bg-[#b8860b] px-4 py-2 rounded-full mb-4">
              <h2 className="text-sm uppercase font-bold">Expert Agents</h2>
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Secure Your Assets
            </h1>
            <Button className="bg-[#b8860b] hover:bg-[#9a7209] text-white">
              View All Agents
            </Button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent) => (
              <Card key={agent.name} className="bg-white text-[#0a192f] overflow-hidden" data-aos='fade-up'>
                <div className="relative h-64">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{agent.name}</h3>
                    <p className="text-sm opacity-75">{agent.title}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" className="p-2" onClick={() => window.location.href = `tel:${agent.phone}`}>
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" className="p-2" onClick={() => window.location.href = `mailto:${agent.email}`}>
                      <Mail className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" className="p-2" onClick={() => window.open(`https://www.linkedin.com/in/${agent.linkedin}`, '_blank')}>
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#0a192f] hover:bg-[#152a4e] text-white">
                    Schedule Meeting
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
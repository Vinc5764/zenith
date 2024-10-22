import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-[#0033A1]">
            <Phone size={20} />
            <span>0531267399</span>
          </div>
          <div className="flex items-center space-x-2 text-[#0033A1]">
            <Mail size={20} />
            <a href="mailto:Kanassetmanagement@gmail.com" className="hover:underline">
              Kanassetmanagement@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2 text-[#0033A1]">
            <MapPin size={20} />
            <span>Parakuo Estate Denya Avenue 200</span>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Kan Asset Management. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
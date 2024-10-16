// import Link from 'next/link'
// import { ChevronRight, Home } from 'lucide-react'

// interface BreadcrumbProps {
//   currentService: string;
// }

// export default function Breadcrumb({ currentService }: BreadcrumbProps) {
//   return (
//     <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
//       <ol className="flex items-center space-x-2">
//         <li>
//           <Link href="/" className="flex items-center hover:text-amber-600 transition-colors duration-200">
//             <Home className="w-4 h-4 mr-1" />
//             <span>Home</span>
//           </Link>
//         </li>
//         <li>
//           <ChevronRight className="w-4 h-4" />
//         </li>
//         <li>
//           <Link href="/services" className="hover:text-amber-600 transition-colors duration-200">
//             Services
//           </Link>
//         </li>
//         <li>
//           <ChevronRight className="w-4 h-4" />
//         </li>
//         <li>
//           <span className="font-medium text-gray-900" aria-current="page">
//             {currentService}
//           </span>
//         </li>
//       </ol>
//     </nav>
//   )
// }
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Calendar, User, Home } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const Navigation = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/therapists', label: 'Therapists', icon: User },
    { href: '/book', label: 'Book Session', icon: Calendar },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TalkCure</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            {session?.user && 
             <button 
               onClick={() => signOut({ callbackUrl: '/auth/signin' })}
               className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium border-2 border-blue-400 cursor-pointer text-blue-600 hover:bg-blue-50 transition-colors duration-200"
             >
               <span>Logout</span>
             </button>}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

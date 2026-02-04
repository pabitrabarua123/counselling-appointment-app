'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Heart, Calendar, User, Home } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const Navigation = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { href: '', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#therapists', label: 'My Therapists' },
    { href: '/book', label: 'How It Works' },
  ]

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gradient-to-b from-[#f6feff] to-[#e8f1f9] shadow-soft" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TalkCure</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-5">
            {navItems.map((item) => {
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
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out cursor-pointer bg-gradient text-white hover:-translate-y-1 h-10 rounded-xl px-5 w-full group sm:w-auto">
              <Calendar className="h-4 w-4 text-white" />
              <span className="text-sm font-medium">Book Assesment</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

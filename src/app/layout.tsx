import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '@/components/providers/AuthProvider'
import Footer from '@/components/Footer'
import { Outfit } from 'next/font/google'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TalkCure - Online Psychotherapy Booking',
  description: 'Book online psychotherapy sessions with qualified therapists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={outfit.className}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
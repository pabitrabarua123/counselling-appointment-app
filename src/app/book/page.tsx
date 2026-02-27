import FormWizard from '@/components/FormWizard'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book a session with a therapist',
}

export default function BookPage() {
  return (
    <>
      <Navigation/>
      <FormWizard />
      <Footer/>
    </>
    
  )
}

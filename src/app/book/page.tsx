import FormWizard from '@/components/FormWizard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Book a session with a therapist',
}

export default function BookPage() {
  return (
    <FormWizard />
  )
}

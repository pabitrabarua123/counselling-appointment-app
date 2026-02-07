import Link from 'next/link';
import { Calendar, Users, Shield, Clock } from 'lucide-react';
import TherapistTab from '@/components/TherapistsTab/TherapistTab';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import Pricing from '@/components/Home/Pricing';

export default function Home() {
  const features = [
    {
      icon: Users,
      title: 'Qualified Therapists',
      description: 'Connect with licensed and experienced mental health professionals'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with our easy booking system'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your privacy and data security are our top priorities'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Access to mental health resources and support whenever you need it'
    }
  ]

  return (
    <div className="">
      <Hero />
      <About />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TalkCure?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform for mental health support with 
              qualified professionals and flexible scheduling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="therapist" className="py-20 bg-light-ultra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className='uppercase font-medium text-theme text-center'>Meet Your Therapists</p>
           <h2 className="text-5xl font-bold text-black text-center mb-15">
            Guiding Your Healing
          </h2>
          <TherapistTab />
        </div>
      </section>

      <Pricing />

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Take the first step towards better mental health today.
          </p>
          <Link
            href="/book"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  )
}
import Link from 'next/link';
import TherapistTab from '@/components/TherapistsTab/TherapistTab';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import Pricing from '@/components/Home/Pricing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Steps from '@/components/Home/Steps';
import Testimonial from '@/components/Home/Testimonial';
import Faq from '@/components/Home/Faq';
import Cta from '@/components/Home/Cta';

export const metadata = {
  title: 'TalkCure - Online Psychotherapy Booking',
  description: 'Book online psychotherapy sessions with qualified therapists',
}

export default function Home() {

  return (
    <div className="">
      <Navigation/>
      <Hero />
      <About />
      <Steps />
      <section id="therapists" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-theme bg-light font-semibold bg-primary/10 px-4 py-2 mb-3 rounded-full text-sm">Meet Your Therapists</span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight tracking-tight">Guiding Your <span className="text-theme">Healing</span></h2>
          </div>
          <TherapistTab />
        </div>
      </section>
      <Pricing />
      <Testimonial />
      <Faq />
      <Cta /> 
      <Footer/>
    </div>
  )
}
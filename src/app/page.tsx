import Link from 'next/link'
import { Heart, Calendar, Users, Shield, Clock, ShieldCheck, BadgeCheck, ArrowRight, Languages, BadgeDollarSign } from 'lucide-react'
import Image from 'next/image';
import RatingCard from '@/components/ui/RatingCard';
import TherapistTab from '@/components/TherapistsTab/TherapistTab';
import { TABS } from '@/components/TherapistsTab/TABS';

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden bg-gradient-to-b from-[#f6feff] to-[#e8f1f9]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-light text-secondary px-4 py-2 rounded-full text-sm font-medium" ><span className="w-2 h-2 bg-primary rounded-full animate-pulse" aria-hidden="true"></span>Most Trusted Mental Health Platform</div>
  
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold text-foreground leading-[1.1] tracking-tight">Embark on Your <span className="text-theme">Mental Wellness</span> Journey</h1>
            
            <p className="text-lg text-secondary mb-8 max-w-[500px]">
              Connect with qualified therapists and take the first step towards better mental health 
              with our secure, confidential online therapy platform.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
             <div className="flex items-center gap-2 text-foreground">
              <ShieldCheck className="text-theme" />
              <span className="font-medium text-sm">Certified Professionals</span>
             </div>
             <div className="flex items-center gap-2 text-foreground">
              <Users className="text-theme" />
              <span className="font-medium text-sm">10,000+ Lives Transformed</span>
             </div>
             <div className="flex items-center gap-2 text-foreground">
    	        <BadgeCheck className="text-theme" />
              <span className="font-medium text-sm">100% Confidential</span>
             </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary hover:-translate-y-1 duration-300 ease-out text-white px-10 py-4 rounded-2xl font-semibold"
              >
                <Calendar className="h-4 w-4"/> Book Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link
                href="/therapists"
                className="border-2 border-primary text-secondary px-8 py-3 rounded-2xl font-semibold hover:bg-light transition-colors"
              >
                Learn More
              </Link>
            </div>
            <p className="text-sm text-secondary pt-2">⭐ 4.9/5 rating from 1,200+ reviews • Sessions from ₹299</p>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_4px_12px_-2px_#3d31290f,0_8px_48px_-4px_#3d312914]">
                <Image 
                  src="/images/hero.jpg" 
                  alt="TalkCure" 
                  width={800} 
                  height={1024}
                  className="w-full h-[520px] object-cover object-center"/>
              </div>
              <RatingCard />
            </div>
          </div>
        </div>
          
        </div>
      </section>

      <section id="about" className="py-20 md:py-28 bg-card" aria-labelledby="about-heading">
       <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-card">
               <Image 
                 src="/images/online-counselling.jpg"
                 alt="About TalkCure" 
                 width={644} 
                 height={480}
                 className="w-full h-[400px] md:h-[500px] object-cover object-center"/> 
              </div>
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-gradient text-white p-4 md:p-6 rounded-2xl" aria-label="Platform statistics">
                <div className="grid grid-cols-3 gap-4 md:gap-6 text-center"><div>
                <p className="text-xl md:text-3xl font-bold">50+</p>
                <p className="text-xs md:text-sm opacity-80">Experts</p>
              </div>
            <div>
             <p className="text-xl md:text-3xl font-bold">10k+</p>
             <p className="text-xs md:text-sm opacity-80">Sessions</p>
            </div>
          <div>
           <p className="text-xl md:text-3xl font-bold">4.9</p>
           <p className="text-xs md:text-sm opacity-80">Rating</p>
          </div>
        </div>
      </div>
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10" aria-hidden="true">
      </div>
    </div>
  </div>
  <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
    <div className="space-y-4">
      <span className="inline-block text-theme bg-light font-semibold bg-primary/10 px-4 py-1.5 rounded-full text-sm">About Us</span>
      <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight tracking-tight">Healing Begins Where You <span className="text-theme">Feel Safe</span></h2>
      </div>
      <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
        <p className="text-secondary">TalkCure was founded on a simple belief, everyone deserves access to quality mental health care, without fear or stigma. Our <strong className="text-black">certified psychologists</strong> combine evidence-based therapy with compassionate, human-centered care.</p>
        <p className="text-secondary">Whether you’re facing anxiety, relationship challenges, work stress, or simply need someone to listen, TalkCure is here for you. No judgment—just understanding, support, and expert guidance on your path to well-being.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
        <div className="bg-light-ultra flex items-start gap-3 p-3 md:p-4 bg-background rounded-xl">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
           <ShieldCheck className="text-theme" />
          </div>
          <div className="min-w-0">
           <span className="font-medium text-foreground text-sm block">Certified Professionals</span>
           <span className="text-xs text-secondary">All therapists verified</span>
          </div>
        </div>
        <div className="bg-light-ultra flex items-start gap-3 p-3 md:p-4 bg-background rounded-xl">
         <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
           <Languages className="text-theme" />
         </div>
         <div className="min-w-0">
          <span className="font-medium text-foreground text-sm block">Hindi, Tamil &amp; English</span>
          <span className="text-xs text-secondary">Sessions in your language</span>
        </div>
        </div>
        <div className="bg-light-ultra flex items-start gap-3 p-3 md:p-4 bg-background rounded-xl" >
         <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <BadgeDollarSign className="text-theme" />
         </div>
         <div className="min-w-0">
          <span className="font-medium text-foreground text-sm block">Affordable Packages</span>
          <span className="text-xs text-secondary">Starting from ₹299</span>
          </div>
          </div>
          <div className="bg-light-ultra flex items-start gap-3 p-3 md:p-4 bg-background rounded-xl" >
           <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="text-theme" />
           </div>
           <div className="min-w-0">
            <span className="font-medium text-foreground text-sm block">No Judgement</span>
            <span className="text-xs text-secondary">Safe, supportive space</span>
           </div>
          </div>
          </div>
          <div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out cursor-pointer bg-gradient text-white hover:-translate-y-1 h-12 rounded-xl px-8 w-full group sm:w-auto">
              Start Your Journey Today
              <ArrowRight className="transition-transform group-hover:translate-x-1 h-4 w-4"/>
            </button>
              </div>
              </div>
              </div>
              </div>
              </section>

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

      <section className="py-20 bg-light-ultra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TherapistTab data={TABS} />
        </div>
      </section>

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
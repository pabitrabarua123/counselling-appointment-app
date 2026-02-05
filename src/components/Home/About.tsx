"use client";

import Image from "next/image";
import { ShieldCheck, Languages, BadgeDollarSign, Heart, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();
    return (
        <>
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
            <Button variant="primary" onClick={() => router.push("/book")}>
              <span>Start Your Journey Today</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1 h-4 w-4"/>
            </Button>
           </div>
          </div>
        </div>
       </div>
      </section>
        </>
    )
}
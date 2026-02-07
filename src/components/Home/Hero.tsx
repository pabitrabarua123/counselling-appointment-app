"use client"

import Image from "next/image";
import { ArrowRight, BadgeCheck, Calendar, ShieldCheck, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import RatingCard from "../ui/RatingCard";
import { useQuery } from "@tanstack/react-query"
import { TabItem } from "@/types";

export default function Hero() {
    const router = useRouter();
    return (
     <>
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
              <Button variant="primary" onClick={() => router.push("/book")}>
                <Calendar className="h-4 w-4"/> 
                <span>Book Consultation</span> 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </Button>
              <Button variant="outline" onClick={() => router.push('#about')}>
                Learn More
              </Button>
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
     </>   
    )
}
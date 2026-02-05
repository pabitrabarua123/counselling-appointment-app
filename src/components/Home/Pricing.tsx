"use client";

import { Clock, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Pricing() {
    const router = useRouter();
    return (
       <>
        <section id="pricing" className="py-20 bg-light-ultra">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className='uppercase font-medium text-theme text-center'>Pricing</p>
           <h2 className="text-5xl font-bold text-black text-center mb-2">
            Care You Can Afford
          </h2>
          <p className="text-center text-secondary md:text-lg mb-6">Quality mental health support, accessible to everyone</p>
          <p className="flex gap-2 text-secondary text-sm items-center justify-center"><Clock className="w-4 h-4" /> Each session is 50 minutes</p>
         </div>
         <div
    className="mt-12 rounded-2xl border text-card-foreground transition-all duration-300 ease-out bg-white shadow-soft max-w-2xl mx-auto border-light shadow-xl overflow-hidden"
>
    <div className="p-6 text-center border-b border-gray-300">
        <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
         Sliding Scale
        </div>
        <h3 className="text-2xl md:text-3xl font-playfair font-bold">Individual Therapy Sessions</h3>
    </div>
    <div className="p-8 text-center">
        <div className="mb-6 relative">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                    <span className="text-5xl md:text-6xl font-bold text-theme">$49</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 origin-left" >
                    <div className="w-8 md:w-16 h-1 bg-light rounded-full"></div>
                    <div className="w-3 h-3 rounded-full bg-primary" ></div>
                    <div className="w-8 md:w-16 h-1 bg-light rounded-full"></div>
                </div>
                <div className="text-center" >
                    <span className="text-5xl md:text-6xl font-bold text-theme">$59</span>
                </div>
            </div>
            <p className="text-secondary">Initial Session & Follow-Up Session</p>
        </div>
        <div className="bg-light rounded-xl p-5 mb-6">
            <p className="text-foreground leading-relaxed">
              Everyone deserves access to therapy. Our flexible pricing adapts to what you can afford, so care stays within reach.
            </p>
        </div>
        <ul className="text-left text-muted-foreground space-y-3 mb-8 max-w-md mx-auto">
            <li className="flex text-secondary items-start gap-3">
                <span className="mt-0">✓</span><span>50-minute one-on-one session with a qualified therapist</span>
            </li>
            <li className="flex text-secondary items-start gap-3">
                <span className="mt-0">✓</span><span>Personalized approach based on your unique needs</span>
            </li>
            <li className="flex text-secondary items-start gap-3">
                <span className="mt-0">✓</span><span>Safe, confidential, and non-judgmental space</span>
            </li>
            <li className="flex text-secondary items-start gap-3">
                <span className="mt-0">✓</span><span>Flexible scheduling to fit your lifestyle</span>
            </li>
        </ul>
        <div>
           <Button variant="primary" onClick={() => router.push("/book")}>
              <Calendar className="w-4 h-4"/><span>Book Your Session</span>
           </Button>
        </div>
    </div>
</div>

        </section>
       </>
    )
}
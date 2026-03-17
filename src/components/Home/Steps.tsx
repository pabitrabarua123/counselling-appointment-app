import { Calendar, Users, Shield, SquareArrowOutUpRight } from 'lucide-react';

export default function Steps() {
    return (
      <section className="py-20 bg-light-ultra" id="steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-theme bg-light font-semibold bg-primary/10 px-4 py-2 mb-3 rounded-full text-sm">Simple Process</span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight tracking-tight">Getting Started is <span className='text-theme'>Easy</span></h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
    <div className="relative group shadow-[0_4px_12px_-2px_#3d31290f,0_8px_48px_-4px_#3d312914]">
        <div
            className="relative rounded-xl bg-white p-3 md:p-4 h-full flex flex-col items-center text-center"
        >
            <div className="absolute top-2 right-2 text-lg md:text-xl font-bold text-theme">
                01
            </div>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-2 md:mb-3 mt-1 bg-blue-500/15 text-blue-600">
             <Users />
            </div>
            <h3 className="text-md font-heading font-bold mb-1">Choose Your Therapist</h3>
            <p className="text-[12px] text-secondary leading-relaxed">
               Explore verified psychologists and find the one that best suits your needs.
            </p>
        </div>
    </div>
    <div className="relative group shadow-[0_4px_12px_-2px_#3d31290f,0_8px_48px_-4px_#3d312914]">
        <div
            className="relative rounded-xl bg-white p-3 md:p-4 h-full flex flex-col items-center text-center"
        >
            <div className="absolute top-2 right-2 text-lg md:text-xl font-bold text-theme">
                02
            </div>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-2 md:mb-3 mt-1 bg-green-500/15 text-green-600">
              <Calendar />
            </div>
            <h3 className="text-md font-heading font-bold mb-1">Confirm Your Time Slot</h3>
            <p className="text-[12px] md:text-xs text-secondary leading-relaxed">
                Confirm your time slot and therapist and we’ll handle the rest.
            </p>
        </div>
    </div>
    <div className="relative group shadow-[0_4px_12px_-2px_#3d31290f,0_8px_48px_-4px_#3d312914]">
        <div
            className="relative rounded-xl bg-white p-3 md:p-4 h-full flex flex-col items-center text-center"
        >
            <div className="absolute top-2 right-2 text-lg md:text-xl font-bold text-theme">
                03
            </div>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-2 md:mb-3 mt-1 bg-amber-500/15 text-amber-600">
               <Shield />
            </div>
            <h3 className="text-md font-heading font-bold mb-1">Secure Your Booking</h3>
            <p className="text-[12px] md:text-xs text-secondary leading-relaxed">
               Lock in your preferred time and therapist in just a few seconds.
            </p>
        </div>
    </div>
    <div className="relative group shadow-[0_4px_12px_-2px_#3d31290f,0_8px_48px_-4px_#3d312914]">
        <div
            className="relative rounded-xl bg-white p-3 md:p-4 h-full flex flex-col items-center text-center"
        >
            <div className="absolute top-2 right-2 text-lg md:text-xl font-bold text-theme">
                04
            </div>
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-2 md:mb-3 mt-1 bg-rose-500/15 text-rose-600">
              <SquareArrowOutUpRight />
            </div>
            <h3 className="text-md font-heading font-bold text-foreground mb-1">Start Therapy &amp; Heal</h3>
            <p className="text-[12px] md:text-xs text-secondary leading-relaxed">
                Start your healing journey with a secure and confidential video session.
            </p>
        </div>
    </div>
</div>

        </div>
      </section>
    )
}
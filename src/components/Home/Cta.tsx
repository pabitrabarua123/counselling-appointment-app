export default function Cta(){
    return(
        <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#009688] to-[#00796B]">
  
  {/* Background Glow */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-300 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
      Ready to Feel Better, One Step at a Time?
    </h2>

    {/* Subtext */}
    <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
      You don’t have to go through this alone. Connect with experienced therapists 
      and begin your journey toward clarity, balance, and emotional well-being.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      
      {/* Primary CTA */}
      <a
        href="/book"
        className="bg-white text-[#009688] px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        Book Your First Session
      </a>

      {/* Secondary CTA */}
      <a
        href="/book"
        className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-all"
      >
        Browse Therapists
      </a>
    </div>

    {/* Trust Line */}
    <p className="text-teal-100 text-sm mt-6">
      ✔ 100% Confidential &nbsp; • &nbsp; ✔ Certified Professionals &nbsp; • &nbsp; ✔ Flexible Scheduling
    </p>
  </div>
</section>
    )
}
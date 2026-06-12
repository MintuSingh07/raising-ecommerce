import Link from "next/link";

export default function AboutUs() {
  const values = [
    {
      num: "01",
      title: "Customer Satisfaction",
      desc: "Deliver unmatched service and reliability."
    },
    {
      num: "02",
      title: "Innovation",
      desc: "Invest in cutting-edge technology."
    },
    {
      num: "03",
      title: "Sustainability",
      desc: "Promote eco-friendly practices."
    },
    {
      num: "04",
      title: "Quality",
      desc: "Maintain rigorous quality control."
    },
    {
      num: "05",
      title: "Growth",
      desc: "Expand market presence globally."
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Brand Story & Introduction */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-accent rounded-full"></span>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Introducing Raising
              </span>
            </div>

            {/* Headline statement */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-navy tracking-tight leading-tight">
              Transform your lighting experience with RISING.
            </h2>

            {/* Highlighted key phrase */}
            <p className="text-base sm:text-lg text-primary font-medium leading-relaxed">
              India’s foremost manufacturer of superior portable lighting solutions.
            </p>

            {/* Structured Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-body leading-relaxed">
              <p>
                Driven by our passion for quality and groundbreaking designs, we develop innovative, high-performance LED products. Explore our energy-saving, environmentally conscious options engineered for unmatched efficiency and longevity.
              </p>
              <p className="font-semibold text-dark-navy">
                Choose RISING and experience the brilliance of a leading-edge portable lighting manufacturer.
              </p>
            </div>

            {/* Read More link */}
            <div className="pt-2">
              <Link
                href="#about-details"
                className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary-navy group transition-colors cursor-pointer"
              >
                <span>Read More</span>
                <svg className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trusted by Clients Badge */}
            <div className="pt-6 border-t border-slate-100 w-full flex flex-col items-start">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_1.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_2.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_3.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_4.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-sm">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">2M+</span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">Happy buyers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">25K+</span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">Client review</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">4.8</span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">Positive Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Core Values Numbered List */}
          <div className="lg:col-span-6 w-full">
            <div className="flex flex-col space-y-6 w-full lg:pl-8">
              {values.map((val, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-6 pb-6 border-b border-slate-100 last:border-0 group transition-all duration-300"
                >
                  {/* Number index */}
                  <span className="text-xl sm:text-2xl font-semibold text-primary/30 group-hover:text-primary transition-colors duration-300">
                    {val.num}
                  </span>
                  
                  {/* Title & Description */}
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-dark-navy group-hover:text-primary transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-body mt-1 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

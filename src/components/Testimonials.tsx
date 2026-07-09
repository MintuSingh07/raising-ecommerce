"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import BlurText from "./BlurText";

const STRIP_1_TESTIMONIALS = [
  {
    quote: "Best rechargeable torch manufacturer in India. Quality and service both are very good.",
    author: "Rajender Singh",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "Great flashlight at affordable pricing. Standard quality. Recommend it.",
    author: "Kavita Chhipa",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "I have purchased TOOFAN and HUNTER. Wonderful Products, 🫡",
    author: "Jitendra Singh",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "High quality rechargeable products. The Kisan torch is very helpful for farming during night hours. Battery backup is superb.",
    author: "Ramesh Patel",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "Excellent emergency home lights and searchlights. Heavy-duty build and very bright light. Must buy.",
    author: "Priya Sharma",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  }
];

const STRIP_2_TESTIMONIALS = [
  {
    quote: "So nice. Their employees nature is very nice. Clean and higenic place. Best product.",
    author: "Virendra Kumar",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "So good",
    author: "Mohindra Kumar Arora",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "Best deal on LED lights and torches. Purchased bulk quantity for my store. Customers are very happy with the quality.",
    author: "Sanjay Jha",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "Using the heavy metal flashlight for last 2 years. Very robust body and waterproof as advertised.",
    author: "Anil Dewasi",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  },
  {
    quote: "Superb product quality. RISING brand torch has long battery backup. Good customer service.",
    author: "Gopal Choudhary",
    role: "Verified Customer",
    location: "Jodhpur, Rajasthan",
    rating: 5,
    tag: "Google Review"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const allTestimonials = [...STRIP_1_TESTIMONIALS, ...STRIP_2_TESTIMONIALS];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % allTestimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStart - endX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden scroll-mt-20">
      
      {/* Dynamic Inline CSS for Infinite Marquee Animations with Hover Pause */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 30s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee-ltr,
        .marquee-container:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <BlurText className="justify-center" text="Testimonials" delay={30} animateBy="words" direction="bottom" />
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-dark-navy tracking-tight leading-tight uppercase w-full flex justify-center">
            <BlurText className="justify-center" text="Trusted by Distributors &amp; Users" highlightWords={["Distributors"]} delay={20} animateBy="words" direction="bottom" />
          </h2>
          <p className="text-sm sm:text-base text-slate-body font-medium leading-relaxed">
            Read how our high-performance lighting systems power industries, farms, and businesses across India.
          </p>
        </div>
      </div>

      {/* Testimonials Strips Section - Desktop */}
      <div className="hidden md:block space-y-8 relative w-full">
        {/* Left & Right Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 z-10 bg-gradient-to-r from-white via-white/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 z-10 bg-gradient-to-l from-white via-white/50 to-transparent" />

        {/* First Strip: Left to Right scrolling */}
        <div className="marquee-container overflow-hidden w-full py-2">
          <div className="animate-marquee-ltr gap-6">
            {/* First Set */}
            {STRIP_1_TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`strip1-a-${idx}`} testimonial={t} />
            ))}
            {/* Duplicate Set for Infinite loop */}
            {STRIP_1_TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`strip1-b-${idx}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Second Strip: Right to Left scrolling */}
        <div className="marquee-container overflow-hidden w-full py-2">
          <div className="animate-marquee-rtl gap-6">
            {/* First Set */}
            {STRIP_2_TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`strip2-a-${idx}`} testimonial={t} />
            ))}
            {/* Duplicate Set for Infinite loop */}
            {STRIP_2_TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`strip2-b-${idx}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Swipeable Slider - Mobile/Tablet */}
      <div className="block md:hidden px-4 select-none relative w-full overflow-hidden">
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-sm mx-auto overflow-hidden rounded-[28px]"
        >
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {allTestimonials.map((t, idx) => (
              <div key={`mobile-card-${idx}`} className="w-full shrink-0 px-1">
                <TestimonialCard testimonial={t} isMobile={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators / Nav Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {allTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? "w-6 bg-primary" 
                  : "w-2 bg-slate-200 hover:bg-slate-350"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Testimonial Card Component
function TestimonialCard({
  testimonial,
  isMobile = false,
}: {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    location: string;
    rating: number;
    tag: string;
  };
  isMobile?: boolean;
}) {
  return (
    <div className={`bg-slate-50/50 border border-slate-100 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between h-[210px] relative hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-primary/10 transition-all duration-300 select-none shrink-0 ${isMobile ? "w-full" : "w-[300px] sm:w-[360px]"}`}>
      {/* Quote decoration */}
      <span className="text-4xl sm:text-5xl font-serif text-primary/15 absolute left-5 top-12 select-none pointer-events-none">
        “
      </span>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
            {testimonial.tag}
          </span>
          {/* Star Rating */}
          <div className="flex text-amber-400 gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold pl-4 line-clamp-3">
          {testimonial.quote}
        </p>
      </div>

      {/* Author Details */}
      <div className="pt-3 border-t border-slate-100 flex flex-col">
        <span className="text-sm font-bold text-dark-navy leading-tight">
          {testimonial.author}
        </span>
        <span className="text-[10px] sm:text-xs text-slate-light font-medium mt-0.5">
          {testimonial.role}
        </span>
        <span className="text-[10px] text-primary font-bold mt-1 uppercase tracking-wide">
          {testimonial.location}
        </span>
      </div>
    </div>
  );
}

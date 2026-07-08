"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BlurText from "./BlurText";

const STRIP_1_TESTIMONIALS = [
  {
    quote: "RISING portable lights have been a bestseller in our dealer network for over 12 years. The quality of the Kisan Torches is unmatched, and our customer retention rate is close to 100%.",
    author: "Rajesh Patel",
    role: "Proprietor, Patel Electricals",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    tag: "Distributor Feedback"
  },
  {
    quote: "Our field security force uses the Defender Metal Flashlights for night patrols. The impact resistance and absolute water protection during heavy rains make them extremely reliable tools.",
    author: "Sandeep Sharma",
    role: "Operations Manager, Securitas India",
    location: "Jaipur, Rajasthan",
    rating: 5,
    tag: "Security Specialist"
  },
  {
    quote: "The battery backup on RISING Kisan Raja is incredible. I use it during late night crop watering and it easily lasts for a couple of days on a single charge. Highly recommend to all fellow farmers.",
    author: "Gurpreet Singh",
    role: "Progressive Agriculturist",
    location: "Ludhiana, Punjab",
    rating: 5,
    tag: "Farming/Field Use"
  },
  {
    quote: "We ordered 500 customized laser-branded Aura Desk Lamps for corporate gifting during Diwali. The executive custom gift boxes were premium, and the response from our clients was overwhelming.",
    author: "Ananya Iyer",
    role: "Senior HR Manager, TechCorp Solutions",
    location: "Bangalore, Karnataka",
    rating: 5,
    tag: "Corporate Gifting"
  }
];

const STRIP_2_TESTIMONIALS = [
  {
    quote: "RISING's distribution support and consistent spare part availability make them the absolute easiest portable lighting brand to work with for bulk retail dealers in North India.",
    author: "Karan Malhotra",
    role: "Managing Director, Malhotra Tradelinks",
    location: "Delhi NCR",
    rating: 5,
    tag: "Distributor Feedback"
  },
  {
    quote: "The hands-free rechargeable LED Headlamps are outstanding. Essential gear for our underground mining teams where head tilt angle and beam focusing are critical for worker safety.",
    author: "Vikram Reddy",
    role: "Mine Supervisor, Singareni Collieries",
    location: "Kothagudem, Telangana",
    rating: 5,
    tag: "Mining Operations"
  },
  {
    quote: "We use the Solar Energy Kits and LED Lanterns for our eco-resort cabins. They provide exceptional warm light, charge fully on solar power, and are extremely durable.",
    author: "Meenakshi Sundaram",
    role: "Owner, Green Meadows Eco Resort",
    location: "Munnar, Kerala",
    rating: 5,
    tag: "Eco Tourism"
  },
  {
    quote: "The industrial emergency wands with magnetic bases have made machinery inspection and panel repairs extremely convenient. It sticks right to the metal cabinets.",
    author: "Amitabh Sen",
    role: "Warehouse Operations Head",
    location: "Kolkata, West Bengal",
    rating: 5,
    tag: "Industrial Safety"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const allTestimonials = [...STRIP_1_TESTIMONIALS, ...STRIP_2_TESTIMONIALS];

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
    <div className={`bg-slate-50/50 border border-slate-100 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-[340px] relative hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-primary/10 transition-all duration-300 select-none shrink-0 ${isMobile ? "w-full" : "w-[300px] sm:w-[380px]"}`}>
      {/* Quote decoration */}
      <span className="text-4xl sm:text-5xl font-serif text-primary/15 absolute left-6 top-16 select-none pointer-events-none">
        “
      </span>

      <div className="space-y-4">
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

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold pl-4">
          {testimonial.quote}
        </p>
      </div>

      {/* Author Details */}
      <div className="pt-4 border-t border-slate-100 flex flex-col">
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

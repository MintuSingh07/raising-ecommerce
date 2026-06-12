"use client";

import { useRef } from "react";

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Card width + gap
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-accent rounded-full"></span>
              <span className="text-xs font-extrabold tracking-widest text-primary uppercase">
                Featured Products
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-navy tracking-tight leading-tight">
              Our Bestselling Solutions
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/10 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Scroller */}
        <div 
          ref={scrollContainerRef}
          className="flex flex-row gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-4 sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth scrollbar-thin"
        >
          {products.map((prod, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-end bg-[#EEF4FC] w-[290px] sm:w-[320px] aspect-[1/1.5] shrink-0 snap-start rounded-2xl border-[5px] border-white shadow-[0_12px_36px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(10,82,214,0.05)] overflow-hidden"
            />
          ))}
        </div>

      </div>
    </section>
  );
}

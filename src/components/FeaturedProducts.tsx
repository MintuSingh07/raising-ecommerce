"use client";

import { useRef } from "react";
import Image from "next/image";

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      category: "Outdoor Series",
      title: "Phoenix Lantern",
      description: "Ultra-bright portable illumination designed for rugged outdoor environments.",
      price: "$149",
      image: "/product_lantern.png"
    },
    {
      id: 2,
      category: "Industrial Series",
      title: "Titan Floodlight",
      description: "Professional high-lumen lighting solution for industrial facilities and yards.",
      price: "$399",
      image: "/product_spotlight.png"
    },
    {
      id: 3,
      category: "Tactical Gear",
      title: "Vanguard Headlamp",
      description: "Ergonomic hands-free lighting with dynamic focus and gesture control.",
      price: "$89",
      image: "/product_headlamp_clean.png"
    },
    {
      id: 4,
      category: "Emergency Systems",
      title: "Aegis Backup Light",
      description: "Automatic backup power source featuring smart failover technology.",
      price: "$249",
      image: "/product_emergency.png"
    },
    {
      id: 5,
      category: "Precision Optics",
      title: "Apex Spotlight",
      description: "Precision long-range beam target searchlight with water resistance.",
      price: "$179",
      image: "/product_spotlight.png"
    },
    {
      id: 6,
      category: "Commercial Lighting",
      title: "Omni Highbay",
      description: "High-efficiency suspended luminaire for commercial warehouses.",
      price: "$329",
      image: "/product_highbay.png"
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 364; // Card width (340) + gap (24)
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-accent rounded-full"></span>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Featured Products
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-dark-navy tracking-tight leading-tight">
              Our Bestselling Solutions
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
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
          className="flex flex-row gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-4 sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {products.map((prod, idx) => (
            <div
              key={idx}
              className="group shrink-0 snap-start w-[300px] sm:w-[340px] bg-white rounded-[32px] p-6 border border-[#F0F0F0] shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top Section: Title & Short Description */}
              <div className="flex flex-col items-start mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                  {prod.title}
                </h3>
                <span className="text-xs sm:text-sm text-[#767676] font-medium mt-1">
                  {prod.category}
                </span>
              </div>

              {/* Bottom Section: Grey Image Placeholder */}
              <div className="relative w-full aspect-square rounded-[24px] bg-[#EBEBEB] overflow-hidden transition-colors duration-300">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 290px, 320px"
                  priority={idx < 3}
                />

                {/* Circular Action Button with Arrow ↗ */}
                <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md transition-all duration-300 group-hover:scale-105 z-10">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

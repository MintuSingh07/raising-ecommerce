"use client";

import { useRef } from "react";
import Link from "next/link";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function VersatileUsage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      title: "Village & Remote",
      desc: "Reliable off-grid lighting for rural homesteads and remote communities.",
      icon: (
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      tag: "Off-Grid",
      href: "/usage/village-remote",
    },
    {
      title: "Corporate Gifting",
      desc: "Premium rechargeable solutions tailored as sophisticated business tokens.",
      icon: (
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect x="3" y="8" width="18" height="13" rx="2" strokeWidth={2} />
          <path
            d="M12 3v18M3 8h18M12 8c0-2.5-1.5-4-3-4s-3 1.5-3 3c0 2 6 3 6 3zm0 0c0-2.5 1.5-4 3-4s3 1.5 3 3c0 2-6 3-6 3z"
            strokeWidth={2}
          />
        </svg>
      ),
      tag: "Corporate",
      href: "/usage/corporate-gifting",
    },
    {
      title: "Defense & Security",
      desc: "High-lumen, rugged tactical systems built for extreme surveillance tasks.",
      icon: (
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      tag: "Tactical",
      href: "/usage/defense-security",
    },
    {
      title: "Farming & Fields",
      desc: "Weatherproof illumination engineered for nocturnal agricultural operations.",
      icon: (
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 21a9.004 9.004 0 008.716-6.747C20.846 9.92 17.525 6 12 6s-8.846 3.92-8.716 8.253A9.004 9.004 0 0012 21z M12 6v15"
          />
        </svg>
      ),
      tag: "Farming",
      href: "/usage/farming-fields",
    },
    {
      title: "Industrial Yards",
      desc: "Heavy-duty lighting designed for warehouses, yards, and loading docks.",
      icon: (
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1zM12 15a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      ),
      tag: "Industrial",
      href: "/usage/industrial-yards",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 404; // Card width (380) + gap (24)
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-15 bg-slate-50/40 border-y border-slate-100/50 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="flex flex-col items-start space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <BlurText text="Versatile Usage" delay={30} animateBy="words" direction="bottom" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-navy tracking-tight leading-tight">
              <BlurText text="Illuminate Every Adventure" delay={20} animateBy="words" direction="bottom" />
            </h2>
            <div className="text-sm sm:text-base text-slate-body leading-relaxed pt-2">
              <BlurText text="Dive into the details and discover how each feature enhances your experience, making your life simpler, smarter, and more extraordinary." delay={10} animateBy="words" direction="bottom" />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <button
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Accordion Panels Grid */}
        <div
          ref={scrollContainerRef}
          className="group/scroller flex flex-row gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-4 sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="flex shrink-0 snap-start"
            >
              <Link
                href={cat.href}
                className="group w-[290px] sm:w-[340px] md:w-[380px] group-hover/scroller:w-[275px] group-hover/scroller:sm:w-[310px] group-hover/scroller:md:w-[340px] hover:!w-[325px] hover:sm:!w-[400px] hover:md:!w-[460px] bg-white border border-[#F0F0F0] rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between overflow-hidden h-[350px]"
              >
                {/* Decorative subtle top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Section: Title, Description & Arrow */}
                <div className="relative z-10 flex items-start justify-between w-full">
                  <div className="flex flex-col items-start pr-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-body leading-relaxed font-normal max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out md:max-w-[85%]">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Circular Action Button */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 shadow-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Section: Category Tag Pill */}
                <div className="relative z-10 flex items-center mt-6 md:mt-0">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100/80 text-[10px] sm:text-xs text-slate-600 font-semibold tracking-wide uppercase select-none transition-colors duration-300 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10">
                    {cat.icon}
                    <span>{cat.tag}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

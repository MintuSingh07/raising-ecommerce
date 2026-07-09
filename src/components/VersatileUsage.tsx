"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BlurText from "./BlurText";
import { motion } from "motion/react";

interface Category {
  _id: string;
  id: string;
  label: string;
  desc?: string;
  image?: string;
  section: string;
}

// Rotating icons for the tag pill — one per card position
const TAG_ICONS = [
  <svg key="house" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  <svg key="brief" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="8" width="18" height="13" rx="2" strokeWidth={2} />
    <path d="M12 3v18M3 8h18M12 8c0-2.5-1.5-4-3-4s-3 1.5-3 3c0 2 6 3 6 3zm0 0c0-2.5 1.5-4 3-4s3 1.5 3 3c0 2-6 3-6 3z" strokeWidth={2} />
  </svg>,
  <svg key="shield" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="leaf" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747C20.846 9.92 17.525 6 12 6s-8.846 3.92-8.716 8.253A9.004 9.004 0 0012 21z M12 6v15" />
  </svg>,
  <svg key="cog" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1zM12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>,
];

export default function VersatileUsage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/categories")
      .then((r) => r.json())
      .then((data: Category[]) => {
        const filtered = Array.isArray(data)
          ? data.filter((c) => c.section === "applications-target-uses")
          : [];
        setCategories(filtered);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 404; // card width (380) + gap (24)
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
              <BlurText
                text="Dive into the details and discover how each feature enhances your experience, making your life simpler, smarter, and more extraordinary."
                delay={10}
                animateBy="words"
                direction="bottom"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start sm:self-center">
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

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="group/scroller flex flex-row gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-4 sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {/* Skeleton placeholders while loading */}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex shrink-0 snap-start w-[290px] sm:w-[340px] md:w-[380px] h-[350px] bg-slate-100 rounded-[28px] animate-pulse"
              />
            ))}

          {/* Live category cards */}
          {!loading &&
            categories.map((cat, idx) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="flex shrink-0 snap-start"
              >
                <Link
                  href={`/collections/${cat.id}`}
                  className="group relative w-[290px] sm:w-[340px] md:w-[380px] group-hover/scroller:w-[275px] group-hover/scroller:sm:w-[310px] group-hover/scroller:md:w-[340px] hover:!w-[325px] hover:sm:!w-[400px] hover:md:!w-[460px] bg-white border border-[#F0F0F0] rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.10)] hover:border-primary/20 transition-all duration-500 ease-out cursor-pointer flex flex-col overflow-hidden h-[380px]"
                >
                  {/* ── Image panel (top 55%) ── */}
                  <div className="relative w-full h-[210px] flex-shrink-0 overflow-hidden bg-slate-100">
                    {cat.image ? (
                      <>
                        <Image
                          src={cat.image}
                          alt={cat.label}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 290px, (max-width: 1024px) 340px, 460px"
                        />
                        {/* Soft vignette at the bottom so it blends into the white text panel */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      /* Placeholder when no image */
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          {TAG_ICONS[idx % TAG_ICONS.length]}
                        </div>
                      </div>
                    )}

                    {/* Top-right: arrow badge (appears on hover) */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:border-primary transition-all duration-400">
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* ── Text panel (bottom) ── */}
                  <div className="flex flex-col flex-1 justify-between px-6 py-5 bg-white">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-dark-navy group-hover:text-primary transition-colors duration-300 tracking-tight leading-snug">
                        {cat.label}
                      </h3>
                      {cat.desc && (
                        <p className="mt-1.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {cat.desc}
                        </p>
                      )}
                    </div>

                    {/* Tag pill */}
                    <div className="flex items-center pt-3 border-t border-slate-100 mt-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] text-slate-600 font-semibold tracking-wide uppercase select-none transition-colors duration-300 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20">
                        {TAG_ICONS[idx % TAG_ICONS.length]}
                        <span>{cat.label.split(" ")[0]}</span>
                      </div>
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

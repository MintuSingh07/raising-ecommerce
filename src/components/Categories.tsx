"use client";

import Image from "next/image";
import Link from "next/link";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function Categories() {
  const categories = [
    {
      title: "LED Torches",
      subtitle: "High-power portable beams",
      image: "/product_torch.png",
      href: "/collections/torches",
    },
    {
      title: "Spotlights",
      subtitle: "Precision long-range lighting",
      image: "/product_spotlight.png",
      href: "/collections/spotlights",
    },
    {
      title: "Emergency Lights",
      subtitle: "Automatic backup illumination",
      image: "/product_emergency.png",
      href: "/collections/emergency-lights",
    },
    {
      title: "Rechargeable Products",
      subtitle: "Eco-friendly energy solutions",
      image: "/product_lantern.png",
      href: "/collections/rechargeable",
    },
    {
      title: "Industrial Solutions",
      subtitle: "Heavy-duty commercial systems",
      image: "/product_highbay.png",
      href: "/collections/industrial",
    },
  ];

  return (
    <section id="collections" className="py-20 bg-slate-50/40 border-y border-slate-100/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <BlurText text="Our Product Collections" delay={30} animateBy="words" direction="bottom" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-navy tracking-tight leading-tight">
              <BlurText text="Solutions That Light Every Need" highlightWords={["Light"]} delay={20} animateBy="words" direction="bottom" />
            </h2>
          </div>
          <Link
            href="#catalog"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-navy group transition-colors"
          >
            View Collection
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="w-full flex"
            >
              <Link
                href={cat.href}
                className="group flex flex-col justify-between w-full bg-white rounded-[28px] p-4 border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top Section: Clean light grey container for the product image */}
                <div className="relative w-full aspect-square rounded-[20px] bg-[#F8F9FA] border border-slate-100/60 overflow-hidden transition-colors duration-300 group-hover:bg-[#F3F4F6]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>

                {/* Bottom Section: Category Text & Explore Link */}
                <div className="flex flex-col mt-4 w-full px-1">
                  <h3 className="text-base font-semibold text-[#111111] tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#767676] font-medium mt-1.5 leading-snug">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-primary">
                    <span>Explore</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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

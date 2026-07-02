"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -700 : 700, behavior: "smooth" });
  };

  const categories = [
    {
      title: "Rechargeable LED Flash Light",
      subtitle: "High-efficiency beam flashlights",
      image: "/product_torch.png",
      href: "/collections/rechargeable-led-flashlight",
    },
    {
      title: "Kisan Torch",
      subtitle: "Heavy-duty torch for farming & outdoors",
      image: "/product_torch.png",
      href: "/collections/kisan-torch",
    },
    {
      title: "Metal Flash Lights",
      subtitle: "Rugged metal-body searchlights",
      image: "/product_torch.png",
      href: "/collections/metal-flashlights",
    },
    {
      title: "LED Headlamp",
      subtitle: "Hands-free adjustable headlamps",
      image: "/product_headlamp.png",
      href: "/collections/led-headlamp",
    },
    {
      title: "LED Table Lamp",
      subtitle: "Flexible desk and reading lamps",
      image: "/product_lantern.png",
      href: "/collections/led-table-lamp",
    },
    {
      title: "Solar Lantern and Search Light",
      subtitle: "Dual-purpose solar rechargeable lights",
      image: "/product_spotlight.png",
      href: "/collections/solar-lantern-searchlight",
    },
    {
      title: "LED Lantern",
      subtitle: "Premium emergency backup lanterns",
      image: "/product_lantern.png",
      href: "/collections/led-lantern",
    },
    {
      title: "LED USB Lamp",
      subtitle: "Portable USB plug-and-play bulbs",
      image: "/product_lantern.png",
      href: "/collections/led-usb-lamp",
    },
    {
      title: "Solar Energy Kit",
      subtitle: "Complete solar home lighting solution",
      image: "/product_emergency.png",
      href: "/collections/solar-energy-kit",
    },
    {
      title: "Power Extension Board",
      subtitle: "Multi-socket surge-protected boards",
      image: "/product_emergency.png",
      href: "/collections/power-extension-board",
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

          {/* Arrow buttons + View Collection link */}
          <div className="flex items-center gap-3">
            {/* Left arrow */}
            <button
              id="categories-scroll-left"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white shadow-sm text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Right arrow */}
            <button
              id="categories-scroll-right"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white shadow-sm text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <Link
              href="/products"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-navy group transition-colors ml-1"
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
        </div>

        {/* Categories Horizontal Scroll Strip */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-12 z-10 bg-gradient-to-r from-slate-50/80 to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 z-10 bg-gradient-to-l from-slate-50/80 to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: "easeOut" }}
                className="flex-none w-[220px] flex"
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col w-full h-full bg-white rounded-[28px] p-4 border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Product image */}
                  <div className="relative w-full aspect-square rounded-[20px] bg-[#F8F9FA] border border-slate-100/60 overflow-hidden transition-colors duration-300 group-hover:bg-[#F3F4F6]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="220px"
                    />
                  </div>

                  {/* Category Text & Explore Link */}
                  <div className="flex flex-col flex-1 mt-4 w-full px-1">
                    <h3 className="text-sm font-semibold text-[#111111] tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#767676] font-medium mt-1.5 leading-snug">
                      {cat.subtitle}
                    </p>
                    <div className="flex items-center gap-1 mt-auto pt-4 text-xs font-semibold text-primary">
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

      </div>
    </section>
  );
}

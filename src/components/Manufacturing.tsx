"use client";

import Image from "next/image";
import Link from "next/link";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function Manufacturing() {
  const points = [
    {
      title: "Precision Engineering",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: "Advanced Machinery",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Quality Control",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Skilled Workforce",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="manufacturing" className="py-14 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <BlurText text="Built With Precision" delay={30} animateBy="words" direction="bottom" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-navy tracking-tight leading-tight">
              <BlurText text="Advanced Manufacturing. Engineered for Excellence." highlightWords={["Excellence."]} delay={20} animateBy="words" direction="bottom" />
            </h2>

            {/* Description */}
            <div className="text-base text-slate-body leading-relaxed max-w-xl">
              <BlurText text="State-of-the-art manufacturing facility with advanced technology and stringent quality control to deliver world-class lighting solutions. We prioritize reliability at every stage of the production line." delay={10} animateBy="words" direction="bottom" />
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
              {points.map((pt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-35px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/50"
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-100 text-primary shadow-sm">
                    {pt.icon}
                  </div>
                  <span className="text-sm font-semibold text-dark-navy">{pt.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Call to action */}
            <div className="pt-6">
              <Link
                href="#manufacturing-details"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-semibold text-primary border border-slate-200 bg-white transition-all duration-300 hover:border-primary/30 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Our Manufacturing
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[480px]"
          >
            {/* Custom shaped background drop shadow offset */}
            <div className="absolute inset-0 bg-primary/[0.04] translate-x-3 translate-y-3 pointer-events-none" style={{ clipPath: "url(#custom-diagonal)" }} />
            
            <div className="relative w-full h-full overflow-hidden shadow-premium" style={{ clipPath: "url(#custom-diagonal)" }}>
              <Image
                src="/about_manufacturing.png"
                alt="RISING State of the Art Manufacturing Facility"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Responsive custom SVG clip-path definition */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="custom-diagonal" clipPathUnits="objectBoundingBox">
            <path d="M 0.2,0 L 0.95,0 Q 1,0 1,0.05 L 1,0.95 Q 1,1 0.95,1 L 0.05,1 Q 0,1 0,0.95 C 0.02,0.8 0.05,0.5 0.1,0.2 C 0.12,0.1 0.15,0.02 0.2,0 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}

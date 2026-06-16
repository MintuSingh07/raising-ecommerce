"use client";

import Image from "next/image";
import Link from "next/link";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function CtaBanner() {
  return (
    <section id="distributor" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-navy via-primary to-blue-800 text-white shadow-card"
        >
          {/* Subtle overlay shine */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-[length:250px_250px] opacity-20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px]">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center items-start space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-xs sm:text-sm font-medium uppercase tracking-wider text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <BlurText text="Looking for Bulk Supply?" delay={30} animateBy="words" direction="bottom" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white">
                <BlurText text="Partner With RISING" highlightWords={["RISING"]} highlightClass="text-accent" delay={20} animateBy="words" direction="bottom" />
              </h2>
              
              <div className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-lg">
                <BlurText text="Join our growing network of distributors and business partners across India and build a brighter, more reliable future together. Get premium access to catalogs and priority shipping." delay={10} animateBy="words" direction="bottom" />
              </div>
              
              <div className="flex flex-wrap gap-4 w-full sm:w-auto pt-4">
                <Link
                  href="#distributor-form"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-semibold bg-accent text-dark-navy transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  Become a Distributor
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                <Link
                  href="#contact-sales"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-semibold bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Sales Team
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column Image */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 relative w-full min-h-[300px] lg:min-h-full overflow-hidden select-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary-navy via-transparent to-transparent z-10 pointer-events-none" />
              <Image
                src="/b2b_logistics.png"
                alt="RISING Logistics and Supply Chain"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

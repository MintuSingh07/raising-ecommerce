"use client";

import Link from "next/link";
import CountUp from "./CountUp";
import BlurText from "./BlurText";
import { motion } from "motion/react";

export default function AboutUs() {
  const values = [
    {
      num: "01",
      title: "Customer Satisfaction",
      desc: "Deliver unmatched service and reliability.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Innovation",
      desc: "Invest in cutting-edge technology.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Sustainability",
      desc: "Promote eco-friendly practices.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 3c6 0 9 4 9 10a9 9 0 0 1-9 9M12 3c-6 0-9 4-9 10a9 9 0 0 0 9 9M12 9c2 1 3 3 3 5m-6-3c-2 1-3 3-3 5" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Quality",
      desc: "Maintain rigorous quality control.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "Growth",
      desc: "Expand market presence globally.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Brand Story & Introduction */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <BlurText text="Introducing Rising" delay={30} animateBy="words" direction="bottom" />
            </div>

            {/* Headline statement */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-navy tracking-tight leading-tight">
              <BlurText text="Transform your lighting experience with RISING." highlightWords={["RISING."]} delay={20} animateBy="words" direction="bottom" />
            </h2>

            {/* Highlighted key phrase */}
            <div className="text-base sm:text-lg text-primary font-medium leading-relaxed">
              <BlurText text="India’s foremost manufacturer of superior portable lighting solutions." delay={20} animateBy="words" direction="bottom" />
            </div>

            {/* Structured Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-body leading-relaxed">
              <div>
                <BlurText text="Driven by our passion for quality and groundbreaking designs, we develop innovative, high-performance LED products. Explore our energy-saving, environmentally conscious options engineered for unmatched efficiency and longevity." delay={10} animateBy="words" direction="bottom" />
              </div>
              <div className="font-semibold text-dark-navy">
                <BlurText text="Choose RISING and experience the brilliance of a leading-edge portable lighting manufacturer." delay={15} animateBy="words" direction="bottom" />
              </div>
            </div>

            {/* Read More link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary-navy group transition-colors cursor-pointer"
              >
                <span>Read More</span>
                <svg
                  className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
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
              </Link>
            </div>

            {/* Trusted by Clients Badge */}
            <div className="pt-6 border-t border-slate-100 w-full flex flex-col items-start">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_1.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_2.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_3.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                  <img
                    src="/avatar_indian_4.png"
                    alt="Happy Client"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-sm">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">
                    <CountUp from={0} to={2} duration={2} />M+
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">
                    Happy buyers
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">
                    <CountUp from={0} to={25} duration={2} />K+
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">
                    Client review
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-semibold text-dark-navy leading-none">
                    4.8
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-light mt-1 font-medium">
                    Positive Rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Core Values Numbered List */}
          <div className="lg:col-span-6 w-full">
            <div className="flex flex-col space-y-6 w-full lg:pl-8">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="flex gap-5 sm:gap-6 pb-6 border-b border-slate-100 last:border-0 group transition-all duration-300 items-start"
                >
                  {/* Number index */}
                  <span className="text-xl sm:text-2xl font-semibold text-primary/30 group-hover:text-primary transition-colors duration-300 min-w-[28px] mt-1.5 flex-shrink-0">
                    {val.num}
                  </span>

                  {/* Icon & Text Group */}
                  <div className="flex gap-3.5 items-start flex-grow">
                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-primary/[0.04] text-primary border border-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary mt-0.5">
                      {val.icon}
                    </div>

                    {/* Text block */}
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg font-semibold text-dark-navy group-hover:text-primary transition-colors duration-300">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-body mt-1 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

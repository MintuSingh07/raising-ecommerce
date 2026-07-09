"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlurText from "@/components/BlurText";
import { Home, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
            <Link href="/" className="hover:text-primary transition-colors uppercase flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <span className="text-primary uppercase font-bold">About Us</span>
          </nav>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-[36px] text-white p-8 sm:p-12 md:p-16 mb-16 shadow-premium border border-white/5 flex flex-col items-start gap-4">
            <Image
              src="/about-us-banner-1920x550-1.png"
              alt="About Us Banner"
              fill
              priority
              className="object-cover"
            />
            {/* Subtle bottom scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
                About Us
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight italic uppercase">
                <BlurText text="About Rising" delay={20} animateBy="words" direction="bottom" />
              </h1>
              
              <p className="text-sm sm:text-base text-blue-50/80 leading-relaxed font-medium">
                <BlurText text="Welcome to Wonder Appliances, your premier source for high-performance home solutions. Dedicated to quality and innovative designs, we offer appliances that meet the diverse needs of modern households." delay={10} animateBy="words" direction="bottom" />
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
            {/* Left Side Header */}
            <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-24">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block">
                Who We Are?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-navy tracking-tight leading-tight italic uppercase">
                <BlurText text="Our Story of Brilliance" highlightWords={["Brilliance"]} delay={20} animateBy="words" direction="bottom" />
              </h2>
              {/* Decorative electric line */}
              <div className="w-12 h-1 bg-primary rounded-full mt-4" />
            </div>

            {/* Right Side Copy */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-body leading-relaxed font-medium">
              <p>
                The RISING brand story is one of perseverance, dedication, and a relentless pursuit of excellence. With more than 35 years of industry experience, we have grown from a small enterprise to a leading portable lighting manufacturer in India. This journey has been fueled by our unwavering focus on customer satisfaction, cutting-edge research and development, and a passion for creating eco-friendly, energy-efficient products that stand the test of time.
              </p>
              <p>
                At Wonder Appliances, we take pride in our advanced manufacturing process, utilizing state-of-the-art facilities and a skilled workforce to create exceptional portable lighting solutions. Our commitment to innovation and continuous improvement ensures that our products are developed with the latest technology and industry trends in mind, providing the best possible experience for our customers.
              </p>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {/* Mission Card */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.04] border border-primary/10 flex items-center justify-center text-primary">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M8 7h8v3c0 2.2-1.8 4-4 4s-4-1.8-4-4V7zm0 7v3a2 2 0 002 2h4a2 2 0 002-2v-3H8zM12 21v.01" />
                </svg>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Mission</span>
                <h3 className="text-lg sm:text-xl font-bold text-dark-navy tracking-tight">
                  Lighting Up Lives with Innovation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-body leading-relaxed font-medium">
                Our mission is to transform everyday living with innovative, high-quality, and sustainable home solutions. We are dedicated to providing cutting-edge appliances that not only meet the diverse needs of our customers but also enhance their quality of life through superior performance and reliability.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.04] border border-primary/10 flex items-center justify-center text-primary">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Vision</span>
                <h3 className="text-lg sm:text-xl font-bold text-dark-navy tracking-tight">
                  Leading the Future of Home Solutions
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-body leading-relaxed font-medium">
                Our vision is to be a global leader in the home solutions industry, recognized for our commitment to innovation, sustainability, and customer satisfaction. We aim to create a future where advanced technology and eco-friendly practices come together to improve the lives of people around the world.
              </p>
            </div>
          </div>

          {/* Innovation & Infrastructure Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            {/* Left Side: Image */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-square bg-slate-100 rounded-[32px] overflow-hidden border border-slate-150 shadow-md">
              <Image
                src="/Rectangle-2651.png"
                alt="Infrastructure & R&D Machine"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side: Header and Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block">
                  Innovation & Infrastructure
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-navy tracking-tight leading-tight italic uppercase">
                  Pioneering Tomorrow
                </h2>
                <p className="text-sm text-slate-body leading-relaxed font-medium">
                  At the forefront of technological advancement, our Innovation & R&D division is dedicated to crafting cutting-edge solutions that redefine industry standards. We are proud of having one of the best facilities in the country starting from the product design till the manufacturing stage.
                </p>
              </div>

              {/* 14-item Grid Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {[
                  "Well equipped R&D Lab",
                  "3D CAD Work Station",
                  "Modern tool room for plastic moulds & sheet metal dies.",
                  "Fully Automatic plastic injection moulding machines",
                  "Power presses with auto feeding mechanism",
                  "Automatic battery testing machine",
                  "Thermoforming & blister sealing machine",
                  "Vaccum meatalising plant",
                  "Assembly Lines",
                  "Terminal spot welding machine",
                  "SMD Placement machine (JUKI JX-100 LED)",
                  "Semi-Automatic Screen Printer",
                  "Laser Marking machine",
                  "Wave Soldering Machine"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 fill-accent/[0.08]" />
                    <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Album Section */}
          <div className="space-y-10 mb-16">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block">
                Company Album
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-navy tracking-tight leading-tight italic uppercase">
                Our Journey in Pictures
              </h2>
              <p className="text-xs sm:text-sm text-slate-body leading-relaxed font-medium">
                Step into our vibrant world through a captivating visual journey that showcases our milestones, achievements, and the people behind our success. From groundbreaking innovations to memorable moments, our company album captures the essence of who we are and the incredible path we&apos;ve traveled.
              </p>
            </div>

            {/* 2x4 Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: "/smt-pick-n-place.jpeg", alt: "SMT Pick & Place Machine" },
                { src: "/modi-5028.jpg", alt: "Factory Infrastructure & Testing (MODI 5028)" },
                { src: "/rect-3131.png", alt: "R&D Machine Infrastructure" },
                { src: "/assembly-lines.jpg", alt: "Assembly Lines" },
                { src: "/vacuum-metalizing.jpg", alt: "Vacuum Metalizing Plant" },
                { src: "/wave-soldering.jpeg", alt: "Wave Soldering Machine" },
                { src: "/injection-molding.jpg", alt: "Fully Automatic Plastic Injection Moulding Machine" },
                { src: "/modi-5038.jpg", alt: "Production and Assembly Line (MODI 5038)" }
              ].map((img, idx) => (
                <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 select-none cursor-zoom-in">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 300px"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

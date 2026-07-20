"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BannerSlide {
  id: number;
  type: "desktop" | "mobile";
  image: string;
}

interface BannerData {
  desktop: BannerSlide[];
  mobile: BannerSlide[];
}



// Individual carousel for one device type
function BannerCarousel({ slides, onClick }: { slides: BannerSlide[]; onClick?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const safeIndex = slides.length === 0 ? 0 : currentIndex % slides.length;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play
  useEffect(() => {
    if (isDragging || slides.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [isDragging, slides.length, goNext]);

  // Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (slides.length <= 1) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startX);
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -70) goNext();
    else if (dragOffset > 70) goPrev();
    setDragOffset(0);
  };

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (slides.length <= 1) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragOffset(e.clientX - startX);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -70) goNext();
    else if (dragOffset > 70) goPrev();
    setDragOffset(0);
  };

  // Fire onClick only when the user taps/clicks without dragging
  const handleClick = () => {
    if (Math.abs(dragOffset) < 5) {
      onClick?.();
    }
  };

  if (slides.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden select-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      {/* Sliding track */}
      <div
        className="flex h-full"
        style={{
          width: `${slides.length * 100}%`,
          transform: isDragging
            ? `translateX(calc(-${safeIndex * (100 / slides.length)}% + ${dragOffset / slides.length}px))`
            : `translateX(-${safeIndex * (100 / slides.length)}%)`,
          transition: isDragging ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.type}-${slide.id}`}
            className="relative h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            <Image
              src={slide.image}
              alt={`RISING Banner ${index + 1}`}
              fill
              className="object-cover pointer-events-none select-none"
              sizes="100vw"
              priority={index === 0}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Left / Right arrows */}
      {slides.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous slide"
            className="
              absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12
              flex items-center justify-center rounded-full
              bg-white/20 backdrop-blur-sm border border-white/30
              text-white shadow-lg
              opacity-60 hover:opacity-100
              transition-all duration-200 hover:scale-110 hover:bg-white/30
              focus:outline-none
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next slide"
            className="
              absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 sm:w-12 sm:h-12
              flex items-center justify-center rounded-full
              bg-white/20 backdrop-blur-sm border border-white/30
              text-white shadow-lg
              opacity-60 hover:opacity-100
              transition-all duration-200 hover:scale-110 hover:bg-white/30
              focus:outline-none
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                safeIndex === index ? "w-12 bg-primary" : "w-6 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [desktopSlides, setDesktopSlides] = useState<BannerSlide[]>([]);
  const [mobileSlides, setMobileSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBanners() {
      try {
        const res = await fetch("/api/public/banners");
        if (!res.ok) return;
        const data: BannerData = await res.json();

        if (data.desktop && data.desktop.length > 0) {
          setDesktopSlides(data.desktop);
        }
        // If no mobile banners uploaded, use desktop banners on mobile too
        if (data.mobile && data.mobile.length > 0) {
          setMobileSlides(data.mobile);
        } else if (data.desktop && data.desktop.length > 0) {
          setMobileSlides(data.desktop.map(s => ({ ...s, type: "mobile" as const })));
        }
      } catch (err) {
        console.error("Error loading banners:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBanners();
  }, []);

  // While fetching show a subtle skeleton
  if (loading) {
    return (
      <section
        id="home"
        className="scroll-mt-20 relative overflow-hidden w-full h-[60dvh] sm:h-[100dvh] min-h-[400px] sm:min-h-[500px] bg-slate-100 animate-pulse"
      />
    );
  }

  return (
    <section
      id="home"
      className="scroll-mt-20 relative overflow-hidden w-full h-[60dvh] sm:h-[100dvh] min-h-[400px] sm:min-h-[500px] bg-white"
    >
      {/* Ambient lights */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vh] bg-[radial-gradient(circle_at_80%_20%,rgba(10,82,214,0.05),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[70vw] h-[70vh] bg-[radial-gradient(circle_at_20%_80%,rgba(255,184,0,0.04),transparent_70%)] pointer-events-none z-0" />

      {/* Desktop carousel — hidden on mobile */}
      <div className="hidden sm:block absolute inset-0 z-10">
        <BannerCarousel
          slides={desktopSlides}
          onClick={() => router.push("/products")}
        />
      </div>

      {/* Mobile carousel — hidden on desktop */}
      <div className="block sm:hidden absolute inset-0 z-10">
        <BannerCarousel
          slides={mobileSlides}
          onClick={() => router.push("/products")}
        />
      </div>

      {/* Scroll Down indicator */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center pointer-events-none select-none">
        <span className="text-[9px] tracking-[0.5em] text-slate-400 font-semibold uppercase rotate-90 origin-center whitespace-nowrap mb-14 translate-x-0.5">
          SCROLL DOWN
        </span>
        <svg className="w-3.5 h-3.5 text-slate-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}

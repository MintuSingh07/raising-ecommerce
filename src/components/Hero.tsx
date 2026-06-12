"use client";

import React, { useState, useEffect } from "react";

const slides = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Auto-play slides (paused when dragging)
  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isDragging, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 70;
    if (dragOffset < -threshold) {
      // Swipe Left -> Next Slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    } else if (dragOffset > threshold) {
      // Swipe Right -> Prev Slide
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }
    setDragOffset(0);
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent text/image selection dragging
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 70;
    if (dragOffset < -threshold) {
      // Drag Left -> Next Slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    } else if (dragOffset > threshold) {
      // Drag Right -> Prev Slide
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <section 
      className={`relative overflow-hidden w-full h-screen h-[100dvh] min-h-[500px] bg-white select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fixed Subtle Ambient Lights (Blue & Yellow) */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vh] bg-[radial-gradient(circle_at_80%_20%,rgba(10,82,214,0.05),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[70vw] h-[70vh] bg-[radial-gradient(circle_at_20%_80%,rgba(255,184,0,0.04),transparent_70%)] pointer-events-none z-0" />

      {/* Sliding Track Container */}
      <div 
        className="flex h-full w-full relative z-10"
        style={{ 
          transform: isDragging 
            ? `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`
            : `translateX(-${currentIndex * 100}%)`,
          transition: isDragging ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {slides.map((slide, index) => {
          return (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 bg-transparent overflow-hidden"
            >
              {/* Aesthetic Large Number in Bottom Left Corner - Bleeding out of screen */}
              <div 
                className="absolute left-[-2vw] bottom-[-2vw] sm:left-[-3vw] sm:bottom-[-3vw] font-medium font-display text-[40vw] sm:text-[32vw] md:text-[28vw] lg:text-[24vw] leading-none text-slate-900/15 tracking-tighter select-none"
              >
                0{index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Scroll Down Indicator (Left Side, from reference image) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center pointer-events-none select-none">
        <span className="text-[9px] tracking-[0.5em] text-slate-400 font-semibold uppercase rotate-90 origin-center whitespace-nowrap mb-14 translate-x-0.5">
          SCROLL DOWN
        </span>
        <svg className="w-3.5 h-3.5 text-slate-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>

      {/* Bottom Slider Indicators - Flat bars, not circles */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 cursor-pointer ${
              currentIndex === index 
                ? "w-12 bg-primary" 
                : "w-6 bg-slate-350 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

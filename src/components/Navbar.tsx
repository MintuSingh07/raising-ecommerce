"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8">
      {/* Liquid Glass Container */}
      <div className="max-w-7xl mx-auto relative overflow-hidden bg-white/35 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(10,82,214,0.06)] rounded-3xl sm:rounded-full px-6 sm:px-8 h-16 flex justify-between items-center transition-all duration-300">
        {/* Glass reflection highlight */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="relative w-10 h-10 rounded-full bg-primary/95 flex items-center justify-center shadow-md shadow-primary/10 border border-white/25 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-accent fill-accent"
            >
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-wider text-dark-navy flex items-baseline">
            RISING
            <span className="text-[10px] font-bold text-slate-400 ml-0.5 leading-none">®</span>
          </span>
        </Link>

        {/* Desktop Navigation - Glass Pills */}
        <nav className="hidden md:flex space-x-1 lg:space-x-3 text-xs lg:text-sm font-bold text-slate-800">
          <Link 
            href="/" 
            className="text-primary px-4 py-2 rounded-full bg-white/55 border border-white/50 shadow-[0_2px_8px_rgba(10,82,214,0.05)] transition-all duration-300"
          >
            Home
          </Link>
          <div className="relative group cursor-pointer text-slate-800 hover:text-primary px-4 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300 flex items-center gap-1">
            Products
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="relative group cursor-pointer text-slate-800 hover:text-primary px-4 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300 flex items-center gap-1">
            Solutions
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Link 
            href="#about" 
            className="text-slate-800 hover:text-primary px-4 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300"
          >
            About Us
          </Link>
          <div className="relative group cursor-pointer text-slate-800 hover:text-primary px-4 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300 flex items-center gap-1">
            Resources
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Link 
            href="#contact" 
            className="text-slate-800 hover:text-primary px-4 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300"
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center relative z-10">
          <Link
            href="#distributor"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white border border-white/20 shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-navy hover:shadow-primary/35 active:scale-95"
          >
            Become a Distributor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden relative z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-800 bg-white/20 hover:bg-white/40 border border-white/30 cursor-pointer focus:outline-none transition-all duration-300"
            aria-label="Open menu"
          >
            {isOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Liquid Glass dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-7xl p-5 bg-white/35 backdrop-blur-xl border border-white/45 rounded-3xl space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] animate-fadeIn relative z-40">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-2xl text-base font-bold text-primary bg-white/50 border border-white/40"
          >
            Home
          </Link>
          <div className="px-4 py-2.5 text-base font-bold text-slate-800 hover:text-primary cursor-pointer hover:bg-white/40 border border-transparent hover:border-white/30 rounded-2xl transition-all duration-300">
            Products
          </div>
          <div className="px-4 py-2.5 text-base font-bold text-slate-800 hover:text-primary cursor-pointer hover:bg-white/40 border border-transparent hover:border-white/30 rounded-2xl transition-all duration-300">
            Solutions
          </div>
          <Link
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-base font-bold text-slate-800 hover:text-primary hover:bg-white/40 border border-transparent hover:border-white/30 rounded-2xl transition-all duration-300"
          >
            About Us
          </Link>
          <div className="px-4 py-2.5 text-base font-bold text-slate-800 hover:text-primary cursor-pointer hover:bg-white/40 border border-transparent hover:border-white/30 rounded-2xl transition-all duration-300">
            Resources
          </div>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-base font-bold text-slate-800 hover:text-primary hover:bg-white/40 border border-transparent hover:border-white/30 rounded-2xl transition-all duration-300"
          >
            Contact Us
          </Link>
          <div className="pt-3">
            <Link
              href="#distributor"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-3.5 rounded-full text-sm font-bold bg-primary text-white border border-white/20 shadow-lg shadow-primary/20 hover:bg-primary-navy transition-all duration-300"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

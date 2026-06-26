"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Collections", href: "/#collections" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Best Selling", href: "/#bestselling" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 w-full px-3 sm:px-6 lg:px-8">
      {/* Liquid Glass Container */}
      <div className="max-w-7xl mx-auto relative overflow-hidden bg-white/35 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(10,82,214,0.06)] rounded-2xl sm:rounded-full px-4 sm:px-8 h-12 sm:h-16 flex justify-between items-center transition-all duration-300">
        {/* Glass reflection highlight */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center group relative z-10">
          <div className="relative h-[38px] w-[83px] sm:h-[48px] sm:w-[105px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="RISING Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Glass Pills */}
        <nav className="hidden md:flex space-x-1 lg:space-x-2 text-xs lg:text-sm font-semibold text-slate-800">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-slate-800 hover:text-primary px-3.5 py-2 rounded-full hover:bg-white/45 border border-transparent hover:border-white/35 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center relative z-10">
          <Link
            href="/distributor"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold bg-primary text-white border border-white/20 shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-navy hover:shadow-primary/35 active:scale-95"
          >
            Become a Distributor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden relative z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-800 bg-white/20 hover:bg-white/40 border border-white/30 cursor-pointer focus:outline-none transition-all duration-300"
            aria-label="Open menu"
          >
            {isOpen ? (
              <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Liquid Glass dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl p-4 bg-white/35 backdrop-blur-xl border border-white/45 rounded-2xl space-y-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] animate-fadeIn pointer-events-auto relative z-40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:text-primary hover:bg-white/40 border border-transparent hover:border-white/30 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/distributor"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-full text-xs font-semibold bg-primary text-white border border-white/20 shadow-lg shadow-primary/20 hover:bg-primary-navy transition-all duration-300"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

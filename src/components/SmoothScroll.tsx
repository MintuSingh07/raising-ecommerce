"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Animation frame hook
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept click on hash links for smooth scroll using Lenis
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href) return;
      
      try {
        // Resolve URL relative to current location
        const url = new URL(href, window.location.href);
        
        // If the path and hostname match the current page, and there is a hash
        if (
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash
        ) {
          const elementId = url.hash.substring(1);
          const element = document.getElementById(elementId);
          
          if (element) {
            e.preventDefault();
            // Scroll to target element
            lenis.scrollTo(element, {
              offset: -80, // Offset for fixed navbar
              duration: 1.2,
            });
          }
        }
      } catch (err) {
        // Fallback for invalid URLs or absolute external links
      }
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== "undefined") {
        (window as any).lenis = null;
      }
      document.removeEventListener("click", handleHashClick);
    };
  }, []);

  return <>{children}</>;
}

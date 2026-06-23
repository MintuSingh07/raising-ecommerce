"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import BlurText from "./BlurText";
import { motion } from "motion/react";
import productData from "../../public/products_structured.json";
import { type Product } from "./ProductCatalog";

interface FeaturedProductsProps {
  setSelectedProduct?: (product: Product) => void;
}

export default function FeaturedProducts({ setSelectedProduct }: FeaturedProductsProps = {}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestsellingProducts = useMemo(() => {
    const allProducts = productData.products as Product[];
    const items = [
      {
        mockTitle: "Phoenix Lantern",
        defaultCategory: "Outdoor Series",
        defaultTitle: "Comet",
        defaultDesc: "Ultra-bright portable illumination designed for rugged outdoor environments.",
        findFn: (p: Product) => p.name === "Comet" || p.categories.some(c => c.toLowerCase().includes("lantern"))
      },
      {
        mockTitle: "Titan Floodlight",
        defaultCategory: "Industrial Series",
        defaultTitle: "Tri Color Metal Torch",
        defaultDesc: "Professional high-lumen lighting solution for industrial facilities and yards.",
        findFn: (p: Product) => p.name === "Tri Color Metal Torch" || p.categories.some(c => c.toLowerCase().includes("spotlight"))
      },
      {
        mockTitle: "Vanguard Headlamp",
        defaultCategory: "Tactical Gear",
        defaultTitle: "Falcon",
        defaultDesc: "Ergonomic hands-free lighting with dynamic focus and gesture control.",
        findFn: (p: Product) => p.name === "Falcon" || p.categories.some(c => c.toLowerCase().includes("headlamp"))
      },
      {
        mockTitle: "Aegis Backup Light",
        defaultCategory: "Emergency Systems",
        defaultTitle: "Jyoti",
        defaultDesc: "Automatic backup power source featuring smart failover technology.",
        findFn: (p: Product) => p.name === "Jyoti" || p.categories.some(c => c.toLowerCase().includes("solar") || c.toLowerCase().includes("emergency"))
      },
      {
        mockTitle: "Apex Spotlight",
        defaultCategory: "Precision Optics",
        defaultTitle: "Omni",
        defaultDesc: "Precision long-range beam target searchlight with water resistance.",
        findFn: (p: Product) => p.name === "Omni" || p.categories.some(c => c.toLowerCase().includes("searchlight"))
      },
      {
        mockTitle: "Omni Highbay",
        defaultCategory: "Commercial Lighting",
        defaultTitle: "Toofan",
        defaultDesc: "High-efficiency suspended luminaire for commercial warehouses.",
        findFn: (p: Product) => p.categories.some(c => c.toLowerCase().includes("industrial"))
      }
    ];

    return items.map((item) => {
      const matched = allProducts.find(item.findFn);
      const product = matched || allProducts[0];
      
      return {
        id: product ? product.id : Math.random(),
        category: product ? (product.categories[0] || item.defaultCategory) : item.defaultCategory,
        title: product ? product.name : item.defaultTitle,
        description: item.defaultDesc,
        image: product && product.media?.images?.[0] ? product.media.images[0] : "/product_lantern.png",
        rawProduct: product
      };
    });
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 364; // Card width (340) + gap (24)
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="bestselling" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <BlurText text="Featured Products" delay={30} animateBy="words" direction="bottom" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-navy tracking-tight leading-tight">
              <BlurText text="Our Bestselling Solutions" highlightWords={["Bestselling"]} delay={20} animateBy="words" direction="bottom" />
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Scroller */}
        <div 
          ref={scrollContainerRef}
          className="flex flex-row gap-6 overflow-x-auto pb-8 pt-4 px-2 -mx-4 sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
        >
          {bestsellingProducts.map((prod, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              onClick={() => {
                if (prod.rawProduct) {
                  setSelectedProduct?.(prod.rawProduct);
                }
              }}
              className="group shrink-0 snap-start w-[300px] sm:w-[340px] bg-white rounded-[32px] p-6 border border-[#F0F0F0] shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top Section: Title & Short Description */}
              <div className="flex flex-col items-start mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                  {prod.title}
                </h3>
                <span className="text-xs sm:text-sm text-[#767676] font-medium mt-1">
                  {prod.category}
                </span>
              </div>

              {/* Bottom Section: Grey Image Placeholder */}
              <div className="relative w-full aspect-square rounded-[24px] bg-[#EBEBEB] overflow-hidden transition-colors duration-300">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 290px, 320px"
                  priority={idx < 3}
                />

                {/* Circular Action Button with Arrow ↗ */}
                <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-md transition-all duration-300 group-hover:scale-105 z-10">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

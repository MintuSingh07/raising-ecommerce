"use client";

import { useState, useMemo, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductDetails from "@/components/ProductDetails";
import BlurText from "@/components/BlurText";
import productData from "../../../../public/products_structured.json";
import { type Product } from "@/components/ProductCatalog";
import { Package, ChevronRight, Home, ArrowLeft } from "lucide-react";

// Website categories mapping
const WEBSITE_CATEGORIES = [
  { id: "torches", label: "LED Torches", desc: "Heavy-duty portable flashlights and Kisan torches designed for maximum reach and durability." },
  { id: "spotlights", label: "Spotlights", desc: "Long-range precision headlights and adjustable focus searchlights." },
  { id: "emergency-lights", label: "Emergency Lights", desc: "Multi-functional backup lanterns and solar power home illumination kits." },
  { id: "rechargeable", label: "Rechargeable Products", desc: "Eco-friendly, energy-efficient desk lamps, reading lamps, and USB bulbs." },
  { id: "industrial", label: "Industrial Solutions", desc: "High-spec tactical military gears, security, and industrial application flashlights." },
];

interface PageProps {
  params: Promise<{ category: string }>;
}

// Helper to clean HTML text and extract list features and specs
function parseHtmlDescription(html: string) {
  if (!html) return { features: [], specs: [] };

  const features: string[] = [];
  const liMatches = html.match(/<li>(.*?)<\/li>/g);
  if (liMatches) {
    liMatches.forEach(match => {
      const clean = match
        .replace(/<\/?li>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&deg;/g, "°")
        .trim();
      if (clean) features.push(clean);
    });
  }

  const specs: { label: string; value: string }[] = [];
  const specDivRegex = /<div>\s*<span class="label">(.*?)<\/span>\s*(.*?)\s*<\/div>/g;
  const matches = html.matchAll(specDivRegex);
  for (const m of matches) {
    const label = m[1].replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
    const value = m[2].replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
    if (label) {
      specs.push({ label, value });
    }
  }

  return { features, specs };
}

// Extract quick specs for badges
function getQuickSpecs(specs: { label: string; value: string }[], features: string[]) {
  let wattage = "";
  let capacity = "";
  let batteryType = "";
  let charging = "";

  specs.forEach(s => {
    const label = s.label.toLowerCase();
    const val = s.value;
    if (label.includes("wattage") || label.includes("watt")) wattage = val;
    if (label.includes("capacity")) capacity = val;
    if (label.includes("battery type")) batteryType = val;
    if (label.includes("charging")) charging = val;
  });

  if (!wattage) {
    const wattFeature = features.find(f => /\b\d+\s*W\b/i.test(f));
    if (wattFeature) {
      const match = wattFeature.match(/\b(\d+\s*W)\b/i);
      if (match) wattage = match[1];
    }
  }
  if (!capacity) {
    const capFeature = features.find(f => /\b\d+\s*mAh\b/i.test(f));
    if (capFeature) {
      const match = capFeature.match(/\b(\d+\s*mAh)\b/i);
      if (match) capacity = match[1];
    }
  }

  return { wattage, capacity, batteryType, charging };
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.category;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to top on mount and category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [categoryId]);

  // Find the category info
  const categoryInfo = useMemo(() => {
    return WEBSITE_CATEGORIES.find(c => c.id === categoryId);
  }, [categoryId]);

  // Group all products to filter the ones belonging to the active category
  const products = useMemo(() => {
    const allProducts = productData.products as Product[];
    const filtered = allProducts.filter(p => {
      const cats = p.categories.map(c => c.toLowerCase());
      
      if (categoryId === "industrial") {
        return cats.includes("industrial") || cats.includes("defence/security");
      } else if (categoryId === "rechargeable") {
        return cats.includes("led table lamp") || cats.includes("led usb lamp") || cats.includes("corporate gifting");
      } else if (categoryId === "emergency-lights") {
        return cats.includes("led lantern") || cats.includes("solar energy kit");
      } else if (categoryId === "spotlights") {
        return cats.includes("led headlamp") || cats.includes("solar lantern & searchlight");
      } else if (categoryId === "torches") {
        // Fallback or explicit torches category
        return !cats.includes("industrial") && 
               !cats.includes("defence/security") &&
               !cats.includes("led table lamp") && 
               !cats.includes("led usb lamp") && 
               !cats.includes("corporate gifting") &&
               !cats.includes("led lantern") && 
               !cats.includes("solar energy kit") &&
               !cats.includes("led headlamp") && 
               !cats.includes("solar lantern & searchlight");
      }
      return false;
    });

    // Sort: best sellers first
    return filtered.sort((a, b) => {
      const aVal = (a.featured === 1 || a.tags.includes("top-product")) ? 1 : 0;
      const bVal = (b.featured === 1 || b.tags.includes("top-product")) ? 1 : 0;
      return bVal - aVal;
    });
  }, [categoryId]);

  // Apply search query within this category
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(query);
      const tagMatch = p.tags.some(t => t.toLowerCase().includes(query));
      const catMatch = p.categories.some(c => c.toLowerCase().includes(query));
      
      const { features, specs } = parseHtmlDescription(p.descriptions.short);
      const featuresMatch = features.some(f => f.toLowerCase().includes(query));
      const specsMatch = specs.some(s => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query));

      return nameMatch || tagMatch || catMatch || featuresMatch || specsMatch;
    });
  }, [products, searchQuery]);

  // Handle Invalid Category
  if (!categoryInfo) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="relative w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 shadow-sm">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-navy tracking-tight mb-2">
            Collection Not Found
          </h1>
          <p className="text-sm text-slate-body max-w-md mb-8">
            The collection you are trying to view does not exist. Please explore our other product ranges.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold bg-primary text-white border border-primary hover:bg-primary-navy shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home Page
          </Link>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />

      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        ) : (
          <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
              <Link href="/" className="hover:text-primary transition-colors uppercase flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
              <Link href="/#collections" className="hover:text-primary transition-colors uppercase">
                Collections
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
              <span className="text-primary uppercase font-bold">{categoryInfo.label}</span>
            </nav>

            {/* Category Header Card */}
            <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-dark-navy to-slate-950 text-white p-8 sm:p-12 mb-12 shadow-premium border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.18)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
                  Product Collection
                </span>
                
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                  <BlurText text={categoryInfo.label} delay={20} animateBy="words" direction="bottom" />
                </h1>
                
                <p className="text-sm sm:text-base text-blue-50/80 leading-relaxed font-medium">
                  <BlurText text={categoryInfo.desc} delay={10} animateBy="words" direction="bottom" />
                </p>
              </div>
            </div>

            {/* Search and Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
              <div className="text-xs font-bold text-dark-navy uppercase tracking-wider">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"} in {categoryInfo.label}
              </div>

              {/* Search Box */}
              <div className="relative w-full max-w-md group">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur group-hover:bg-primary/15 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder={`Search within ${categoryInfo.label}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full px-5 py-3 rounded-full border border-slate-200 bg-white/95 text-dark-navy font-semibold text-xs focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm transition-all duration-300"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-primary transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white border border-slate-100 rounded-[32px] text-slate-body font-semibold text-sm shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                No products match your search. Try resetting the query.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => {
                  const { features, specs } = parseHtmlDescription(p.descriptions.short);
                  const { wattage, capacity, batteryType } = getQuickSpecs(specs, features);
                  
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="group bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-4">
                        {/* Image box with grey fallback */}
                        <div className="relative w-full aspect-square rounded-[18px] bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center">
                          {p.media.images && p.media.images[0] ? (
                            <Image
                              src={p.media.images[0]}
                              alt={p.name}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 250px"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-350">
                              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-[10px] uppercase font-bold tracking-wider mt-2">No Image</span>
                            </div>
                          )}

                          {/* Bestseller Badge */}
                          {p.tags.includes("top-product") && (
                            <span className="absolute top-3 left-3 bg-accent text-dark-navy text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                              Best Seller
                            </span>
                          )}
                        </div>

                        {/* Title details */}
                        <div className="space-y-1">
                          <h4 className="text-base sm:text-lg font-semibold text-dark-navy tracking-tight group-hover:text-primary transition-colors duration-300">
                            {p.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 text-[10px] text-slate-body font-medium">
                            {p.brand && <span>{p.brand}</span>}
                            {p.brand && p.categories[0] && <span>•</span>}
                            {p.categories[0] && <span>{p.categories[0]}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Spec Badges & CTA */}
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {wattage && (
                            <span className="bg-slate-50 text-slate-body text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                              {wattage}
                            </span>
                          )}
                          {capacity && (
                            <span className="bg-slate-50 text-slate-body text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                              {capacity}
                            </span>
                          )}
                          {batteryType && (
                            <span className="bg-slate-50 text-slate-body text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 max-w-[120px] truncate" title={batteryType}>
                              {batteryType}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-navy">
                          <span>Inspect Specs</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

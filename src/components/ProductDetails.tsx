"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import BlurText from "./BlurText";
import { motion } from "motion/react";
import { 
  Package, 
  Tag, 
  Truck, 
  Award, 
  Sun, 
  Navigation, 
  Battery, 
  Clock, 
  Shield, 
  ShieldCheck, 
  Lightbulb, 
  Sliders, 
  Factory, 
  Car, 
  Tent, 
  Home, 
  Usb, 
  Bookmark, 
  BookOpen, 
  FileText, 
  Download,
  ChevronLeft,
  ChevronRight,
  Check
} from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: number;
    type: string;
    name: string;
    video: string;
    sku: string | null;
    gtin_upc_ean_isbn: string | null;
    published: number;
    featured: number;
    catalogVisibility: string;
    brand: string | null;
    categories: string[];
    tags: string[];
    descriptions: {
      short: string;
      full: string | null;
    };
    pricing: {
      regular: number | null;
      sale: number | null;
      saleStart: string | null;
      saleEnd: string | null;
    };
    inventory: {
      inStock: number;
      stock: number | null;
      lowStockAmount: number | null;
      backordersAllowed: number;
      soldIndividually: number;
    };
    dimensions: {
      weightKg: number | null;
      lengthCm: number | null;
      widthCm: number | null;
      heightCm: number | null;
    };
    media: {
      images: string[];
      video: string;
    };
    attributes: {
      [key: string]: any;
    };
    variations?: any[];
  };
  onClose: () => void;
}

// Clean and extract HTML descriptions into arrays
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

  // Fallback spec parsing for simpler formats
  if (specs.length === 0) {
    const labelSpanRegex = /<span class="label">(.*?)<\/span>\s*([^<]*)/g;
    const matches2 = html.matchAll(labelSpanRegex);
    for (const m of matches2) {
      const label = m[1].replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
      const value = m[2].replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
      if (label && value) {
        specs.push({ label, value });
      }
    }
  }

  return { features, specs };
}

// Helper to format highlights dynamically
function getFormattedHighlight(feat: string) {
  const cleanFeat = feat.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
  
  if (cleanFeat.includes(":")) {
    const [title, ...rest] = cleanFeat.split(":");
    return { title: title.trim(), desc: rest.join(":").trim() };
  }
  
  const withRegex = /\bwith\b/i;
  if (withRegex.test(cleanFeat)) {
    const match = cleanFeat.split(withRegex);
    return { title: match[0].trim(), desc: `With ${match[1].trim()}` };
  }

  const forRegex = /\bfor\b/i;
  if (forRegex.test(cleanFeat)) {
    const match = cleanFeat.split(forRegex);
    return { title: match[0].trim(), desc: `For ${match[1].trim()}` };
  }

  const words = cleanFeat.split(" ");
  if (words.length > 3) {
    const title = words.slice(0, 3).join(" ");
    const desc = words.slice(3).join(" ");
    return { title, desc };
  }

  return { title: cleanFeat, desc: "" };
}

// Helper to map color strings to Tailwind CSS color classes
function getColorBubbleStyle(colorName: string): { bg: string; border: string; value: string } {
  const name = colorName.trim().toLowerCase();
  if (name.includes("red")) return { bg: "bg-red-600", border: "border-red-800", value: "Red" };
  if (name.includes("blue")) return { bg: "bg-blue-600", border: "border-blue-800", value: "Blue" };
  if (name.includes("yellow")) return { bg: "bg-yellow-500", border: "border-yellow-600", value: "Yellow" };
  if (name.includes("orange")) return { bg: "bg-orange-500", border: "border-orange-600", value: "Orange" };
  if (name.includes("green")) return { bg: "bg-emerald-600", border: "border-emerald-800", value: "Green" };
  if (name.includes("black")) return { bg: "bg-slate-900", border: "border-black", value: "Black" };
  if (name.includes("white")) return { bg: "bg-slate-100", border: "border-slate-350", value: "White" };
  return { bg: "bg-primary-navy", border: "border-primary-navy", value: colorName };
}

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const { features, specs } = useMemo(() => parseHtmlDescription(product.descriptions.short), [product]);
  
  const filteredSpecs = useMemo(() => {
    const skipLabels = ["brand", "model name", "model name/number", "model number", "model"];
    
    return specs.filter((spec) => {
      const labelLower = spec.label.trim().toLowerCase();
      if (skipLabels.includes(labelLower)) {
        return false;
      }
      
      const valClean = spec.value.trim().toLowerCase().replace(/\s+/g, "");
      if (!valClean) return false;
      
      if (valClean === "yes" || valClean === "no") {
        if (labelLower === "rechargeable") {
          return !features.some(feat => feat.toLowerCase().includes("recharge"));
        }
        return true;
      }

      // Check if this spec value is mentioned in any of the feature items
      const isMentioned = features.some((feat) => {
        const featLower = feat.toLowerCase().replace(/\s+/g, "");
        if (featLower.includes(valClean)) {
          return true;
        }
        
        // Check if value parts (for lists like "Farming, Mining") are in features
        if (labelLower.includes("usage") || labelLower.includes("application")) {
          const parts = spec.value.split(/[,/]/);
          return parts.some(part => featLower.includes(part.trim().toLowerCase().replace(/\s+/g, "")));
        }

        return false;
      });

      return !isMentioned;
    });
  }, [specs, features]);

  const [selectedColor, setSelectedColor] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allImages = useMemo<string[]>(() => {
    const baseImages = product.media.images || [];
    if (selectedColor && product.variations && product.variations.length > 0) {
      const selectedVar = product.variations.find(
        (v: any) =>
          (v.attributes?.Colors || v.attributes?.colors || "")
            .trim()
            .toLowerCase() === selectedColor.trim().toLowerCase()
      );

      const otherVarImages = new Set<string>();
      product.variations.forEach((v: any) => {
        const isSelected = (v.attributes?.Colors || v.attributes?.colors || "")
          .trim()
          .toLowerCase() === selectedColor.trim().toLowerCase();
        if (!isSelected && v.images) {
          v.images.forEach((img: string) => {
            if (img) otherVarImages.add(img);
          });
        }
      });

      const selectedVarImages = selectedVar?.images || [];
      const combined = [
        ...selectedVarImages,
        ...baseImages.filter((img) => !otherVarImages.has(img)),
      ];
      return Array.from(new Set(combined));
    }
    return baseImages;
  }, [product, selectedColor]);
  
  // Parse color options from attributes
  const colorsList = useMemo(() => {
    const rawColors = product.attributes.Colors || "";
    if (!rawColors) return [];
    return rawColors.split(",").map((c: string) => c.trim()).filter(Boolean);
  }, [product]);

  // Set default states on mount/product change
  useEffect(() => {
    setActiveImageIndex(0);
    
    if (colorsList.length > 0) {
      setSelectedColor(colorsList[0]);
    } else {
      setSelectedColor("");
    }

    // Scroll to top immediately when product/details change
    window.scrollTo({ top: 0, behavior: "instant" });
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [product, colorsList]);

  // Find quick features from specs for the main info panel (Strictly parsed from JSON)
  const quickSpecs = useMemo(() => {
    const list: { value: string; key: string }[] = [];
    
    // 1. Lumens / Brightness
    const lumen = specs.find(s => s.label.toLowerCase().includes("lumen") || s.value.toLowerCase().includes("lumen"));
    const watt = specs.find(s => s.label.toLowerCase().includes("watt") || s.label.toLowerCase().includes("power"));
    if (lumen) {
      list.push({ value: lumen.value.includes("Lumen") ? lumen.value : `${lumen.value} High Brightness`, key: "brightness" });
    } else if (watt) {
      list.push({ value: `${watt.value} High Power LED`, key: "brightness" });
    } else {
      const wattFeat = features.find(f => /\b\d+\s*W\b/i.test(f) || /\b\d+\s*Lumen\b/i.test(f));
      if (wattFeat) list.push({ value: wattFeat, key: "brightness" });
    }

    // 2. Beam Range
    const range = specs.find(s => s.label.toLowerCase().includes("range") || s.label.toLowerCase().includes("beam") || s.label.toLowerCase().includes("distance"));
    if (range) {
      list.push({ value: range.value.includes("Beam") || range.value.includes("Range") ? range.value : `${range.value} Beam Range`, key: "range" });
    } else {
      const rangeFeat = features.find(f => f.toLowerCase().includes("beam") || f.toLowerCase().includes("range") || f.toLowerCase().includes("meters"));
      if (rangeFeat) list.push({ value: rangeFeat, key: "range" });
    }

    // 3. Rechargeable Battery
    const cap = specs.find(s => s.label.toLowerCase().includes("capacity"));
    const batType = specs.find(s => s.label.toLowerCase().includes("battery"));
    if (cap) {
      list.push({ value: `${cap.value} Rechargeable Battery`, key: "battery" });
    } else if (batType) {
      list.push({ value: `${batType.value} Battery`, key: "battery" });
    } else {
      const batFeat = features.find(f => f.toLowerCase().includes("battery") || f.toLowerCase().includes("mah"));
      if (batFeat) list.push({ value: batFeat, key: "battery" });
    }

    // 4. Backup Time
    const backup = specs.find(s => s.label.toLowerCase().includes("backup") || s.label.toLowerCase().includes("duration") || s.label.toLowerCase().includes("time"));
    if (backup) {
      list.push({ value: backup.value.toLowerCase().includes("backup") || backup.value.toLowerCase().includes("hours") ? backup.value : `Up to ${backup.value} Backup`, key: "backup" });
    } else {
      const backupFeat = features.find(f => f.toLowerCase().includes("backup") || f.toLowerCase().includes("duration") || f.toLowerCase().includes("hours"));
      if (backupFeat) list.push({ value: backupFeat, key: "backup" });
    }

    // 5. Body Material
    const material = specs.find(s => s.label.toLowerCase().includes("material") || s.label.toLowerCase().includes("body"));
    if (material) {
      list.push({ value: `${material.value} Body`, key: "body" });
    } else {
      const materialFeat = features.find(f => f.toLowerCase().includes("material") || f.toLowerCase().includes("body") || f.toLowerCase().includes("abs") || f.toLowerCase().includes("aluminum"));
      if (materialFeat) list.push({ value: materialFeat, key: "body" });
    }

    // 6. Protection
    const protectFeat = features.find(f => f.toLowerCase().includes("protection") || f.toLowerCase().includes("protect") || f.toLowerCase().includes("safety") || f.toLowerCase().includes("overcharg"));
    if (protectFeat) {
      list.push({ value: protectFeat, key: "protection" });
    } else {
      const protectSpec = specs.find(s => s.label.toLowerCase().includes("protection") || s.label.toLowerCase().includes("safety"));
      if (protectSpec) list.push({ value: `${protectSpec.label}: ${protectSpec.value}`, key: "protection" });
    }

    return list;
  }, [specs, features]);

  // Parse Applications list strictly from the Usage/Application spec in JSON
  const applications = useMemo(() => {
    const appSpec = specs.find(s => s.label.toLowerCase().includes("usage") || s.label.toLowerCase().includes("application"));
    if (!appSpec) return [];
    
    return appSpec.value
      .split(/,|;|and/i)
      .map(item => item.trim())
      .filter(Boolean);
  }, [specs]);

  // Parse What's in the Box strictly from the JSON model name & features keywords
  const whatsInTheBox = useMemo(() => {
    const list: string[] = [`1x RISING ${product.name}`];
    
    features.forEach(feat => {
      const lower = feat.toLowerCase();
      if (lower.includes("belt") || lower.includes("strap") || lower.includes("lanyard")) {
        if (lower.includes("belt")) list.push("1x Nylon Belt");
        else if (lower.includes("strap")) list.push("1x Shoulder Strap");
        else if (lower.includes("lanyard")) list.push("1x Lanyard");
      }
      if (lower.includes("adapter") || lower.includes("charger") || lower.includes("smps")) {
        if (lower.includes("adapter")) list.push("1x SMPS Adapter");
        else if (lower.includes("charger")) list.push("1x Charger");
        else list.push("1x Power Adapter");
      }
      if (lower.includes("cable") || lower.includes("usb") || lower.includes("type-c")) {
        list.push("1x USB Charging Cable");
      }
      if (lower.includes("battery") && (lower.includes("dry") || lower.includes("aa") || lower.includes("provided"))) {
        list.push("Dry Cell Batteries");
      }
    });

    return list;
  }, [product, features]);

  return (
    <section className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
          <button onClick={onClose} className="hover:text-primary cursor-pointer transition-colors uppercase">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <button onClick={onClose} className="hover:text-primary cursor-pointer transition-colors uppercase">
            Products
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <span className="text-primary uppercase">{product.categories[0] || "Lighting"}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <span className="text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Top Split Block: Gallery and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Left Side: Product Gallery */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main Image View - Dark Cinematic Backdrop with object-cover */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] rounded-[28px] flex items-center justify-center overflow-hidden shadow-premium group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.15)_0%,transparent_65%)] pointer-events-none" />

              {allImages.length > 0 ? (
                <Image
                  src={allImages[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-650">
                  <Package className="w-16 h-16 text-slate-500" strokeWidth={1} />
                  <span className="text-xs uppercase font-extrabold tracking-wider mt-2">No Image Available</span>
                </div>
              )}

              {/* Best Seller Badge */}
              {(product.featured === 1 || product.tags.includes("top-product")) && (
                <span className="absolute top-5 left-5 bg-accent text-dark-navy text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-md shadow-sm select-none tracking-wider">
                  Best Seller
                </span>
              )}

              {/* Left/Right Slider Overlay Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/85 flex items-center justify-center text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/85 flex items-center justify-center text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-800" strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails strip with object-cover and soft shadows (no borders) */}
            {allImages.length > 1 && (
              <div className="flex flex-wrap gap-2.5 select-none">
                {allImages.map((img: string, idx: number) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-xl bg-slate-50 overflow-hidden transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "ring-2 ring-primary ring-offset-2 scale-102 shadow-md"
                          : "shadow-sm hover:scale-102"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="80px"
                      />
                      
                      {idx === 0 && product.video && (
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                            <ChevronRight className="w-3.5 h-3.5 text-primary ml-0.5 fill-primary" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side: Product Info */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category tag */}
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary block">
              {product.categories[0] || "Industrial Series"}
            </span>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-dark-navy tracking-tight leading-[1.15]">
                {product.name}
              </h1>
              {features.length > 0 && (
                <p className="text-sm sm:text-base text-slate-body font-medium leading-relaxed max-w-xl">
                  {getFormattedHighlight(features[0]).title}. {features[1] ? getFormattedHighlight(features[1]).title : "High performance illumination. Built for every challenge."}
                </p>
              )}
            </div>

            {/* Stars & Reviews */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-light select-none">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-dark-navy">4.8 (132 Reviews)</span>
              <span className="text-slate-200">|</span>
              <span>SKU: {product.sku || `RT-${product.id}`}</span>
            </div>

            {/* Quick Specs Bullet List with Lucide Icons */}
            {quickSpecs.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-dark-navy">
                  {quickSpecs.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {item.key === "brightness" && <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" strokeWidth={2} />}
                      {item.key === "range" && <Navigation className="w-5 h-5 text-slate-700 flex-shrink-0 rotate-45" strokeWidth={2} />}
                      {item.key === "battery" && <Battery className="w-5 h-5 text-slate-700 flex-shrink-0" strokeWidth={2} />}
                      {item.key === "backup" && <Clock className="w-5 h-5 text-slate-700 flex-shrink-0" strokeWidth={2} />}
                      {item.key === "body" && <Shield className="w-5 h-5 text-slate-700 flex-shrink-0" strokeWidth={2} />}
                      {item.key === "protection" && <ShieldCheck className="w-5 h-5 text-slate-750 flex-shrink-0" strokeWidth={2} />}
                      <span className="text-slate-850 leading-tight font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Swatch Selector */}
            {colorsList.length > 0 && (
              <div className="space-y-3 pt-2 select-none">
                <span className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                  Color: <span className="font-semibold text-slate-body capitalize">{selectedColor}</span>
                </span>
                <div className="flex gap-2.5">
                  {colorsList.map((color: string) => {
                    const isActive = selectedColor === color;
                    const style = getColorBubbleStyle(color);
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setActiveImageIndex(0);
                        }}
                        className={`relative w-8 h-8 rounded-full border cursor-pointer transition-all active:scale-90 flex items-center justify-center ${style.bg} ${style.border} ${
                          isActive
                            ? "ring-2 ring-primary ring-offset-2 scale-105"
                            : "opacity-85 hover:opacity-100 hover:scale-105"
                        }`}
                        title={color}
                      >
                        {isActive && <Check className="w-4 h-4 text-white drop-shadow-sm" strokeWidth={3.5} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions CTA Buttons with Lucide Icons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 select-none">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start px-6 py-3.5 rounded-lg text-xs font-bold bg-primary text-white border border-primary hover:bg-primary-navy shadow-md shadow-primary/10 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex items-center">
                  <FileText className="w-4.5 h-4.5 mr-2.5" strokeWidth={2} />
                  <span>Request a Quote</span>
                </div>
                <div className="w-5 h-5 ml-4 rounded bg-white/10 flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              </Link>
              <button
                onClick={() => alert("Datasheet download started successfully.")}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start px-6 py-3.5 rounded-lg text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all duration-300 active:scale-[0.98]"
              >
                <span>Download Datasheet</span>
                <Download className="w-4.5 h-4.5 ml-6 text-slate-650" strokeWidth={2.5} />
              </button>
            </div>
            
          </div>
        </div>

        {/* Horizontal B2B Value Badges - Soft shadow and very light border box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 select-none border border-slate-100/70 shadow-[0_12px_35px_-12px_rgba(0,0,0,0.04)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary flex-shrink-0">
              <Package className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-dark-navy">Bulk Orders</h4>
              <p className="text-[11px] sm:text-xs text-slate-body font-medium leading-relaxed">
                Competitive pricing for bulk requirements
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary flex-shrink-0">
              <Tag className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-dark-navy">OEM & Branding</h4>
              <p className="text-[11px] sm:text-xs text-slate-body font-medium leading-relaxed">
                Custom branding & packaging available
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary flex-shrink-0">
              <Truck className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-dark-navy">Fast Delivery</h4>
              <p className="text-[11px] sm:text-xs text-slate-body font-medium leading-relaxed">
                Pan India delivery with secure packaging
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary flex-shrink-0">
              <Award className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-dark-navy">Trusted Quality</h4>
              <p className="text-[11px] sm:text-xs text-slate-body font-medium leading-relaxed">
                20+ years of excellence in lighting solutions
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Specifications, Highlights, and Box Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mb-16">
          
          {/* Combined Column 1 & 2: Specifications & Highlights details wrapper */}
          <div className="lg:col-span-9 bg-white border border-slate-100 rounded-[24px] p-6 sm:p-7.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features List */}
              <div>
                {features.length > 0 ? (
                  <ul className="space-y-5">
                    {features.map((feat, idx) => {
                      const { title, desc } = getFormattedHighlight(feat);
                      if (!title) return null;
                      
                      // Keyword mapping for Lucide icons
                      const isLED = title.toLowerCase().includes("led") || title.toLowerCase().includes("smd") || title.toLowerCase().includes("light") || title.toLowerCase().includes("bulb");
                      const isRange = title.toLowerCase().includes("beam") || title.toLowerCase().includes("range") || title.toLowerCase().includes("spot") || title.toLowerCase().includes("reflector");
                      const isBattery = title.toLowerCase().includes("battery") || title.toLowerCase().includes("mah") || title.toLowerCase().includes("recharge");
                      const isModes = title.toLowerCase().includes("mode") || title.toLowerCase().includes("strobe") || title.toLowerCase().includes("operate");
                      const isBody = title.toLowerCase().includes("body") || title.toLowerCase().includes("abs") || title.toLowerCase().includes("durable") || title.toLowerCase().includes("rugged") || title.toLowerCase().includes("material") || title.toLowerCase().includes("metal") || title.toLowerCase().includes("aluminium");
                      const isProtect = title.toLowerCase().includes("protect") || title.toLowerCase().includes("safety") || title.toLowerCase().includes("overcharge");

                      return (
                        <li key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-blue-50/50 flex-shrink-0 flex items-center justify-center">
                            {isLED && <Lightbulb className="w-4.5 h-4.5 text-primary" strokeWidth={2} />}
                            {isRange && <Navigation className="w-4.5 h-4.5 text-primary rotate-45" strokeWidth={2} />}
                            {isBattery && <Battery className="w-4.5 h-4.5 text-primary" strokeWidth={2} />}
                            {isModes && <Sliders className="w-4.5 h-4.5 text-primary" strokeWidth={2} />}
                            {isBody && <Shield className="w-4.5 h-4.5 text-primary" strokeWidth={2} />}
                            {isProtect && <ShieldCheck className="w-4.5 h-4.5 text-primary" strokeWidth={2} />}
                            {!isLED && !isRange && !isBattery && !isModes && !isBody && !isProtect && (
                              <ShieldCheck className="w-4.5 h-4.5 text-primary" strokeWidth={2.5} />
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-sm font-bold text-dark-navy block leading-tight">{title}</span>
                            {desc && <span className="text-xs text-slate-body font-medium block leading-relaxed">{desc}</span>}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-body font-medium">No details available for this model.</p>
                )}
              </div>

              {/* Technical Specifications */}
              <div>
                {filteredSpecs.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-slate-100/50">
                    <table className="w-full border-collapse text-xs">
                      <tbody>
                        {filteredSpecs.map((spec, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-slate-100/50 last:border-0 ${
                              idx % 2 === 0 ? "bg-slate-50/20" : "bg-white"
                            }`}
                          >
                            <td className="px-4 py-2 font-bold text-dark-navy w-1/3">
                              {spec.label}
                            </td>
                            <td className="px-4 py-2 text-slate-body font-medium leading-normal">
                              {spec.label.toLowerCase().includes("color") && colorsList.length > 0 ? (
                                <div className="flex gap-1.5 items-center">
                                  {colorsList.map((color: string) => {
                                    const style = getColorBubbleStyle(color);
                                    return (
                                      <span 
                                        key={color} 
                                        className={`w-3.5 h-3.5 rounded-full border ${style.bg} ${style.border}`} 
                                        title={color}
                                      />
                                    );
                                  })}
                                </div>
                              ) : (
                                spec.value
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Stacked Cards (Right) - Matching border card with drop shadow */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Card 1: Applications (Only render if parsed from JSON) */}
            {applications.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
                <h3 className="text-xs font-bold text-dark-navy uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 select-none">
                  Applications
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-body font-semibold">
                  {applications.map((app, idx) => {
                    const lower = app.toLowerCase();
                    const isIndustrial = lower.includes("industrial") || lower.includes("factory") || lower.includes("mining") || lower.includes("farming") || lower.includes("agriculture");
                    const isSecurity = lower.includes("security") || lower.includes("patrol") || lower.includes("signal") || lower.includes("railway");
                    const isAutomotive = lower.includes("auto") || lower.includes("car");
                    const isOutdoor = lower.includes("outdoor") || lower.includes("camp") || lower.includes("trek");
                    const isHome = lower.includes("home") || lower.includes("emergen") || lower.includes("house");

                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5.5 h-5.5 rounded bg-blue-50/50 flex items-center justify-center flex-shrink-0">
                          {isIndustrial && <Factory className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                          {isSecurity && <Shield className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                          {isAutomotive && <Car className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                          {isOutdoor && <Tent className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                          {isHome && <Home className="w-3.5 h-3.5 text-primary" strokeWidth={2} />}
                          {!isIndustrial && !isSecurity && !isAutomotive && !isOutdoor && !isHome && (
                            <Shield className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                          )}
                        </div>
                        <span className="capitalize">{app}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Card 2: What's in the Box (Only render if parsed from JSON features) */}
            {whatsInTheBox.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
                <h3 className="text-xs font-bold text-dark-navy uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 select-none">
                  What's in the Box
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-body font-semibold">
                  {whatsInTheBox.map((boxItem, idx) => {
                    const lower = boxItem.toLowerCase();
                    const isTorch = lower.includes("rising") || lower.includes("torch") || lower.includes("lantern") || lower.includes("headlamp") || lower.includes("lamp");
                    const isCable = lower.includes("cable") || lower.includes("usb") || lower.includes("wire");
                    const isStrap = lower.includes("strap") || lower.includes("belt") || lower.includes("lanyard");
                    const isBattery = lower.includes("battery");

                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5.5 h-5.5 rounded bg-amber-50/50 flex items-center justify-center flex-shrink-0">
                          {isTorch && <Package className="w-3.5 h-3.5 text-accent" strokeWidth={2} />}
                          {isCable && <Usb className="w-3.5 h-3.5 text-accent" strokeWidth={2} />}
                          {isStrap && <Bookmark className="w-3.5 h-3.5 text-accent" strokeWidth={2} />}
                          {isBattery && <Battery className="w-3.5 h-3.5 text-accent" strokeWidth={2} />}
                          {!isTorch && !isCable && !isStrap && !isBattery && (
                            <Package className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                          )}
                        </div>
                        <span>{boxItem}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

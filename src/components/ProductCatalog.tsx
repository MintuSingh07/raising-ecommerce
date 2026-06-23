"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import productData from "../../public/products_structured.json";
import BlurText from "./BlurText";
import { motion } from "motion/react";
import ProductDetails from "./ProductDetails";

// Types matching the products_structured.json schema
export interface Product {
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
  tax: {
    status: string;
    class: string | null;
  };
  media: {
    images: string[];
    video: string;
  };
  attributes: {
    [key: string]: any;
  };
  shippingClass: string | null;
  purchaseNote: string | null;
  externalUrl: string | null;
  buttonText: string | null;
  position: number;
  meta: {
    [key: string]: any;
  };
  variations?: any[];
}

// Map of the 5 website categories
const WEBSITE_CATEGORIES = [
  {
    id: "torches",
    label: "LED Torches",
    desc: "Heavy-duty portable flashlights and Kisan torches designed for maximum reach and durability.",
  },
  {
    id: "spotlights",
    label: "Spotlights",
    desc: "Long-range precision headlights and adjustable focus searchlights.",
  },
  {
    id: "emergency-lights",
    label: "Emergency Lights",
    desc: "Multi-functional backup lanterns and solar power home illumination kits.",
  },
  {
    id: "rechargeable",
    label: "Rechargeable Products",
    desc: "Eco-friendly, energy-efficient desk lamps, reading lamps, and USB bulbs.",
  },
  {
    id: "industrial",
    label: "Industrial Solutions",
    desc: "High-spec tactical military gears, security, and industrial application flashlights.",
  },
];

// Helper to clean HTML text and extract list features and specs
function parseHtmlDescription(html: string) {
  if (!html) return { features: [], specs: [] };

  const features: string[] = [];
  const liMatches = html.match(/<li>(.*?)<\/li>/g);
  if (liMatches) {
    liMatches.forEach((match) => {
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
  const specDivRegex =
    /<div>\s*<span class="label">(.*?)<\/span>\s*(.*?)\s*<\/div>/g;
  const matches = html.matchAll(specDivRegex);
  for (const m of matches) {
    const label = m[1]
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .trim();
    const value = m[2]
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (label) {
      specs.push({ label, value });
    }
  }

  return { features, specs };
}

// Extract wattage, battery capacity, battery type, and charging from specifications or features
function getQuickSpecs(
  specs: { label: string; value: string }[],
  features: string[],
) {
  let wattage = "";
  let capacity = "";
  let batteryType = "";
  let charging = "";

  specs.forEach((s) => {
    const label = s.label.toLowerCase();
    const val = s.value;
    if (label.includes("wattage") || label.includes("watt")) wattage = val;
    if (label.includes("capacity")) capacity = val;
    if (label.includes("battery type")) batteryType = val;
    if (label.includes("charging")) charging = val;
  });

  if (!wattage) {
    const wattFeature = features.find((f) => /\b\d+\s*W\b/i.test(f));
    if (wattFeature) {
      const match = wattFeature.match(/\b(\d+\s*W)\b/i);
      if (match) wattage = match[1];
    }
  }
  if (!capacity) {
    const capFeature = features.find((f) => /\b\d+\s*mAh\b/i.test(f));
    if (capFeature) {
      const match = capFeature.match(/\b(\d+\s*mAh)\b/i);
      if (match) capacity = match[1];
    }
  }

  return { wattage, capacity, batteryType, charging };
}

export interface ProductCatalogProps {
  setSelectedProduct?: (product: Product) => void;
}

export default function ProductCatalog({
  setSelectedProduct,
}: ProductCatalogProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("torches");

  // Expanded state for each category section
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({
    torches: false,
    spotlights: false,
    "emergency-lights": false,
    rechargeable: false,
    industrial: false,
  });

  const currentWebCat = useMemo(() => {
    return WEBSITE_CATEGORIES.find((c) => c.id === activeCategory);
  }, [activeCategory]);

  // Group products into our 5 website categories
  const categorizedProducts = useMemo(() => {
    const products = productData.products as Product[];

    const groups: { [key: string]: Product[] } = {
      torches: [],
      spotlights: [],
      "emergency-lights": [],
      rechargeable: [],
      industrial: [],
    };

    products.forEach((p) => {
      const cats = p.categories.map((c) => c.toLowerCase());

      // Determine which category it maps to
      if (cats.includes("industrial") || cats.includes("defence/security")) {
        groups["industrial"].push(p);
      } else if (
        cats.includes("led table lamp") ||
        cats.includes("led usb lamp") ||
        cats.includes("corporate gifting")
      ) {
        groups["rechargeable"].push(p);
      } else if (
        cats.includes("led lantern") ||
        cats.includes("solar energy kit")
      ) {
        groups["emergency-lights"].push(p);
      } else if (
        cats.includes("led headlamp") ||
        cats.includes("solar lantern & searchlight")
      ) {
        groups["spotlights"].push(p);
      } else {
        // Fallback or explicit torches category
        groups["torches"].push(p);
      }
    });

    // Sort each group so best sellers are always first
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const aVal = a.featured === 1 || a.tags.includes("top-product") ? 1 : 0;
        const bVal = b.featured === 1 || b.tags.includes("top-product") ? 1 : 0;
        return bVal - aVal;
      });
    });

    return groups;
  }, []);

  // Filtered products based on search queries
  const filteredCategorizedProducts = useMemo(() => {
    if (!searchQuery) return categorizedProducts;

    const query = searchQuery.toLowerCase();
    const filtered: { [key: string]: Product[] } = {};

    Object.keys(categorizedProducts).forEach((catId) => {
      filtered[catId] = categorizedProducts[catId].filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(query);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(query));
        const catMatch = p.categories.some((c) =>
          c.toLowerCase().includes(query),
        );

        // Match in parsed description/specs
        const { features, specs } = parseHtmlDescription(p.descriptions.short);
        const featuresMatch = features.some((f) =>
          f.toLowerCase().includes(query),
        );
        const specsMatch = specs.some(
          (s) =>
            s.label.toLowerCase().includes(query) ||
            s.value.toLowerCase().includes(query),
        );

        return nameMatch || tagMatch || catMatch || featuresMatch || specsMatch;
      });
    });

    return filtered;
  }, [categorizedProducts, searchQuery]);

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <section id="product" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subheading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <BlurText
              className="justify-center"
              text="Products"
              delay={30}
              animateBy="words"
              direction="bottom"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-dark-navy tracking-tight leading-tight">
            <BlurText
              className="justify-center"
              text="Explore Our Full Range of Lighting Products"
              highlightWords={["Full", "Range"]}
              delay={20}
              animateBy="words"
              direction="bottom"
            />
          </h2>
          <div className="text-slate-body font-medium text-sm sm:text-base">
            <BlurText
              className="justify-center"
              text="Find the perfect high-power backup, searchlight, or eco-friendly lamp. Filter and inspect the official RISING line-up."
              delay={10}
              animateBy="words"
              direction="bottom"
            />
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-lg mt-8 group">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur group-hover:bg-primary/15 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search products by name, specs (e.g. 10W, mAh)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full px-6 py-4 rounded-full border border-slate-200 bg-white/95 text-dark-navy font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm transition-all duration-300"
            />
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Capsules */}
        <div className="flex flex-row flex-nowrap overflow-x-auto justify-start md:justify-center gap-2.5 mt-8 mb-12 w-full max-w-5xl mx-auto scrollbar-none pb-2 md:pb-0 px-4">
          {WEBSITE_CATEGORIES.map((webCat) => {
            const isActive = activeCategory === webCat.id;
            const count = filteredCategorizedProducts[webCat.id]?.length || 0;
            return (
              <button
                key={webCat.id}
                onClick={() => {
                  setActiveCategory(webCat.id);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/15"
                    : "bg-white text-slate-600 border-slate-250 hover:border-slate-350 hover:bg-slate-50"
                }`}
              >
                {webCat.label}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Block */}
        <div className="mt-16">
          {currentWebCat &&
            (() => {
              const list = filteredCategorizedProducts[currentWebCat.id] || [];
              const isExpanded = expandedCategories[currentWebCat.id];
              // Show up to 8 products by default for the active category, expanded shows all
              const visibleProducts = isExpanded ? list : list.slice(0, 8);

              return (
                <motion.div
                  key={currentWebCat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50/40 rounded-[36px] p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)]"
                >
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-semibold text-dark-navy tracking-tight">
                        {currentWebCat.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-body font-medium max-w-xl">
                        {currentWebCat.desc}
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 self-start md:self-auto">
                      {list.length} {list.length === 1 ? "Product" : "Products"}{" "}
                      found
                    </div>
                  </div>

                  {/* Products Grid */}
                  {list.length === 0 ? (
                    <div className="text-center py-16 text-slate-body font-medium text-sm">
                      No products matching search in this category.
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleProducts.map((p, pIdx) => {
                          const { features, specs } = parseHtmlDescription(
                            p.descriptions.short,
                          );
                          const { wattage, capacity, batteryType } =
                            getQuickSpecs(specs, features);

                          return (
                            <motion.div
                              key={p.id}
                              initial={{
                                opacity: 0,
                                filter: "blur(6px)",
                                y: 25,
                              }}
                              whileInView={{
                                opacity: 1,
                                filter: "blur(0px)",
                                y: 0,
                              }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                duration: 0.45,
                                delay: (pIdx % 4) * 0.08,
                                ease: "easeOut",
                              }}
                              onClick={() => setSelectedProduct?.(p)}
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
                                    <div className="flex flex-col items-center justify-center text-slate-300">
                                      <svg
                                        className="w-12 h-12"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1}
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      <span className="text-[10px] uppercase font-bold tracking-wider mt-2">
                                        No Image
                                      </span>
                                    </div>
                                  )}

                                  {/* Tags (e.g. Bestselling / Top Product) */}
                                  {p.tags.includes("top-product") && (
                                    <span className="absolute top-3 left-3 bg-accent text-dark-navy text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                                      Best Seller
                                    </span>
                                  )}
                                </div>

                                {/* Titles */}
                                <div className="space-y-1">
                                  <h4 className="text-base sm:text-lg font-semibold text-dark-navy tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {p.name}
                                  </h4>
                                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-body font-medium">
                                    {p.brand && <span>{p.brand}</span>}
                                    {p.brand && p.categories[0] && (
                                      <span>•</span>
                                    )}
                                    {p.categories[0] && (
                                      <span>{p.categories[0]}</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Spec Badges & CTA */}
                              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                {/* Grid of badges */}
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
                                    <span
                                      className="bg-slate-50 text-slate-body text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 max-w-[120px] truncate"
                                      title={batteryType}
                                    >
                                      {batteryType}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-navy">
                                  <span>Inspect Specs</span>
                                  <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Show More toggle */}
                      {list.length > 8 && (
                        <div className="flex justify-center mt-10">
                          <button
                            onClick={() =>
                              toggleCategoryExpand(currentWebCat.id)
                            }
                            className="inline-flex items-center px-6 py-3 rounded-full text-xs font-semibold border border-primary/20 bg-white text-primary shadow-sm hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                          >
                            {isExpanded
                              ? "Show Less"
                              : `View All ${list.length} ${currentWebCat.label}`}
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })()}
        </div>
      </div>
    </section>
  );
}

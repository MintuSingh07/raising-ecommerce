"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import BlurText from "./BlurText";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
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
  Check,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: number;
    type: string;
    name: string;
    subtitle?: string;
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
    highlights?: any[];
    productFeatures?: any[];
    specs?: any[];
    applications?: any[];
    inBox?: any[];
    datasheetUrl?: string;
  };
  onClose: () => void;
}

// Clean and extract HTML descriptions into arrays
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

  // Fallback spec parsing for simpler formats
  if (specs.length === 0) {
    const labelSpanRegex = /<span class="label">(.*?)<\/span>\s*([^<]*)/g;
    const matches2 = html.matchAll(labelSpanRegex);
    for (const m of matches2) {
      const label = m[1]
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .trim();
      const value = m[2]
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .trim();
      if (label && value) {
        specs.push({ label, value });
      }
    }
  }

  return { features, specs };
}

function getCategorySlug(categoryName: string): string {
  const name = categoryName.toLowerCase().trim();
  if (name.includes("rechargeable led flash") || name.includes("flashlight")) return "rechargeable-led-flashlight";
  if (name.includes("kisan")) return "kisan-torch";
  if (name.includes("metal")) return "metal-flashlights";
  if (name.includes("headlamp")) return "led-headlamp";
  if (name.includes("table lamp")) return "led-table-lamp";
  if (name.includes("solar lantern")) return "solar-lantern-searchlight";
  if (name.includes("led lantern")) return "led-lantern";
  if (name.includes("usb lamp")) return "led-usb-lamp";
  if (name.includes("solar energy")) return "solar-energy-kit";
  if (name.includes("extension board")) return "power-extension-board";
  if (name.includes("village") || name.includes("remote")) return "village-remote";
  if (name.includes("corporate")) return "corporate-gifting";
  if (name.includes("defense") || name.includes("security")) return "defense-security";
  if (name.includes("farming") || name.includes("fields")) return "farming-fields";
  if (name.includes("industrial") || name.includes("yards")) return "industrial-yards";
  
  return name.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Helper to format highlights dynamically
function getFormattedHighlight(feat: string) {
  const cleanFeat = feat
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();

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
function getColorBubbleStyle(colorName: string): {
  bg: string;
  border: string;
  value: string;
} {
  const name = colorName.trim().toLowerCase();
  if (name.includes("red"))
    return { bg: "bg-red-600", border: "border-red-800", value: "Red" };
  if (name.includes("blue"))
    return { bg: "bg-blue-600", border: "border-blue-800", value: "Blue" };
  if (name.includes("yellow"))
    return {
      bg: "bg-yellow-500",
      border: "border-yellow-600",
      value: "Yellow",
    };
  if (name.includes("orange"))
    return {
      bg: "bg-orange-500",
      border: "border-orange-600",
      value: "Orange",
    };
  if (name.includes("green"))
    return {
      bg: "bg-emerald-600",
      border: "border-emerald-800",
      value: "Green",
    };
  if (name.includes("black"))
    return { bg: "bg-slate-900", border: "border-black", value: "Black" };
  if (name.includes("white"))
    return { bg: "bg-slate-100", border: "border-slate-350", value: "White" };
  return {
    bg: "bg-primary-navy",
    border: "border-primary-navy",
    value: colorName,
  };
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  const shortsRegExp = /\/shorts\/([a-zA-Z0-9_-]{11})/;
  const shortsMatch = cleanUrl.match(shortsRegExp);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  return null;
}

export default function ProductDetails({
  product,
  onClose,
}: ProductDetailsProps) {
  const { features, specs } = useMemo(
    () => parseHtmlDescription(product.descriptions.short),
    [product],
  );

  const { rating, reviews } = useMemo(() => {
    let numericId = typeof product.id === "number" ? product.id : parseInt(String(product.id), 10);
    if (isNaN(numericId)) {
      let hash = 0;
      const str = String(product.id);
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      numericId = Math.abs(hash);
    }
    // Generate deterministic rating between 4.5 and 5.0
    const r = 4.5 + ((numericId * 7 + 3) % 6) * 0.1;
    // Generate deterministic reviews count between 40 and 190
    const revs = 40 + ((numericId * 13 + 17) % 150);
    return { rating: parseFloat(r.toFixed(1)), reviews: revs };
  }, [product.id]);

  const filteredSpecs = useMemo(() => {
    const skipLabels = [
      "brand",
      "model name",
      "model name/number",
      "model number",
      "model",
    ];

    return specs.filter((spec) => {
      const labelLower = spec.label.trim().toLowerCase();
      if (skipLabels.includes(labelLower)) {
        return false;
      }

      const valClean = spec.value.trim().toLowerCase().replace(/\s+/g, "");
      if (!valClean) return false;

      if (valClean === "yes" || valClean === "no") {
        if (labelLower === "rechargeable") {
          return !features.some((feat) =>
            feat.toLowerCase().includes("recharge"),
          );
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
        if (
          labelLower.includes("usage") ||
          labelLower.includes("application")
        ) {
          const parts = spec.value.split(/[,/]/);
          return parts.some((part) =>
            featLower.includes(part.trim().toLowerCase().replace(/\s+/g, "")),
          );
        }

        return false;
      });

      return !isMentioned;
    });
  }, [specs, features]);

  const [selectedColor, setSelectedColor] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  const embedUrl = useMemo(() => {
    if (!product.video) return null;
    return getYouTubeEmbedUrl(product.video);
  }, [product.video]);

  const allImages = useMemo<string[]>(() => {
    const baseImages = product.media.images || [];
    if (selectedColor && product.variations && product.variations.length > 0) {
      const selectedVar = product.variations.find(
        (v: any) =>
          (v.attributes?.Colors || v.attributes?.colors || "")
            .trim()
            .toLowerCase() === selectedColor.trim().toLowerCase(),
      );

      const otherVarImages = new Set<string>();
      product.variations.forEach((v: any) => {
        const isSelected =
          (v.attributes?.Colors || v.attributes?.colors || "")
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
    return rawColors
      .split(",")
      .map((c: string) => c.trim())
      .filter(Boolean);
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
    const lumen = specs.find(
      (s) =>
        s.label.toLowerCase().includes("lumen") ||
        s.value.toLowerCase().includes("lumen"),
    );
    const watt = specs.find(
      (s) =>
        s.label.toLowerCase().includes("watt") ||
        s.label.toLowerCase().includes("power"),
    );
    if (lumen) {
      list.push({
        value: lumen.value.includes("Lumen")
          ? lumen.value
          : `${lumen.value} High Brightness`,
        key: "brightness",
      });
    } else if (watt) {
      list.push({ value: `${watt.value} High Power LED`, key: "brightness" });
    } else {
      const wattFeat = features.find(
        (f) => /\b\d+\s*W\b/i.test(f) || /\b\d+\s*Lumen\b/i.test(f),
      );
      if (wattFeat) list.push({ value: wattFeat, key: "brightness" });
    }

    // 2. Beam Range
    const range = specs.find(
      (s) =>
        s.label.toLowerCase().includes("range") ||
        s.label.toLowerCase().includes("beam") ||
        s.label.toLowerCase().includes("distance"),
    );
    if (range) {
      list.push({
        value:
          range.value.includes("Beam") || range.value.includes("Range")
            ? range.value
            : `${range.value} Beam Range`,
        key: "range",
      });
    } else {
      const rangeFeat = features.find(
        (f) =>
          f.toLowerCase().includes("beam") ||
          f.toLowerCase().includes("range") ||
          f.toLowerCase().includes("meters"),
      );
      if (rangeFeat) list.push({ value: rangeFeat, key: "range" });
    }

    // 3. Rechargeable Battery
    const cap = specs.find((s) => s.label.toLowerCase().includes("capacity"));
    const batType = specs.find((s) =>
      s.label.toLowerCase().includes("battery"),
    );
    if (cap) {
      list.push({ value: `${cap.value} Rechargeable Battery`, key: "battery" });
    } else if (batType) {
      list.push({ value: `${batType.value} Battery`, key: "battery" });
    } else {
      const batFeat = features.find(
        (f) =>
          f.toLowerCase().includes("battery") ||
          f.toLowerCase().includes("mah"),
      );
      if (batFeat) list.push({ value: batFeat, key: "battery" });
    }

    // 4. Backup Time
    const backup = specs.find(
      (s) =>
        s.label.toLowerCase().includes("backup") ||
        s.label.toLowerCase().includes("duration") ||
        s.label.toLowerCase().includes("time"),
    );
    if (backup) {
      list.push({
        value:
          backup.value.toLowerCase().includes("backup") ||
          backup.value.toLowerCase().includes("hours")
            ? backup.value
            : `Up to ${backup.value} Backup`,
        key: "backup",
      });
    } else {
      const backupFeat = features.find(
        (f) =>
          f.toLowerCase().includes("backup") ||
          f.toLowerCase().includes("duration") ||
          f.toLowerCase().includes("hours"),
      );
      if (backupFeat) list.push({ value: backupFeat, key: "backup" });
    }

    // 5. Body Material
    const material = specs.find(
      (s) =>
        s.label.toLowerCase().includes("material") ||
        s.label.toLowerCase().includes("body"),
    );
    if (material) {
      list.push({ value: `${material.value} Body`, key: "body" });
    } else {
      const materialFeat = features.find(
        (f) =>
          f.toLowerCase().includes("material") ||
          f.toLowerCase().includes("body") ||
          f.toLowerCase().includes("abs") ||
          f.toLowerCase().includes("aluminum"),
      );
      if (materialFeat) list.push({ value: materialFeat, key: "body" });
    }

    // 6. Protection
    const protectFeat = features.find(
      (f) =>
        f.toLowerCase().includes("protection") ||
        f.toLowerCase().includes("protect") ||
        f.toLowerCase().includes("safety") ||
        f.toLowerCase().includes("overcharg"),
    );
    if (protectFeat) {
      list.push({ value: protectFeat, key: "protection" });
    } else {
      const protectSpec = specs.find(
        (s) =>
          s.label.toLowerCase().includes("protection") ||
          s.label.toLowerCase().includes("safety"),
      );
      if (protectSpec)
        list.push({
          value: `${protectSpec.label}: ${protectSpec.value}`,
          key: "protection",
        });
    }

    return list;
  }, [specs, features]);

  const taglineTitles = useMemo(() => {
    const list: string[] = [];
    if (features[0]) {
      const title = getFormattedHighlight(features[0])
        .title.replace(/,$/, "")
        .trim()
        .toLowerCase();
      if (title) list.push(title);
    }
    if (features[1]) {
      const title = getFormattedHighlight(features[1])
        .title.replace(/,$/, "")
        .trim()
        .toLowerCase();
      if (title) list.push(title);
    }
    return list;
  }, [features]);

  const filteredFeatures = useMemo(() => {
    return features.filter((feat) => {
      const featLower = feat.toLowerCase();
      const featTitle = getFormattedHighlight(feat)
        .title.replace(/,$/, "")
        .trim()
        .toLowerCase();

      // 1. If it's featured in the tagline (top area tagline)
      if (taglineTitles.includes(featTitle)) {
        return false;
      }

      // 2. Exact or near-exact match in quickSpecs values
      const quickSpecsValues = quickSpecs.map((q) => q.value.toLowerCase());
      if (
        quickSpecsValues.some(
          (val) =>
            val === featLower ||
            featLower.includes(val) ||
            val.includes(featLower),
        )
      ) {
        return false;
      }

      // 3. Category/keyword check against quickSpecs keys
      const activeKeys = new Set(quickSpecs.map((q) => q.key));

      // - Wattage / LED check (brightness key)
      if (activeKeys.has("brightness")) {
        const wattMatch = featLower.match(/\b(\d+)\s*w\b/i);
        if (wattMatch) {
          const wattVal = wattMatch[1];
          const hasWattInQuick = quickSpecs.some((q) => {
            const qLower = q.value.toLowerCase();
            return (
              q.key === "brightness" &&
              (qLower.includes(`${wattVal}w`) ||
                qLower.includes(`${wattVal} w`))
            );
          });
          if (hasWattInQuick) return false;
        }
      }

      // - Battery Capacity check (battery key)
      if (activeKeys.has("battery")) {
        const capMatch = featLower.match(/\b(\d+)\s*mah\b/i);
        if (capMatch) {
          const capVal = capMatch[1];
          const hasCapInQuick = quickSpecs.some((q) => {
            const qLower = q.value.toLowerCase();
            return (
              q.key === "battery" &&
              (qLower.includes(`${capVal}mah`) ||
                qLower.includes(`${capVal} mah`))
            );
          });
          if (hasCapInQuick) return false;
        }
      }

      // - Overcharging / protection check (protection key)
      if (activeKeys.has("protection")) {
        if (
          featLower.includes("protection") ||
          featLower.includes("protect") ||
          featLower.includes("overcharge") ||
          featLower.includes("over-charge") ||
          featLower.includes("over discharge") ||
          featLower.includes("over-discharge")
        ) {
          return false;
        }
      }

      // - Backup check (backup key)
      if (activeKeys.has("backup")) {
        if (featLower.includes("backup")) {
          return false;
        }
      }

      return true;
    });
  }, [features, quickSpecs, taglineTitles]);

  // Parse Applications list strictly from the Usage/Application spec in JSON
  const applications = useMemo(() => {
    const appSpec = specs.find(
      (s) =>
        s.label.toLowerCase().includes("usage") ||
        s.label.toLowerCase().includes("application"),
    );
    if (!appSpec) return [];

    return appSpec.value
      .split(/,|;|and/i)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [specs]);

  // ── Unified structured detail/highlights lists utilizing custom selected database icons ──
  const highlightsList = useMemo(() => {
    if (product.highlights && product.highlights.length > 0) {
      return product.highlights.map((h: any) => {
        if (typeof h === "string") {
          return { text: h, icons: ["Check"] };
        }
        if (h.icons && Array.isArray(h.icons)) {
          return { text: h.text || "", icons: h.icons };
        }
        return { text: h.text || "", icons: [h.icon || "Check"] };
      });
    }
    // Fall back to computed quickSpecs
    return quickSpecs.map((q) => {
      let icon = "Check";
      if (q.key === "brightness") icon = "Sun";
      else if (q.key === "range") icon = "Navigation";
      else if (q.key === "battery") icon = "Battery";
      else if (q.key === "backup") icon = "Clock";
      else if (q.key === "body") icon = "Shield";
      else if (q.key === "protection") icon = "ShieldAlert";
      return { text: q.value, icons: [icon] };
    });
  }, [product.highlights, quickSpecs]);

  const featuresList = useMemo(() => {
    if (product.productFeatures && product.productFeatures.length > 0) {
      return product.productFeatures.map((f: any) => {
        if (f.icons && Array.isArray(f.icons)) {
          return { title: f.label, desc: f.detail, icons: f.icons };
        }
        return { title: f.label, desc: f.detail, icons: [f.icon || "Check"] };
      });
    }
    // Fall back to parsed HTML description
    return filteredFeatures.map((feat) => {
      const { title, desc } = getFormattedHighlight(feat);
      let icon = "Check";
      const titleLower = title.toLowerCase();
      if (titleLower.includes("led") || titleLower.includes("light") || titleLower.includes("smd") || titleLower.includes("bulb")) icon = "Lightbulb";
      else if (titleLower.includes("beam") || titleLower.includes("range") || titleLower.includes("spot") || titleLower.includes("reflector")) icon = "Navigation";
      else if (titleLower.includes("battery") || titleLower.includes("mah") || titleLower.includes("recharge")) icon = "Battery";
      else if (titleLower.includes("mode") || titleLower.includes("strobe") || titleLower.includes("operate")) icon = "Sliders";
      else if (titleLower.includes("body") || titleLower.includes("abs") || titleLower.includes("durable") || titleLower.includes("rugged") || titleLower.includes("material") || titleLower.includes("metal") || titleLower.includes("aluminium")) icon = "Shield";
      else if (titleLower.includes("protect") || titleLower.includes("safety") || titleLower.includes("overcharge")) icon = "ShieldCheck";
      return { title, desc, icons: [icon] };
    });
  }, [product.productFeatures, filteredFeatures]);

  const specsList = useMemo(() => {
    if (product.specs && product.specs.length > 0) {
      return product.specs.map((s: any) => {
        if (s.icons && Array.isArray(s.icons)) {
          return { label: s.label, value: s.value, icons: s.icons };
        }
        return { label: s.label, value: s.value, icons: [s.icon || "Check"] };
      });
    }
    // Fall back to parsed Technical specs
    return filteredSpecs.map((s) => {
      const labelLower = s.label.toLowerCase();
      let icon = "Check";
      if (labelLower.includes("lighting") || labelLower.includes("led") || labelLower.includes("type") || labelLower.includes("watt") || labelLower.includes("lumen") || labelLower.includes("bulb")) icon = "Lightbulb";
      else if (labelLower.includes("battery") || labelLower.includes("capacity") || labelLower.includes("charge")) icon = "Battery";
      else if (labelLower.includes("brand") || labelLower.includes("make")) icon = "Award";
      else if (labelLower.includes("usage") || labelLower.includes("application")) icon = "Sliders";
      return { label: s.label, value: s.value, icons: [icon] };
    });
  }, [product.specs, filteredSpecs]);

  // Parse What's in the Box strictly from the JSON model name & features keywords
  const whatsInTheBox = useMemo(() => {
    const list: string[] = [`1x RISING ${product.name}`];

    features.forEach((feat) => {
      const lower = feat.toLowerCase();
      if (
        lower.includes("belt") ||
        lower.includes("strap") ||
        lower.includes("lanyard")
      ) {
        if (lower.includes("belt")) list.push("1x Nylon Belt");
        else if (lower.includes("strap")) list.push("1x Shoulder Strap");
        else if (lower.includes("lanyard")) list.push("1x Lanyard");
      }
      if (
        lower.includes("adapter") ||
        lower.includes("charger") ||
        lower.includes("smps")
      ) {
        if (lower.includes("adapter")) list.push("1x SMPS Adapter");
        else if (lower.includes("charger")) list.push("1x Charger");
        else list.push("1x Power Adapter");
      }
      if (
        lower.includes("cable") ||
        lower.includes("usb") ||
        lower.includes("type-c")
      ) {
        list.push("1x USB Charging Cable");
      }
      if (
        lower.includes("battery") &&
        (lower.includes("dry") ||
          lower.includes("aa") ||
          lower.includes("provided"))
      ) {
        list.push("Dry Cell Batteries");
      }
    });

    return list;
  }, [product, features]);

  const detailedApplications = useMemo(() => {
    if (product.applications && product.applications.length > 0) {
      return product.applications.map((a: any) => {
        if (typeof a === "string") return { text: a, icons: [] };
        return { text: a.text || "", icons: a.icons || [] };
      });
    }
    // Fall back to legacy parsed array of strings
    return applications.map((app) => {
      const lower = app.toLowerCase();
      let icon = "Shield";
      if (lower.includes("industrial") || lower.includes("factory") || lower.includes("mining") || lower.includes("farming") || lower.includes("agriculture")) icon = "Factory";
      else if (lower.includes("security") || lower.includes("patrol") || lower.includes("signal") || lower.includes("defense")) icon = "Shield";
      else if (lower.includes("automotive") || lower.includes("car") || lower.includes("bus") || lower.includes("vehicle") || lower.includes("truck")) icon = "Car";
      else if (lower.includes("outdoor") || lower.includes("camping") || lower.includes("trekking") || lower.includes("forest") || lower.includes("tent")) icon = "Tent";
      else if (lower.includes("home") || lower.includes("household") || lower.includes("kitchen") || lower.includes("house")) icon = "Home";
      return { text: app, icons: [icon] };
    });
  }, [product.applications, applications]);

  const detailedInBox = useMemo(() => {
    if (product.inBox && product.inBox.length > 0) {
      return product.inBox.map((b: any) => {
        if (typeof b === "string") return { text: b, icons: [] };
        return { text: b.text || "", icons: b.icons || [] };
      });
    }
    // Fall back to legacy parsed inBox list
    return whatsInTheBox.map((boxItem) => {
      const lower = boxItem.toLowerCase();
      let icon = "Package";
      if (lower.includes("rising") || lower.includes("torch") || lower.includes("lantern") || lower.includes("headlamp") || lower.includes("lamp")) icon = "Package";
      else if (lower.includes("cable") || lower.includes("usb") || lower.includes("wire")) icon = "Usb";
      else if (lower.includes("strap") || lower.includes("belt") || lower.includes("lanyard")) icon = "Bookmark";
      else if (lower.includes("battery")) icon = "Battery";
      return { text: boxItem, icons: [icon] };
    });
  }, [product.inBox, whatsInTheBox]);

  return (
    <section className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-10">
        {/* Mobile Go Back button */}
        <div className="flex sm:hidden items-center mb-6">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors cursor-pointer bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-full shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
          <Link
            href="/"
            className="hover:text-primary cursor-pointer transition-colors uppercase"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <Link
            href="/products"
            className="hover:text-primary cursor-pointer transition-colors uppercase"
          >
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <Link
            href={`/collections/${getCategorySlug(product.categories[0] || "Lighting")}`}
            className="hover:text-primary cursor-pointer transition-colors uppercase"
          >
            {product.categories[0] || "Lighting"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
          <span className="text-primary font-semibold truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Top Split Block: Gallery and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Side: Product Gallery */}
          <div className="lg:col-span-6 space-y-5">
            {/* Main Image View - Dark Cinematic Backdrop with object-cover */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] rounded-[28px] flex items-center justify-center overflow-hidden shadow-premium group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.15)_0%,transparent_65%)] pointer-events-none" />

              {showVideo && product.video ? (
                <div className="absolute inset-0 w-full h-full bg-black z-25">
                  {embedUrl ? (
                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title={`${product.name} Video`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={product.video}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all hover:scale-105 z-30 cursor-pointer shadow-md flex items-center justify-center border-0"
                    title="Close Video"
                  >
                    <LucideIcons.X className="w-5 h-5" />
                  </button>
                </div>
              ) : allImages.length > 0 ? (
                <Image
                  src={allImages[activeImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-655">
                  <Package
                    className="w-16 h-16 text-slate-500"
                    strokeWidth={1}
                  />
                  <span className="text-xs uppercase font-extrabold tracking-wider mt-2">
                    No Image Available
                  </span>
                </div>
              )}

              {/* Best Seller Badge */}
              {!showVideo && (product.featured === 1 ||
                product.tags.includes("top-product")) && (
                <span className="absolute top-5 left-5 bg-accent text-dark-navy text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-md shadow-sm select-none tracking-wider z-10">
                  Best Seller
                </span>
              )}

              {/* Left/Right Slider Overlay Buttons */}
              {!showVideo && allImages.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      setActiveImageIndex(
                        (prev) =>
                          (prev - 1 + allImages.length) % allImages.length,
                      );
                      setShowVideo(false);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/85 flex items-center justify-center text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft
                      className="w-5 h-5 text-slate-800"
                      strokeWidth={2.5}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setActiveImageIndex(
                        (prev) => (prev + 1) % allImages.length,
                      );
                      setShowVideo(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/85 flex items-center justify-center text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight
                      className="w-5 h-5 text-slate-800"
                      strokeWidth={2.5}
                    />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails strip with object-cover and soft shadows (no borders) */}
            {(allImages.length > 1 || product.video) && (
              <div className="relative flex items-center w-full px-8 mt-4 select-none">
                {/* Left scroll arrow */}
                <button
                  onClick={() => {
                    if (thumbRef.current) {
                      thumbRef.current.scrollBy({
                        left: -120,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute left-0 w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                  aria-label="Scroll thumbnails left"
                >
                  <ChevronLeft
                    className="w-4.5 h-4.5 text-slate-800"
                    strokeWidth={2.5}
                  />
                </button>

                {/* Left edge fade out overlay */}
                <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />

                {/* Thumbnails list */}
                <div
                  ref={thumbRef}
                  className="flex flex-row flex-nowrap overflow-x-auto scrollbar-none gap-2.5 w-full scroll-smooth py-1"
                >
                  {allImages.map((img: string, idx: number) => {
                    const isActive = !showVideo && activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveImageIndex(idx);
                          setShowVideo(false);
                        }}
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
                      </button>
                    );
                  })}

                  {/* Dynamic Video Thumbnail */}
                  {product.video && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-xl bg-slate-900 overflow-hidden transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                        showVideo
                          ? "ring-2 ring-primary ring-offset-2 scale-102 shadow-md"
                          : "shadow-sm border border-slate-200 hover:scale-102"
                      }`}
                    >
                      {allImages[0] && (
                        <Image
                          src={allImages[0]}
                          alt="Video Thumbnail"
                          fill
                          loading="lazy"
                          className="object-cover opacity-40"
                          sizes="80px"
                        />
                      )}
                      <LucideIcons.Play className="w-5 h-5 text-white relative z-10" fill="white" />
                    </button>
                  )}
                </div>

                {/* Right edge fade out overlay */}
                <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

                {/* Right scroll arrow */}
                <button
                  onClick={() => {
                    if (thumbRef.current) {
                      thumbRef.current.scrollBy({
                        left: 120,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="absolute right-0 w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                  aria-label="Scroll thumbnails right"
                >
                  <ChevronRight
                    className="w-4.5 h-4.5 text-slate-800"
                    strokeWidth={2.5}
                  />
                </button>
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
              {product.subtitle ? (
                <p className="text-sm sm:text-base text-slate-body font-medium leading-relaxed max-w-xl">
                  {product.subtitle}
                </p>
              ) : (
                features.length > 0 && (
                  <p className="text-sm sm:text-base text-slate-body font-medium leading-relaxed max-w-xl">
                    {getFormattedHighlight(features[0]).title}.{" "}
                    {features[1]
                      ? getFormattedHighlight(features[1]).title
                      : "High performance illumination. Built for every challenge."}
                  </p>
                )
              )}
            </div>

            {/* Stars & Reviews */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-light select-none">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const starIndex = i;
                  const fillPercent = Math.min(Math.max(rating - starIndex, 0), 1) * 100;
                  const gradientId = `star-grad-${product.id}-${starIndex}`;

                  return (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                          <stop offset={`${fillPercent}%`} stopColor="#FBBF24" /> {/* amber-400 */}
                          <stop offset={`${fillPercent}%`} stopColor="#E2E8F0" /> {/* slate-200 */}
                        </linearGradient>
                      </defs>
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        fill={`url(#${gradientId})`}
                      />
                    </svg>
                  );
                })}
              </div>
              <span className="font-bold text-dark-navy">
                {rating} ({reviews} Reviews)
              </span>
              <span className="text-slate-200">|</span>
              <span>SKU: {product.sku || product.id}</span>
            </div>

            {/* Quick Specs Bullet List with Lucide Icons */}
            {highlightsList.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-dark-navy">
                  {highlightsList.map((item, idx) => {
                    const iconsArray = item.icons || [];
                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {iconsArray.map((iconName: string, iconIdx: number) => {
                            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Check;
                            return (
                              <IconComponent
                                key={iconIdx}
                                className="w-5 h-5 text-slate-705"
                                strokeWidth={2}
                              />
                            );
                          })}
                        </div>
                        <span className="text-slate-850 leading-tight font-medium">
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Color Swatch Selector */}
            {colorsList.length > 0 && (
              <div className="space-y-3 pt-2 select-none">
                <span className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                  Color:{" "}
                  <span className="font-semibold text-slate-body capitalize">
                    {selectedColor}
                  </span>
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
                        {isActive && (
                          <Check
                            className="w-4 h-4 text-white drop-shadow-sm"
                            strokeWidth={3.5}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 select-none">
              <a
                href={`https://wa.me/919468650719?text=${encodeURIComponent(`Hi! I'd like to know more about the RISING ${product.name}. Could you please share details on pricing, availability, and bulk orders?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start px-6 py-3.5 rounded-lg text-xs font-bold bg-primary text-white border border-primary hover:bg-primary-navy shadow-md shadow-primary/10 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2.5" strokeWidth={2} />
                  <span>Know more</span>
                </div>
                <div className="w-5 h-5 ml-4 rounded bg-white/20 flex items-center justify-center">
                  <ChevronRight
                    className="w-3.5 h-3.5 text-white"
                    strokeWidth={3}
                  />
                </div>
              </a>
              {product.datasheetUrl && (
                <a
                  href={`/api/public/download-datasheet?url=${encodeURIComponent(product.datasheetUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start px-6 py-3.5 rounded-lg text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Download Datasheet</span>
                  <Download
                    className="w-4.5 h-4.5 ml-6 text-slate-650"
                    strokeWidth={2.5}
                  />
                </a>
              )}
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
              <h4 className="text-sm font-bold text-dark-navy">
                OEM & Branding
              </h4>
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
              <h4 className="text-sm font-bold text-dark-navy">
                Fast Delivery
              </h4>
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
              <h4 className="text-sm font-bold text-dark-navy">
                Trusted Quality
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-body font-medium leading-relaxed">
                30+ years of excellence in lighting solutions
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Specifications, Highlights, and Box Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mb-16">
          {/* Combined Column 1 & 2: Specifications & Highlights details wrapper */}
          <div className="lg:col-span-9 bg-white border border-slate-100 rounded-[24px] p-6 sm:p-7.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
            {/* Box heading */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-dark-navy tracking-tight uppercase">
                Product Features
              </h3>
            </div>

            {featuresList.length > 0 || specsList.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                {/* Features */}
                {featuresList.map((item, idx) => {
                  if (!item.title) return null;
                  const iconsArray = item.icons || [];

                  return (
                    <li key={`feat-${idx}`} className="flex gap-4">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {iconsArray.map((iconName: string, iconIdx: number) => {
                          const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Check;
                          return (
                            <div key={iconIdx} className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center">
                              <IconComponent
                                className="w-4.5 h-4.5 text-primary"
                                strokeWidth={2}
                              />
                            </div>
                          );
                        })}
                        {iconsArray.length === 0 && (
                          <div className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center">
                            <LucideIcons.Check className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-dark-navy block leading-tight">
                          {item.title}
                        </span>
                        {item.desc && (
                          <span className="text-xs text-slate-body font-medium block leading-relaxed">
                            {item.desc}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}

                {/* Specs */}
                {specsList.map((item, idx) => {
                  const iconsArray = item.icons || [];

                  return (
                    <li key={`spec-${idx}`} className="flex gap-4">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {iconsArray.map((iconName: string, iconIdx: number) => {
                          const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Check;
                          return (
                            <div key={iconIdx} className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center">
                              <IconComponent
                                className="w-4.5 h-4.5 text-primary"
                                strokeWidth={2}
                              />
                            </div>
                          );
                        })}
                        {iconsArray.length === 0 && (
                          <div className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center">
                            <LucideIcons.Check className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-dark-navy block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-body font-medium block leading-relaxed">
                          {item.label.toLowerCase().includes("color") &&
                          colorsList.length > 0 ? (
                            <div className="flex gap-1.5 items-center mt-1">
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
                            item.value
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-slate-body font-medium">
                No details available for this model.
              </p>
            )}
          </div>

          {/* Column 3: Stacked Cards (Right) - Matching border card with drop shadow */}
          <div className="lg:col-span-3 space-y-6">
            {/* Card 1: Applications (Only render if parsed from JSON) */}
            {detailedApplications.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
                <h3 className="text-xs font-bold text-dark-navy uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 select-none">
                  Applications
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-body font-semibold">
                  {detailedApplications.map((item, idx) => {
                    const iconsArray = item.icons || [];
                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {iconsArray.map((iconName: string, iconIdx: number) => {
                            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Shield;
                            return (
                              <div key={iconIdx} className="w-5.5 h-5.5 rounded bg-blue-50/50 flex items-center justify-center">
                                <IconComponent
                                  className="w-3.5 h-3.5 text-primary"
                                  strokeWidth={2}
                                />
                              </div>
                            );
                          })}
                          {iconsArray.length === 0 && (
                            <div className="w-5.5 h-5.5 rounded bg-blue-50/50 flex items-center justify-center">
                              <LucideIcons.Shield className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                            </div>
                          )}
                        </div>
                        <span className="capitalize">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Card 2: What's in the Box */}
            {detailedInBox.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
                <h3 className="text-xs font-bold text-dark-navy uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 select-none">
                  What's in the Box
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-body font-semibold">
                  {detailedInBox.map((item, idx) => {
                    const iconsArray = item.icons || [];
                    return (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {iconsArray.map((iconName: string, iconIdx: number) => {
                            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Package;
                            return (
                              <div key={iconIdx} className="w-5.5 h-5.5 rounded bg-amber-50/50 flex items-center justify-center">
                                <IconComponent
                                  className="w-3.5 h-3.5 text-accent"
                                  strokeWidth={2}
                                />
                              </div>
                            );
                          })}
                          {iconsArray.length === 0 && (
                            <div className="w-5.5 h-5.5 rounded bg-amber-50/50 flex items-center justify-center">
                              <LucideIcons.Package className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                            </div>
                          )}
                        </div>
                        <span>{item.text}</span>
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

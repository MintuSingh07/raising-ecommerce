"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import {
  X,
  Plus,
  Check,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Category {
  id: string;
  label: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "rechargeable-led-flashlight", label: "Rechargeable LED Flash Light" },
  { id: "kisan-torch", label: "Kisan Torch" },
  { id: "metal-flashlights", label: "Metal Flash Lights" },
  { id: "led-headlamp", label: "LED Headlamp" },
  { id: "led-table-lamp", label: "LED Table Lamp" },
  { id: "solar-lantern-searchlight", label: "Solar Lantern and Search Light" },
  { id: "led-lantern", label: "LED Lantern" },
  { id: "led-usb-lamp", label: "LED USB Lamp" },
  { id: "solar-energy-kit", label: "Solar Energy Kit" },
  { id: "power-extension-board", label: "Power Extension Board" },
  { id: "village-remote", label: "Village & Remote" },
  { id: "corporate-gifting", label: "Corporate Gifting" },
  { id: "defense-security", label: "Defense & Security" },
  { id: "farming-fields", label: "Farming & Fields" },
  { id: "industrial-yards", label: "Industrial Yards" },
];

const PREDEFINED_COLORS = [
  { name: "Black", hex: "#1E293B" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Red", hex: "#EF4444" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#3B82F6" },
];

const AVAILABLE_ICONS = [
  { name: "Check", label: "Checkmark" },
  { name: "Sun", label: "Brightness / Light" },
  { name: "Zap", label: "Power / Wattage" },
  { name: "Battery", label: "Battery Capacity" },
  { name: "Clock", label: "Backup / Time" },
  { name: "Shield", label: "Protection / Durability" },
  { name: "Navigation", label: "Range / Distance" },
  { name: "Usb", label: "USB Output" },
  { name: "Lightbulb", label: "LED / Lightbulb" },
  { name: "Power", label: "Switch Button" },
  { name: "Wrench", label: "Tools / Setup" },
  { name: "Info", label: "General Info" },
  { name: "Activity", label: "Activity / Modes" },
  { name: "Sparkles", label: "Premium / Glow" }
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const CurrentIcon = (LucideIcons as any)[value] || LucideIcons.Check;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:border-[#0A52D6] rounded-lg bg-slate-50 hover:bg-blue-50/20 text-slate-600 hover:text-[#0A52D6] transition-all cursor-pointer shadow-3xs"
        title="Select Icon"
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-2.5 z-50 grid grid-cols-5 gap-1.5 w-[220px]">
            {AVAILABLE_ICONS.map((icon) => {
              const IconComp = (LucideIcons as any)[icon.name] || LucideIcons.Check;
              const isSelected = value === icon.name;
              return (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => {
                    onChange(icon.name);
                    setIsOpen(false);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#0A52D6] bg-blue-50 text-[#0A52D6]"
                      : "border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                  }`}
                  title={icon.label}
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

import { useMemo } from "react";

// Get list of all available Lucide icons dynamically from import
const ALL_LUCIDE_KEYS = Object.keys(LucideIcons).filter((key) => {
  return (
    /^[A-Z]/.test(key) &&
    (typeof (LucideIcons as any)[key] === "function" ||
      typeof (LucideIcons as any)[key] === "object") &&
    key !== "default"
  );
});

// A quick recommendation bar of popular product specs icons
const POPULAR_ICONS = [
  "Check",
  "Sun",
  "Zap",
  "Battery",
  "Clock",
  "Shield",
  "Navigation",
  "Usb",
  "Lightbulb",
  "Power",
  "Wrench",
  "Info",
  "Activity",
  "Sparkles",
  "Award",
  "Sliders",
  "Settings"
];

interface MultiIconPickerProps {
  value: string[];
  onChange: (icons: string[]) => void;
}

function MultiIconPicker({ value = [], onChange }: MultiIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredKeys = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return POPULAR_ICONS;
    return ALL_LUCIDE_KEYS.filter((key) => key.toLowerCase().includes(q)).slice(0, 32);
  }, [search]);

  const toggleIcon = (iconName: string) => {
    if (value.includes(iconName)) {
      onChange([]);
    } else {
      onChange([iconName]);
    }
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 px-2 border border-slate-200 rounded-xl bg-slate-50/50 w-full min-h-[38px]">
      {value.length === 0 ? (
        <span className="text-[10px] text-slate-400 font-bold select-none mr-2">No icon selected</span>
      ) : (
        <div className="flex flex-wrap gap-1">
          {value.map((iconName) => {
            const IconComp = (LucideIcons as any)[iconName] || LucideIcons.Check;
            return (
              <span
                key={iconName}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50/80 hover:bg-blue-100/80 text-[#0A52D6] text-[10px] font-bold rounded-lg border border-blue-100 transition-colors select-none"
              >
                <IconComp className="w-3 h-3 flex-shrink-0" />
                <span>{iconName}</span>
                <button
                  type="button"
                  onClick={() => toggleIcon(iconName)}
                  className="text-red-400 hover:text-[#EF4444] font-bold hover:scale-115 transition-transform cursor-pointer text-xs"
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div className="relative ml-auto shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-2.5 py-1 text-[10px] font-extrabold text-slate-500 hover:text-[#0A52D6] bg-white border border-slate-200 hover:border-[#0A52D6] rounded-lg transition-all cursor-pointer flex items-center gap-1 hover:shadow-2xs"
        >
          <Plus className="w-3 h-3" />
          {value.length > 0 ? "Change Icon" : "Select Icon"}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => { setIsOpen(false); setSearch(""); }} />
            <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 w-[240px] flex flex-col gap-2.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search 1000+ icons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-250 focus:border-[#0A52D6] rounded-lg text-xs bg-slate-50/50 focus:bg-white focus:outline-none"
                  autoFocus
                />
                <LucideIcons.Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="max-h-[160px] overflow-y-auto grid grid-cols-4 gap-1.5 pr-1">
                {filteredKeys.map((iconName) => {
                  const IconComp = (LucideIcons as any)[iconName] || LucideIcons.Check;
                  const isSelected = value.includes(iconName);
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => toggleIcon(iconName)}
                      className={`w-11 h-11 flex flex-col items-center justify-center rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#0A52D6] bg-blue-50 text-[#0A52D6]"
                          : "border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                      }`}
                      title={iconName}
                    >
                      <IconComp className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[7px] mt-0.5 truncate max-w-full text-slate-400 select-none">
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredKeys.length === 0 && (
                <span className="text-[10px] text-slate-400 text-center py-2">No matching icons</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProductFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); // if present, we are in Edit mode

  // States
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [dbProductId, setDbProductId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentEditId(editId);
  }, [editId]);

  // Accordion drop-down state for active color image sections
  const [expandedColor, setExpandedColor] = useState<string | null>(null);
  const [uploadingColor, setUploadingColor] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [catSearchQuery, setCatSearchQuery] = useState("");

  // Form state matching public/products_structured.json and mongoose model
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    subtitle: "",
    category: "",
    categories: [] as string[],
    badge: "",
    featured: false,
    rating: "5",
    reviewCount: "12",
    image: "",
    datasheetUrl: "",
    video: "",
    description: "",
    highlights: [] as { text: string; icons: string[] }[],
    productFeatures: [] as { label: string; detail: string; icons: string[] }[],
    specs: [] as { label: string; value: string; icons: string[] }[],
    colors: [] as { name: string; hex: string; image: string; gallery?: string[] }[],
    applications: [] as { text: string; icons: string[] }[],
    inBox: [] as { text: string; icons: string[] }[],
  });

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "File upload failed");
    }

    const data = await res.json();
    if (data.warning) {
      console.warn(data.warning);
    }
    return data.url;
  };

  // Fetch categories on mount
  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await fetch("/api/public/categories");
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
          if (catData.length > 0 && !currentEditId) {
            setProductForm((prev) => ({ ...prev, category: catData[0].id, categories: [catData[0].id] }));
          }
        }

        // If editing, fetch the specific product details
        if (currentEditId) {
          const prodRes = await fetch("/api/public/products");
          if (prodRes.ok) {
            const allProducts = await prodRes.json();
            const item = allProducts.find((p: any) => String(p.id).toLowerCase() === String(currentEditId).toLowerCase());
            if (item) {
              setDbProductId(item.id);
              setProductForm({
                id: item.id,
                name: item.name,
                subtitle: item.subtitle || "",
                category: item.category || "",
                categories: (item.rawCategories && item.rawCategories.length > 0) ? item.rawCategories : (item.category ? [item.category] : []),
                badge: item.badge || "",
                featured: !!item.featured,
                rating: String(item.rating ?? 5),
                reviewCount: String(item.reviewCount ?? 12),
                image: item.image || "",
                datasheetUrl: item.datasheetUrl || "",
                video: item.video || "",
                description: item.description || "",
                highlights: (item.highlights || []).map((h: any) => {
                  if (typeof h === "string") {
                    return { text: h, icons: ["Check"] };
                  }
                  if (h.icons && Array.isArray(h.icons)) {
                    return { text: h.text || "", icons: h.icons };
                  }
                  return { text: h.text || "", icons: [h.icon || "Check"] };
                }),
                productFeatures: (item.productFeatures || []).map((f: any) => {
                  if (f.icons && Array.isArray(f.icons)) {
                    return { label: f.label || "", detail: f.detail || "", icons: f.icons };
                  }
                  return { label: f.label || "", detail: f.detail || "", icons: [f.icon || "Check"] };
                }),
                specs: (item.specs || []).map((s: any) => {
                  if (s.icons && Array.isArray(s.icons)) {
                    return { label: s.label || "", value: s.value || "", icons: s.icons };
                  }
                  return { label: s.label || "", value: s.value || "", icons: [s.icon || "Check"] };
                }),
                colors: item.colors || [],
                applications: (item.applications || []).map((a: any) => {
                  if (typeof a === "string") return { text: a, icons: [] };
                  return { text: a.text || "", icons: a.icons || [] };
                }),
                inBox: (item.inBox || []).map((b: any) => {
                  if (typeof b === "string") return { text: b, icons: [] };
                  return { text: b.text || "", icons: b.icons || [] };
                }),
              });
            } else {
              setApiMessage({ type: "error", text: "Product not found." });
            }
          }
        }
      } catch (err: any) {
        setApiMessage({ type: "error", text: "Failed to load page data: " + err.message });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [currentEditId]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage(null);
    setIsSaving(true);

    const method = currentEditId ? "PUT" : "POST";
    const payload = {
      originalId: dbProductId || currentEditId || null,
      id: productForm.id,
      name: productForm.name,
      subtitle: productForm.subtitle,
      category: productForm.categories[0] || productForm.category || "",
      categories: productForm.categories.length > 0 ? productForm.categories : (productForm.category ? [productForm.category] : []),
      badge: productForm.badge,
      featured: productForm.featured,
      rating: Number(productForm.rating) || 5,
      reviewCount: Number(productForm.reviewCount) || 12,
      image: productForm.image || (productForm.colors[0]?.image || ""),
      gallery: productForm.colors.flatMap((c) => c.gallery || []),
      datasheetUrl: productForm.datasheetUrl,
      video: productForm.video,
      description: productForm.description,
      highlights: productForm.highlights.filter((h) => h.text.trim()),
      productFeatures: productForm.productFeatures.filter((f) => f.label.trim() && f.detail.trim()),
      specs: productForm.specs.filter((s) => s.label.trim() && s.value.trim()),
      colors: productForm.colors
        .filter((c) => c.name && c.hex)
        .map((c) => ({
          name: c.name,
          hex: c.hex,
          image: c.image || "",
          gallery: c.gallery || [],
        })),
      applications: productForm.applications.filter((a) => a.text.trim()),
      inBox: productForm.inBox.filter((b) => b.text.trim()),
    };

    try {
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      setApiMessage({ type: "success", text: currentEditId ? "Product updated successfully!" : "Product created successfully!" });
      
      // If we just created the product, transition to Edit mode in the URL so that subsequent saves use PUT
      if (!currentEditId && data.product && data.product.id) {
        setCurrentEditId(data.product.id);
        setDbProductId(data.product.id);
        window.history.replaceState(null, "", `/admin/products/edit?id=${data.product.id}`);
      }

      // Redirect back to dashboard page after short delay so they see the success banner
      setTimeout(() => {
        router.push("/admin?tab=products");
      }, 1000);
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600 font-sans p-6">
        <Loader2 className="w-10 h-10 animate-spin text-[#0A52D6] mb-3" />
        <p className="text-sm font-medium">Loading form details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* Top Header Section */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative h-[32px] w-[75px] block">
            <Image
              src="/logo.png"
              alt="RISING Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-extrabold text-[#0A52D6] uppercase tracking-wider bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded">
              Simple Product Creator
            </span>
            <h1 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
              {currentEditId ? `Edit Product: ${productForm.name}` : "Upload Product Details"}
            </h1>
          </div>
        </div>

        <button
          onClick={() => router.push("/admin?tab=products")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold rounded-lg text-xs cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Exit
        </button>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col">
          <form onSubmit={handleProductSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-200/60 pb-2">
                    <h4 className="text-sm font-extrabold text-[#0A52D6] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-5 h-px bg-[#0A52D6]" /> 1. Product Basics
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Identify this product, name it, and upload its main cover photo.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">SKU / Model Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. RT-4002"
                        value={productForm.id}
                        onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] font-mono text-sm bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Toofan"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] bg-white text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Subtitle / Short Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. 8000 mAh Rechargeable Li-ion battery, 10 W power, LED lamp"
                      value={productForm.subtitle}
                      onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Categories *</label>
                      <div className="relative">
                        {(() => {
                          const activeCategories = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
                          return (
                            <>
                              <button
                                type="button"
                                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-left bg-white text-sm font-bold flex items-center justify-between gap-1.5 focus:outline-none focus:border-[#0A52D6] shadow-3xs"
                              >
                                <span className="truncate">
                                  {productForm.categories && productForm.categories.length > 0
                                    ? productForm.categories
                                        .map((slug) => activeCategories.find((c) => c.id === slug)?.label || slug)
                                        .join(", ")
                                    : "Select Categories..."}
                                </span>
                                <LucideIcons.ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                              </button>

                              {isCatDropdownOpen && (
                                <>
                                  <div className="fixed inset-0 z-40" onClick={() => setIsCatDropdownOpen(false)} />
                                  <div className="absolute left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg p-2.5 space-y-2 max-h-64 overflow-y-auto">
                                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                      <LucideIcons.Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                      <input
                                        type="text"
                                        placeholder="Search categories..."
                                        value={catSearchQuery}
                                        onChange={(e) => setCatSearchQuery(e.target.value)}
                                        className="w-full bg-transparent text-xs focus:outline-none text-slate-700"
                                      />
                                      {catSearchQuery && (
                                        <button type="button" onClick={() => setCatSearchQuery("")} className="text-slate-450 hover:text-slate-600">
                                          <LucideIcons.X className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>

                                    <div className="space-y-1">
                                      {(() => {
                                        const filtered = activeCategories.filter((cat) =>
                                          cat.label.toLowerCase().includes(catSearchQuery.toLowerCase())
                                        );

                                        const productTypeCategories = filtered.filter((cat) =>
                                          [
                                            "rechargeable-led-flashlight",
                                            "kisan-torch",
                                            "metal-flashlights",
                                            "led-headlamp",
                                            "led-table-lamp",
                                            "solar-lantern-searchlight",
                                            "led-lantern",
                                            "led-usb-lamp",
                                            "solar-energy-kit",
                                            "power-extension-board"
                                          ].includes(cat.id)
                                        );

                                        const applicationCategories = filtered.filter((cat) =>
                                          [
                                            "village-remote",
                                            "corporate-gifting",
                                            "defense-security",
                                            "farming-fields",
                                            "industrial-yards"
                                          ].includes(cat.id)
                                        );

                                        const otherCategories = filtered.filter((cat) =>
                                          !productTypeCategories.some((c) => c.id === cat.id) &&
                                          !applicationCategories.some((c) => c.id === cat.id)
                                        );

                                        const renderGroup = (title: string, items: typeof activeCategories) => {
                                          if (items.length === 0) return null;
                                          return (
                                            <div className="space-y-1 pt-1.5 first:pt-0">
                                              <div className="text-[10px] font-extrabold text-[#0A52D6] uppercase tracking-wider px-2 py-0.5 bg-blue-50/50 rounded-sm mb-1">
                                                {title}
                                              </div>
                                              {items.map((cat) => {
                                                const isChecked = productForm.categories?.includes(cat.id);
                                                return (
                                                  <label
                                                    key={cat.id}
                                                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer select-none text-xs font-semibold text-slate-700"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={isChecked}
                                                      onChange={() => {
                                                        const updated = isChecked
                                                          ? (productForm.categories || []).filter((id) => id !== cat.id)
                                                          : [...(productForm.categories || []), cat.id];
                                                        setProductForm({
                                                          ...productForm,
                                                          categories: updated,
                                                          category: updated[0] || "",
                                                        });
                                                      }}
                                                      className="rounded border-slate-350 text-[#0A52D6] focus:ring-[#0A52D6]"
                                                    />
                                                    <span>{cat.label}</span>
                                                  </label>
                                                );
                                              })}
                                            </div>
                                          );
                                        };

                                        return (
                                          <div className="space-y-3">
                                            {renderGroup("Product Types", productTypeCategories)}
                                            {renderGroup("Applications & Target Uses", applicationCategories)}
                                            {renderGroup("Other Categories", otherCategories)}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer select-none pb-1 mt-6">
                      <div
                        onClick={() => setProductForm({ ...productForm, featured: !productForm.featured })}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          productForm.featured ? "bg-[#0A52D6]" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                            productForm.featured ? "translate-x-5" : ""
                          }`}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-600">Featured</span>
                    </label>
                  </div>


                  <div>
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Product Datasheet PDF</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Or enter PDF URL here..."
                        value={productForm.datasheetUrl}
                        onChange={(e) => setProductForm({ ...productForm, datasheetUrl: e.target.value })}
                        className="flex-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0A52D6]"
                      />
                      <input
                        type="file"
                        accept=".pdf"
                        id="pdf-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingColor("datasheet");
                          try {
                              const url = await uploadFile(file);
                              setProductForm({ ...productForm, datasheetUrl: url });
                            } catch (err: any) {
                              alert(err.message);
                            } finally {
                              setUploadingColor(null);
                            }
                          }}
                        />
                        <label
                          htmlFor="pdf-upload"
                          className="px-3 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg text-xs bg-slate-50 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          {uploadingColor === "datasheet" ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A52D6]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                          Upload PDF
                        </label>
                      </div>
                    </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Product Video</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Or enter Video URL here..."
                        value={productForm.video}
                        onChange={(e) => setProductForm({ ...productForm, video: e.target.value })}
                        className="flex-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0A52D6]"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        id="video-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingColor("video");
                          try {
                            const url = await uploadFile(file);
                            setProductForm({ ...productForm, video: url });
                          } catch (err: any) {
                            alert(err.message);
                          } finally {
                            setUploadingColor(null);
                          }
                        }}
                      />
                      <label
                        htmlFor="video-upload"
                        className="px-3 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg text-xs bg-slate-50 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        {uploadingColor === "video" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A52D6]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                        Upload Video
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-200/60 pb-2">
                    <h4 className="text-sm font-extrabold text-[#0A52D6] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-5 h-px bg-[#0A52D6]" /> 2. Colors & Images
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Select the active colors and upload matching product photos for each.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {PREDEFINED_COLORS.map((col) => {
                      const isEnabled = productForm.colors.some(
                        (c) => c.name.toLowerCase() === col.name.toLowerCase()
                      );
                      return (
                        <button
                          key={col.name}
                          type="button"
                          disabled={isEnabled}
                          onClick={() => {
                            let updated = [...productForm.colors];
                            if (isEnabled) {
                              updated = updated.filter(
                                (c) => c.name.toLowerCase() !== col.name.toLowerCase()
                              );
                            } else {
                              updated.push({ name: col.name, hex: col.hex, image: "", gallery: [] });
                            }
                            setProductForm({ ...productForm, colors: updated });
                          }}
                          className={`flex items-center gap-2 px-2.5 py-2.5 rounded-xl border text-left transition-all ${
                            isEnabled
                              ? "border-[#0A52D6]/60 bg-blue-50/20 opacity-75 cursor-not-allowed select-none"
                              : "border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-slate-200/50 shrink-0 shadow-2xs"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="text-sm font-bold text-slate-900 leading-none whitespace-nowrap shrink-0">
                            {col.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {productForm.colors.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {productForm.colors.map((color, ci) => {
                        const predefined = PREDEFINED_COLORS.find(
                          (c) => c.name.toLowerCase() === color.name.toLowerCase()
                        );
                        const hex = predefined ? predefined.hex : "#000000";
                        const sideImages = color.gallery || [];

                        return (
                          <div
                            key={color.name}
                            className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-3xs"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                              <div className="flex items-center gap-2.5">
                                <span
                                  className="w-4 h-4 rounded-full border border-slate-200/50 shadow-2xs"
                                  style={{ backgroundColor: hex }}
                                />
                                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                                  {color.name} Variant Media
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = productForm.colors.filter(
                                    (c) => c.name.toLowerCase() !== color.name.toLowerCase()
                                  );
                                  setProductForm({ ...productForm, colors: updated });
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-red-55 hover:text-red-600 cursor-pointer transition-all hover:scale-105"
                                title={`De-select ${color.name}`}
                              >
                                <X className="w-4 h-4" strokeWidth={2.25} />
                              </button>
                            </div>

                            <div className="space-y-3">
                              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Variant Images ({sideImages.length} uploaded)</span>
                              
                              {sideImages.length > 0 && (
                                <div className="grid grid-cols-5 gap-2 pb-2">
                                  {sideImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square group border border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center p-1.5 shadow-3xs">
                                      <img src={img} alt={`${color.name} preview ${idx}`} className="max-h-full max-w-full object-contain" />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...productForm.colors];
                                          const filtered = sideImages.filter((_, i) => i !== idx);
                                          updated[ci].gallery = filtered;
                                          updated[ci].image = filtered[0] || ""; // Auto-update hero photo fallback
                                          setProductForm({ ...productForm, colors: updated });
                                        }}
                                        className="absolute inset-0 bg-red-650/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  id={`images-${color.name}`}
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (files.length === 0) return;
                                    setUploadingColor(color.name);
                                    try {
                                      const urls: string[] = [];
                                      for (const file of files) {
                                        const url = await uploadFile(file);
                                        urls.push(url);
                                      }
                                      const updated = [...productForm.colors];
                                      const newGallery = [...(updated[ci].gallery || []), ...urls];
                                      updated[ci].gallery = newGallery;
                                      updated[ci].image = newGallery[0] || ""; // Auto-set first image as hero fallback
                                      setProductForm({ ...productForm, colors: updated });
                                    } catch (err: any) {
                                      alert(err.message);
                                    } finally {
                                      setUploadingColor(null);
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`images-${color.name}`}
                                  className="px-4 py-2.5 border border-dashed border-slate-300 hover:border-[#0A52D6] text-slate-600 hover:text-[#0A52D6] font-bold rounded-lg text-sm cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all flex items-center gap-1.5 shadow-3xs"
                                >
                                  {uploadingColor === color.name ? (
                                    <>
                                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A52D6]" />
                                      <span>Uploading images...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Upload {color.name} Product Images</span>
                                    </>
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN: Details & Plain Text Customization ── */}
              <div className="space-y-6">
                
                {/* CARD 3: Details & Custom Attributes */}
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-5">
                  <div className="border-b border-slate-200/60 pb-2">
                    <h4 className="text-sm font-extrabold text-[#0A52D6] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-5 h-px bg-[#0A52D6]" /> 3. Details & Specifications
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Define highlights, specifications, and details with custom Lucide icons.</p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-3">
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider">Quick Highlights</label>
                    <div className="space-y-4">
                      {productForm.highlights.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 shadow-2xs hover:border-slate-300 transition-colors">
                          <div className="flex gap-2.5 items-center">
                            <input
                              type="text"
                              required
                              placeholder="e.g. 8000 mAh Rechargeable Battery"
                              value={item.text}
                              onChange={(e) => {
                                const updated = [...productForm.highlights];
                                updated[idx].text = e.target.value;
                                setProductForm({ ...productForm, highlights: updated });
                              }}
                              className="flex-1 w-full px-3 py-2 border border-slate-200 focus:border-[#0A52D6] rounded-lg text-sm bg-slate-50/20 focus:bg-white focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = productForm.highlights.filter((_, i) => i !== idx);
                                setProductForm({ ...productForm, highlights: updated });
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg shrink-0 cursor-pointer transition-colors"
                              title="Delete Highlight"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Multi Icon Picker Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 select-none">Icons:</span>
                            <MultiIconPicker
                              value={item.icons || []}
                              onChange={(newIcons) => {
                                const updated = [...productForm.highlights];
                                updated[idx].icons = newIcons;
                                setProductForm({ ...productForm, highlights: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setProductForm({
                            ...productForm,
                            highlights: [...productForm.highlights, { text: "", icons: [] }],
                          })
                        }
                        className="text-sm text-[#0A52D6] hover:underline font-extrabold flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Highlight
                      </button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/60">
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider">Product Features</label>
                    <div className="space-y-4">
                      {productForm.productFeatures.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 shadow-2xs hover:border-slate-300 transition-colors">
                          <div className="flex gap-2.5 items-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                              <div>
                                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-0.5">Feature Title</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. USB Charging Port"
                                  value={item.label}
                                  onChange={(e) => {
                                    const updated = [...productForm.productFeatures];
                                    updated[idx].label = e.target.value;
                                    setProductForm({ ...productForm, productFeatures: updated });
                                  }}
                                  className="w-full px-3 py-2 border border-slate-200 focus:border-[#0A52D6] rounded-lg text-sm bg-slate-50/20 focus:bg-white focus:outline-none transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-0.5">Feature Detail</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Charge smartphones on the go"
                                  value={item.detail}
                                  onChange={(e) => {
                                    const updated = [...productForm.productFeatures];
                                    updated[idx].detail = e.target.value;
                                    setProductForm({ ...productForm, productFeatures: updated });
                                  }}
                                  className="w-full px-3 py-2 border border-slate-200 focus:border-[#0A52D6] rounded-lg text-sm bg-slate-50/20 focus:bg-white focus:outline-none transition-colors"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = productForm.productFeatures.filter((_, i) => i !== idx);
                                setProductForm({ ...productForm, productFeatures: updated });
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg shrink-0 cursor-pointer transition-colors mt-4"
                              title="Delete Feature"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Multi Icon Picker Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 select-none">Icons:</span>
                            <MultiIconPicker
                              value={item.icons || []}
                              onChange={(newIcons) => {
                                const updated = [...productForm.productFeatures];
                                updated[idx].icons = newIcons;
                                setProductForm({ ...productForm, productFeatures: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setProductForm({
                            ...productForm,
                            productFeatures: [...productForm.productFeatures, { label: "", detail: "", icons: [] }],
                          })
                        }
                        className="text-sm text-[#0A52D6] hover:underline font-extrabold flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Feature Row
                      </button>
                    </div>
                  </div>

                  {/* What's in the Box List */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/60">
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider">What's in the Box</label>
                    <div className="space-y-4">
                      {productForm.inBox.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 shadow-2xs hover:border-slate-300 transition-colors">
                          <div className="flex gap-2.5 items-center">
                            <input
                              type="text"
                              required
                              placeholder="e.g. 1x USB Charging Cable"
                              value={item.text}
                              onChange={(e) => {
                                const updated = [...productForm.inBox];
                                updated[idx].text = e.target.value;
                                setProductForm({ ...productForm, inBox: updated });
                              }}
                              className="flex-1 w-full px-3 py-2 border border-slate-200 focus:border-[#0A52D6] rounded-lg text-sm bg-slate-50/20 focus:bg-white focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = productForm.inBox.filter((_, i) => i !== idx);
                                setProductForm({ ...productForm, inBox: updated });
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg shrink-0 cursor-pointer transition-colors"
                              title="Delete Box Item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Multi Icon Picker Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 select-none">Icons:</span>
                            <MultiIconPicker
                              value={item.icons || []}
                              onChange={(newIcons) => {
                                const updated = [...productForm.inBox];
                                updated[idx].icons = newIcons;
                                setProductForm({ ...productForm, inBox: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setProductForm({
                            ...productForm,
                            inBox: [...productForm.inBox, { text: "", icons: [] }],
                          })
                        }
                        className="text-sm text-[#0A52D6] hover:underline font-extrabold flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Box Item
                      </button>
                    </div>
                  </div>

                  {/* Applications & Usage List */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/60">
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider">Applications & Usage</label>
                    <div className="space-y-4">
                      {productForm.applications.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 shadow-2xs hover:border-slate-300 transition-colors">
                          <div className="flex gap-2.5 items-center">
                            <input
                              type="text"
                              required
                              placeholder="e.g. Search & Rescue / Defense"
                              value={item.text}
                              onChange={(e) => {
                                const updated = [...productForm.applications];
                                updated[idx].text = e.target.value;
                                setProductForm({ ...productForm, applications: updated });
                              }}
                              className="flex-1 w-full px-3 py-2 border border-slate-200 focus:border-[#0A52D6] rounded-lg text-sm bg-slate-50/20 focus:bg-white focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = productForm.applications.filter((_, i) => i !== idx);
                                setProductForm({ ...productForm, applications: updated });
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg shrink-0 cursor-pointer transition-colors"
                              title="Delete Application"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Multi Icon Picker Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 select-none">Icons:</span>
                            <MultiIconPicker
                              value={item.icons || []}
                              onChange={(newIcons) => {
                                const updated = [...productForm.applications];
                                updated[idx].icons = newIcons;
                                setProductForm({ ...productForm, applications: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setProductForm({
                            ...productForm,
                            applications: [...productForm.applications, { text: "", icons: [] }],
                          })
                        }
                        className="text-sm text-[#0A52D6] hover:underline font-extrabold flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Application
                      </button>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-2 pt-3 border-t border-slate-200/60">
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider">Detailed Description</label>
                    <textarea
                      rows={4}
                      placeholder="Write any additional details or user instructions here..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] bg-white text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-slate-400 hover:text-[#0A52D6] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings (SEO / Rating overrides)"}
              </button>
              
              {showAdvanced && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Badge Label (e.g. NEW)</label>
                    <input
                      type="text"
                      placeholder="BEST SELLER"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-[#0A52D6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rating (0 - 5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={productForm.rating}
                      onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-[#0A52D6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Review Count</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.reviewCount}
                      onChange={(e) => setProductForm({ ...productForm, reviewCount: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-[#0A52D6]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin?tab=products")}
                className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 cursor-pointer text-sm transition-all shadow-3xs"
              >
                Cancel & Exit
              </button>
              
              {apiMessage && (
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium ${
                    apiMessage.type === "success"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                      : "bg-red-50 border-red-100 text-red-800"
                  }`}
                >
                  {apiMessage.type === "success" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  {apiMessage.text}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-2.5 bg-[#0A52D6] hover:bg-[#0B4294] disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl shadow-xs cursor-pointer text-sm transition-all flex items-center gap-1.5"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : currentEditId ? (
                  "Save Changes"
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400">
        <p>© 2026 RISING India. All rights reserved. System v1.0.0 (Alpha)</p>
      </footer>
    </div>
  );
}

export default function ProductFormClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600 font-sans p-6">
        <Loader2 className="w-10 h-10 animate-spin text-[#0A52D6] mb-3" />
        <p className="text-sm font-medium">Loading form context...</p>
      </div>
    }>
      <ProductFormContent />
    </Suspense>
  );
}

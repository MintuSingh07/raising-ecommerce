"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  HelpCircle,
  Trash2,
  Edit,
  Plus,
  Film,
  Image as ImageIcon,
  FileText,
  Check,
  AlertCircle,
  Loader2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
} from "lucide-react";

interface AdminDashboardClientProps {
  user: {
    name: string;
    email: string;
  };
  stats: {
    categories: number;
    products: number;
  };
}

type TabType = "dashboard" | "products" | "categories" | "settings" | "blogs" | "media" | "banners";

import { useRef } from "react";

function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const [isUploading, setIsUploading] = useState(false);

  // Sync value to editor ref on load
  useEffect(() => {
    if (editorRef.current && isFirstMount.current) {
      editorRef.current.innerHTML = value || "";
      isFirstMount.current = false;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (cmd: string, val: string = "") => {
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      exec("insertImage", data.url);
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      e.target.value = ""; // Reset
    }
  };

  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "Gray", hex: "#64748B" },
    { name: "Blue", hex: "#0A52D6" },
    { name: "Green", hex: "#16A34A" },
    { name: "Red", hex: "#EF4444" },
  ];

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-3xs flex flex-col min-h-[400px]">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-50 border-b border-slate-200 select-none">
        
        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => exec("undo")}
          className="p-2 px-3 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          title="Undo"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => exec("redo")}
          className="p-2 px-3 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          title="Redo"
        >
          Redo
        </button>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Text Formats */}
        <button
          type="button"
          onClick={() => exec("bold")}
          className="p-2.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Header Sizes */}
        <button
          type="button"
          onClick={() => exec("formatBlock", "h2")}
          className="p-2 px-3 text-xs font-extrabold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          title="Large Heading"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "h3")}
          className="p-2 px-3 text-xs font-extrabold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          title="Sub Heading"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "p")}
          className="p-2 px-3 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          title="Normal Text"
        >
          Paragraph
        </button>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Alignments */}
        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyCenter")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyRight")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="p-2.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition"
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter Link URL (e.g. https://google.com):");
            if (url) exec("createLink", url);
          }}
          className="p-2 px-3 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-[#0A52D6] hover:bg-slate-50 cursor-pointer transition flex items-center gap-1"
          title="Insert Link"
        >
          <LinkIcon className="w-3.5 h-3.5" /> Link
        </button>

        {/* Image Uploader */}
        <label
          className="p-2 px-3 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-[#16A34A] hover:bg-slate-50 cursor-pointer transition flex items-center gap-1 shadow-3xs"
          title="Upload Image"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          {isUploading ? "Uploading..." : "Insert Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>

        <div className="w-px h-6 bg-slate-250 mx-1" />

        {/* Text Color Picker */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-lg">
          <span className="text-[10px] font-extrabold uppercase text-slate-400">Color:</span>
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => exec("foreColor", c.hex)}
              className="w-4 h-4 rounded-full border border-slate-350 hover:scale-110 active:scale-95 transition cursor-pointer"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        {/* Clear formatting */}
        <button
          type="button"
          onClick={() => exec("removeFormat")}
          className="p-2 text-xs font-semibold rounded-lg bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 cursor-pointer transition ml-auto"
          title="Clear all text formatting"
        >
          Clear Style
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-6 flex-1 focus:outline-none prose max-w-none text-sm bg-white overflow-y-auto leading-relaxed border-t border-slate-100 min-h-[350px]"
        style={{ outline: "none" }}
      />
    </div>
  );
}

export default function AdminDashboardClient({ user, stats: initialStats }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Dynamic lists from DB
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);

  // Statistics
  const [stats, setStats] = useState(initialStats);

  // Loading/Operation states
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Categories Form state
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    label: "",
    desc: "",
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // Form Modals states
  const [activeModal, setActiveModal] = useState<"blog" | "media" | "banner" | null>(null);
  const [editItem, setEditItem] = useState<any>(null);

  // Sync tab with URL search parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['dashboard', 'products', 'categories', 'settings', 'blogs', 'media', 'banners'].includes(tab)) {
        setActiveTab(tab as TabType);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      window.history.pushState({}, '', url.toString());
    }
  }, [activeTab]);

  const [blogForm, setBlogForm] = useState({
    slug: "",
    title: "",
    category: "Insights",
    readTime: "",
    date: "",
    excerpt: "",
    image: "",
    accent: "from-blue-600/30 to-blue-900/60",
    htmlContent: "",
    author: "RISING Admin",
    authorRole: "Technical Team",
    tagsRaw: "",
  });

  const [mediaForm, setMediaForm] = useState({
    id: "",
    title: "",
    category: "Product",
  });

  const [bannerForm, setBannerForm] = useState({
    image: "",
  });

  // Fetch lists based on active tab
  useEffect(() => {
    async function loadTabData() {
      setIsLoading(true);
      try {
        if (activeTab === "products" || activeTab === "categories" || activeTab === "dashboard") {
          const res = await fetch("/api/public/products");
          if (res.ok) {
            const data = await res.json();
            setProducts(data);
            setStats(prev => ({ ...prev, products: data.length }));
          }
        }
        if (activeTab === "categories" || activeTab === "products" || activeTab === "dashboard") {
          const res = await fetch("/api/public/categories");
          if (res.ok) {
            const data = await res.json();
            setCategories(data);
            setStats(prev => ({ ...prev, categories: data.length }));
          }
        }
        if (activeTab === "blogs") {
          const res = await fetch("/api/public/blogs");
          if (res.ok) setBlogs(await res.json());
        }
        if (activeTab === "media") {
          const res = await fetch("/api/public/media");
          if (res.ok) setMedia(await res.json());
        }
        if (activeTab === "banners") {
          const res = await fetch("/api/public/banners");
          if (res.ok) setBanners(await res.json());
        }
      } catch (err) {
        console.error("Error loading tab data", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTabData();
  }, [activeTab]);

  const handleSignOut = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (isSeeding) return;
    setIsSeeding(true);
    setSeedSuccess(null);
    setSeedError(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Seeding failed");
      setSeedSuccess(data.message || "Seeding completed successfully!");
      setActiveTab("dashboard");
      router.refresh();
    } catch (err: any) {
      setSeedError(err.message || "An unexpected error occurred during seeding");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setApiMessage(null);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setApiMessage({ type: "success", text: "Product deleted successfully!" });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage(null);
    setIsSavingCategory(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");
      setApiMessage({ type: "success", text: "Category created successfully!" });
      setCategories(prev => {
        const updated = [...prev, data.category];
        return updated.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
      });
      setCategoryForm({ id: "", label: "", desc: "" });
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm(`Are you sure you want to delete the category "${id}"?`)) return;
    setApiMessage(null);
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setApiMessage({ type: "success", text: "Category deleted successfully!" });
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage(null);
    const method = editItem ? "PUT" : "POST";
    const payload = {
      ...blogForm,
      tags: blogForm.tagsRaw.split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");
      setApiMessage({ type: "success", text: editItem ? "Blog post updated!" : "Blog post created!" });
      setActiveModal(null);
      const newRes = await fetch("/api/public/blogs");
      if (newRes.ok) setBlogs(await newRes.json());
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setApiMessage(null);
    try {
      const res = await fetch(`/api/admin/blogs?slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setApiMessage({ type: "success", text: "Blog post deleted successfully!" });
      setBlogs(prev => prev.filter(b => b.slug !== slug));
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage(null);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mediaForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");
      setApiMessage({ type: "success", text: "YouTube video linked successfully!" });
      setActiveModal(null);
      const newRes = await fetch("/api/public/media");
      if (newRes.ok) setMedia(await newRes.json());
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to remove this video link?")) return;
    setApiMessage(null);
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setApiMessage({ type: "success", text: "Video link removed!" });
      setMedia(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage(null);
    try {
      const res = await fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bannerForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");
      setApiMessage({ type: "success", text: "Banner slide added successfully!" });
      setActiveModal(null);
      const newRes = await fetch("/api/public/banners");
      if (newRes.ok) setBanners(await newRes.json());
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteBanner = async (id: number) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    setApiMessage(null);
    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed");
      setApiMessage({ type: "success", text: "Banner deleted successfully!" });
      setBanners(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setApiMessage({ type: "error", text: err.message });
    }
  };

  const openBlogModal = (item?: any) => {
    setEditItem(item || null);
    if (item) {
      const legacyHtml = item.htmlContent || (
        (item.intro ? `<p><strong>${item.intro}</strong></p>` : "") +
        (item.sections || []).map((s: any) => `<h2>${s.heading}</h2>${(s.paragraphs || []).map((p: string) => `<p>${p}</p>`).join("")}`).join("")
      );
      setBlogForm({
        slug: item.slug || "",
        title: item.title || "",
        category: item.category || "Insights",
        readTime: item.readTime || "",
        date: item.date || "",
        excerpt: item.excerpt || "",
        image: item.image || "",
        accent: item.accent || "from-blue-600/30 to-blue-900/60",
        htmlContent: legacyHtml,
        author: item.author || "RISING Admin",
        authorRole: item.authorRole || "Technical Team",
        tagsRaw: (item.tags || []).join(", "),
      });
    } else {
      setBlogForm({
        slug: "",
        title: "",
        category: "Insights",
        readTime: "",
        date: "",
        excerpt: "",
        image: "",
        accent: "from-blue-600/30 to-blue-900/60",
        htmlContent: "",
        author: "RISING Admin",
        authorRole: "Technical Team",
        tagsRaw: "",
      });
    }
    setActiveModal("blog");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "blogs", label: "Blogs/Insights", icon: FileText },
    { id: "media", label: "Videos/Media", icon: Film },
    { id: "banners", label: "Home Banners", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div className="relative h-[32px] w-[75px]">
          <Image
            src="/logo.png"
            alt="RISING Logo"
            fill
            priority
            className="object-contain object-left"
          />
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
          <Link href="/" className="relative h-[38px] w-[88px] block">
            <Image
              src="/logo.png"
              alt="RISING Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A52D6] font-bold text-sm shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-900 truncate">{user.name}</h4>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-[#0A52D6]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#0A52D6]" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/25 md:hidden"
        />
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden p-4 sm:p-6 lg:p-8">
        
        {/* Main Content Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 sm:p-8 flex-1 flex flex-col overflow-y-auto">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0A52D6] uppercase tracking-wider bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded">
                Admin Panel
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5 capitalize">
                {activeTab} Management
              </h1>
            </div>
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {activeTab === "products" && (
                <button
                  onClick={() => router.push("/admin/products/new")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Product
                </button>
              )}
              {activeTab === "blogs" && (
                <button
                  onClick={() => openBlogModal()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Write Article
                </button>
              )}
              {activeTab === "media" && (
                <button
                  onClick={() => {
                    setMediaForm({ id: "", title: "", category: "Product" });
                    setActiveModal("media");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Link Video
                </button>
              )}
              {activeTab === "banners" && (
                <button
                  onClick={() => {
                    setBannerForm({ image: "" });
                    setActiveModal("banner");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Slide
                </button>
              )}
            </div>
          </div>

          {/* API notifications */}
          {apiMessage && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                apiMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                  : "bg-red-50 border-red-100 text-red-800"
              }`}
            >
              {apiMessage.type === "success" ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <p className="text-sm font-medium">{apiMessage.text}</p>
              <button onClick={() => setApiMessage(null)} className="ml-auto text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dynamic Content Panel */}
          <div className="flex-1 flex flex-col justify-between">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#0A52D6]/5 to-[#0B4294]/5 border border-[#0A52D6]/10 rounded-xl p-5">
                  <h2 className="text-lg font-bold text-[#0A52D6]">Welcome to your dashboard, {user.name}!</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    This admin panel allows you to edit and update all aspects of the Rising website dynamically. Build your catalog, adjust usage pages, and update contact queries here.
                  </p>
                </div>

                {stats.products === 0 && (
                  <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-5">
                    <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wider">Database Seeding Needed</h3>
                    <p className="text-slate-600 text-sm mt-1">
                      Your database is currently empty. Seed MongoDB with the existing categories and products from the website's structured data file (`products_structured.json`).
                    </p>
                    
                    {seedSuccess && <p className="mt-2 text-emerald-600 text-sm font-semibold">{seedSuccess}</p>}
                    {seedError && <p className="mt-2 text-red-600 text-sm font-semibold">{seedError}</p>}

                    <button
                      onClick={handleSeedDatabase}
                      disabled={isSeeding}
                      className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer transition-all"
                    >
                      {isSeeding ? "Seeding Database..." : "Import Original Products Data"}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Categories</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stats.categories}</h3>
                    <p className="text-slate-500 text-xs mt-1.5">Categories displayed on main site</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Products</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stats.products}</h3>
                    <p className="text-slate-500 text-xs mt-1.5">Products loaded in MongoDB</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Site Status</span>
                    <h3 className="text-lg font-bold text-emerald-600 flex items-center gap-1.5 mt-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live & Healthy
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5">Production builds compiling</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Getting Started</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      Manage lighting options by adding components directly in the **Products** tab.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      Create brand insights or upload installation guide articles inside **Blogs/Insights**.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      Add YouTube videos in **Videos/Media** or homepage sliders in **Home Banners**.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column: Create Category Card */}
                <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 space-y-4 lg:col-span-1">
                  <div className="border-b border-slate-200/60 pb-2">
                    <h3 className="text-sm font-extrabold text-[#0A52D6] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-5 h-px bg-[#0A52D6]" /> Create Category
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Add a new category for your website products.</p>
                  </div>

                  <form onSubmit={handleCreateCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-wider mb-1">
                        Category Label / Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tactical Lights"
                        value={categoryForm.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Auto-generate slug from label if slug field is empty or was auto-generated
                          const autoSlug = val.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-");
                          setCategoryForm((prev) => ({
                            ...prev,
                            label: val,
                            id: prev.id === "" || prev.id === autoSlug.substring(0, autoSlug.length - 1) ? autoSlug : prev.id,
                          }));
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0A52D6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-wider mb-1">
                        Category Slug / ID (lowercase, no spaces)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. tactical-lights"
                        value={categoryForm.id}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "");
                          setCategoryForm({ ...categoryForm, id: val });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0A52D6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Provide a brief overview for this product category..."
                        value={categoryForm.desc}
                        onChange={(e) => setCategoryForm({ ...categoryForm, desc: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0A52D6] leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingCategory}
                      className="w-full py-2 bg-[#0A52D6] hover:bg-[#0B4294] disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-lg shadow-xs cursor-pointer text-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSavingCategory ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" /> Create Category
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right Column: Categories List */}
                <div className="space-y-4 lg:col-span-2">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest">
                      Active Categories ({categories.length})
                    </h3>
                  </div>

                  {categories.length === 0 ? (
                    <div className="text-center py-12 text-slate-450 border border-dashed border-slate-200 rounded-xl">
                      No categories found in database. Create one on the left.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.map((cat) => {
                        const associatedCount = products.filter(
                          (p) => p.category?.toLowerCase() === cat.id?.toLowerCase()
                        ).length;

                        return (
                          <div
                            key={cat.id}
                            className="border border-slate-200 rounded-xl p-4 bg-white shadow-3xs flex flex-col justify-between hover:border-slate-350 transition-all group"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                                    {cat.label}
                                  </h4>
                                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mt-1">
                                    Slug: {cat.id}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                                  title={`Delete ${cat.label}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                                {cat.desc || "No description provided."}
                              </p>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Status
                              </span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                  associatedCount > 0
                                    ? "bg-blue-50 border-blue-100 text-[#0A52D6]"
                                    : "bg-slate-50 border-slate-100 text-slate-500"
                                }`}
                              >
                                {associatedCount} {associatedCount === 1 ? "Product" : "Products"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeTab === "products" && (
              <div className="flex-1 overflow-x-auto">
                {isLoading ? (
                  <div className="text-center py-12 text-slate-400">Loading products list...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No products found. Add products or seed the database.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50">
                        <th className="py-3 px-4 font-semibold text-slate-600">Image</th>
                        <th className="py-3 px-4 font-semibold text-slate-600">SKU/ID</th>
                        <th className="py-3 px-4 font-semibold text-slate-600">Name</th>
                        <th className="py-3 px-4 font-semibold text-slate-600">Category</th>
                        <th className="py-3 px-4 font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => (
                        <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50/30">
                          <td className="py-3 px-4">
                            <div className="relative w-10 h-10 rounded border border-slate-100 overflow-hidden bg-slate-50">
                              <img src={prod.image || "/logo.png"} alt={prod.name} className="w-full h-full object-contain" />
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-500">{prod.id}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{prod.name}</td>
                          <td className="py-3 px-4">
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => router.push(`/admin/products/edit?id=${prod.id}`)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}


            {activeTab === "blogs" && (
              <div className="space-y-4 flex-1">
                {isLoading ? (
                  <div className="text-center py-12 text-slate-400">Loading blog articles...</div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No articles found. Add one by clicking Write Article.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {blogs.map((b) => (
                      <div key={b.slug} className="border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start bg-slate-50/20">
                        {b.image && (
                          <img src={b.image} alt={b.title} className="w-24 h-20 object-cover rounded border border-slate-100 shrink-0" />
                        )}
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 font-semibold px-2 py-0.5 rounded">
                              {b.category}
                            </span>
                            <span className="text-xs text-slate-400">{b.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base mt-2">{b.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.excerpt}</p>
                        </div>
                        <div className="flex gap-2 self-stretch sm:self-center justify-end">
                          <button onClick={() => openBlogModal(b)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteBlog(b.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "media" && (
              <div className="space-y-4 flex-1">
                {isLoading ? (
                  <div className="text-center py-12 text-slate-400">Loading media library...</div>
                ) : media.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No videos found. Link a YouTube video.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {media.map((vid) => (
                      <div key={vid.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-slate-50/20">
                        <div className="relative w-28 aspect-video rounded overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                          <img src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} alt={vid.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{vid.category}</span>
                            <h4 className="font-bold text-slate-900 text-xs mt-1.5 line-clamp-2">{vid.title}</h4>
                          </div>
                          <button onClick={() => handleDeleteMedia(vid.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 mt-2">
                            <Trash2 className="w-3.5 h-3.5" /> Remove Link
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "banners" && (
              <div className="space-y-4 flex-1">
                {isLoading ? (
                  <div className="text-center py-12 text-slate-400">Loading home banners...</div>
                ) : banners.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No banners found. Add banner slides to homepage slider.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {banners.map((ban) => (
                      <div key={ban.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/20 flex flex-col justify-between">
                        <div className="relative w-full aspect-video rounded overflow-hidden border border-slate-100 bg-slate-100">
                          <img src={ban.image} alt={`Slide ${ban.id}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs font-bold text-slate-500 font-mono">Slide #{ban.id}</span>
                          <button onClick={() => handleDeleteBanner(ban.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 max-w-lg">
                <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                  <h3 className="font-bold text-slate-900">Admin Account Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">User Role</p>
                      <p className="text-slate-900 font-medium mt-0.5">Administrator</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">Name</p>
                      <p className="text-slate-900 font-medium mt-0.5">{user.name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-400 text-xs uppercase font-semibold">Email Address</p>
                      <p className="text-slate-900 font-medium mt-0.5">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3">Database Management</h3>
                  <p className="text-slate-500 text-sm mb-3">
                    If you want to clear the database and re-seed it with the original categories and products from `products_structured.json`, click the button below:
                  </p>
                  
                  {seedSuccess && <p className="mb-2 text-emerald-600 text-sm font-semibold">{seedSuccess}</p>}
                  {seedError && <p className="mb-2 text-red-600 text-sm font-semibold">{seedError}</p>}

                  <button
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-lg text-sm shadow-xs cursor-pointer transition-all"
                  >
                    {isSeeding ? "Seeding Database..." : "Import/Re-seed Original Data"}
                  </button>
                </div>
              </div>
            )}

            {/* Footer Notice */}
            <div className="border-t border-slate-100 pt-4 mt-8 flex justify-between items-center text-xs text-slate-400">
              <p>© 2026 RISING India. All rights reserved.</p>
              <p>System v1.0.0 (Alpha)</p>
            </div>
          </div>

        </div>
      </main>



      {/* Blog Post Add/Edit Modal */}

      {/* Blog Post Add/Edit Modal */}
      {activeModal === "blog" && (
        <div className="fixed inset-0 z-[100] bg-slate-50 overflow-y-auto flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-6 bg-white border-x border-slate-200/60 shadow-xs">
            
            {/* Header */}
            <div className="pb-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <span className="text-xs font-bold text-[#0A52D6] uppercase tracking-wider bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded">
                  Blog Editor
                </span>
                <h3 className="font-extrabold text-slate-900 text-2xl tracking-tight mt-1.5">
                  {editItem ? "Edit Article" : "Write New Article"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50 cursor-pointer shadow-3xs transition-all"
              >
                <X className="w-4 h-4" /> Exit Editor
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="py-6 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Why Rechargeable Flashlights Are the Future"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] focus:ring-1 focus:ring-[#0A52D6] bg-slate-50/20 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Category *</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-[#0A52D6] font-bold"
                    >
                      <option value="Insights">Insights</option>
                      <option value="Story">Story</option>
                      <option value="Product">Product</option>
                      <option value="Guide">Guide</option>
                      <option value="Brand">Brand</option>
                    </select>
                  </div>
                </div>

                {/* Featured Cover Image Upload */}
                <div>
                  <label className="block text-sm font-extrabold text-slate-550 uppercase tracking-wider mb-1">Featured Cover Image *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Upload cover image or enter URL..."
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] bg-slate-50/20 font-semibold"
                    />
                    <label className="shrink-0 px-4 py-2 border border-slate-250 hover:border-slate-350 text-slate-700 bg-slate-50 hover:bg-slate-100 font-semibold rounded-lg text-sm transition-all shadow-3xs cursor-pointer select-none">
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();
                            if (!res.ok) throw new Error(data.error || "Upload failed");
                            setBlogForm({ ...blogForm, image: data.url });
                          } catch (err: any) {
                            alert(`Upload failed: ${err.message}`);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {blogForm.image && (
                    <div className="mt-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200 max-w-[200px] relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={blogForm.image} alt="Preview" className="rounded-lg object-contain w-full max-h-[120px] bg-white border border-slate-100" />
                    </div>
                  )}
                </div>

                {/* Rich Content Editor */}
                <div>
                  <label className="block text-sm font-extrabold text-slate-555 uppercase tracking-wider mb-1.5">Article Content *</label>
                  <RichTextEditor
                    value={blogForm.htmlContent}
                    onChange={(html) => setBlogForm({ ...blogForm, htmlContent: html })}
                  />
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 cursor-pointer text-sm shadow-3xs transition-all"
                >
                  Cancel & Exit
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-xl shadow-xs cursor-pointer text-sm transition-all font-bold"
                >
                  {editItem ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Media Link Modal */}
      {activeModal === "media" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
              <h3 className="font-extrabold text-slate-900 text-base">Link YouTube Video</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleMediaSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">YouTube Video ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. umJrIUCI13c"
                  value={mediaForm.id}
                  onChange={(e) => setMediaForm({ ...mediaForm, id: e.target.value })}
                  className="w-full text-base px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6] font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">This is the string of characters at the end of the YouTube video link.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Showcase Film"
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  className="w-full text-base px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category *</label>
                <select
                  value={mediaForm.category}
                  onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                  className="w-full text-base px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Product">Product</option>
                  <option value="Campaign">Campaign</option>
                  <option value="Brand">Brand</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg cursor-pointer"
                >
                  Link Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Add Modal */}
      {activeModal === "banner" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
              <h3 className="font-extrabold text-slate-900 text-base">Add Banner Slide</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleBannerSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Image Path/URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /banner-1.png"
                  value={bannerForm.image}
                  onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                  className="w-full text-base px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A52D6]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A52D6] hover:bg-[#0B4294] text-white font-semibold rounded-lg cursor-pointer"
                >
                  Add Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

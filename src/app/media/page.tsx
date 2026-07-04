"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Home, ChevronRight, Play, X, Clock, ArrowUpRight } from "lucide-react";

// ─── Blog posts data ───────────────────────────────────────────────────────
const blogs = [
  {
    slug: "why-rechargeable-flashlights-are-future",
    category: "Insights",
    date: "June 18, 2025",
    readTime: "4 min read",
    title: "Why Rechargeable Flashlights Are the Future of Portable Lighting",
    excerpt:
      "From farming fields to construction sites, rechargeable LED flashlights are replacing disposable-battery torches across India. Here's why the shift is permanent.",
    image: "/product_torch.png",
    accent: "from-blue-600/30 to-blue-900/60",
  },
  {
    slug: "kisan-torch-revolutionising-rural-india",
    category: "Story",
    date: "May 5, 2025",
    readTime: "5 min read",
    title: "Kisan Torch: Revolutionising Nighttime Work in Rural India",
    excerpt:
      "Millions of Indian farmers work before dawn and after dusk. The RISING Kisan Torch was engineered specifically for this reality — long beam, tough build, USB rechargeable.",
    image: "/product_torch.png",
    accent: "from-emerald-600/30 to-emerald-900/60",
  },
  {
    slug: "solar-energy-kit-power-every-home",
    category: "Product",
    date: "April 22, 2025",
    readTime: "3 min read",
    title: "Solar Energy Kit: Bringing Light to Off-Grid Homes",
    excerpt:
      "With reliable solar panels and a compact storage unit, the RISING Solar Energy Kit delivers consistent power even in areas with no grid connectivity.",
    image: "/product_emergency.png",
    accent: "from-amber-500/30 to-orange-900/60",
  },
  {
    slug: "led-headlamp-hands-free-guide",
    category: "Guide",
    date: "March 10, 2025",
    readTime: "4 min read",
    title: "A Complete Guide to Choosing the Right LED Headlamp",
    excerpt:
      "Trekking, mining, or emergency use — not all headlamps are built equal. This guide breaks down lumen counts, beam angles, and battery life so you buy right.",
    image: "/product_headlamp.png",
    accent: "from-violet-600/30 to-violet-900/60",
  },
  {
    slug: "metal-flashlights-vs-plastic",
    category: "Insights",
    date: "February 14, 2025",
    readTime: "3 min read",
    title: "Metal vs Plastic Flashlights: Which One Should You Buy?",
    excerpt:
      "Both have their place, but for heavy-duty professional and outdoor use, metal-body flashlights consistently outperform plastic counterparts in durability and heat dissipation.",
    image: "/product_torch.png",
    accent: "from-slate-600/30 to-slate-900/60",
  },
  {
    slug: "rising-35-years-lighting-india",
    category: "Brand",
    date: "January 1, 2025",
    readTime: "6 min read",
    title: "35 Years of Lighting India: The RISING Story",
    excerpt:
      "From a small enterprise in Jodhpur to one of India's leading portable lighting manufacturers — the RISING journey is a story of perseverance, quality, and light.",
    image: "/product_lantern.png",
    accent: "from-primary/30 to-dark-navy/80",
  },
];

// ─── Video data ────────────────────────────────────────────────────────────
const videos = [
  { id: "umJrIUCI13c", title: "RISING LED Flashlight – Product Showcase", category: "Product" },
  { id: "8KGcwPhTk5A", title: "Kisan Torch by RISING – For Every Farmer", category: "Campaign" },
  { id: "KRYuhZwbRpU", title: "RISING Metal Flashlights – Built to Last", category: "Product" },
  { id: "7vixOxaaBgo", title: "LED Headlamp – Hands-Free Precision Light", category: "Product" },
  { id: "wekWWH1e-wk", title: "RISING Solar Energy Kit – Power Every Home", category: "Campaign" },
  { id: "yZPW2WzXNTY", title: "LED Table Lamp – Smart Desk Lighting", category: "Product" },
  { id: "eS1YM8-1Jh4", title: "RISING LED Lantern – Emergency Ready", category: "Campaign" },
  { id: "FfLLhq2R5DY", title: "RISING – Lighting the Future of India", category: "Brand" },
];

const MASONRY_HEIGHTS = [
  "aspect-[9/14]", "aspect-[9/12]", "aspect-[9/16]", "aspect-[9/13]",
  "aspect-[9/15]", "aspect-[9/11]", "aspect-[9/14]", "aspect-[9/16]",
];

// ─── Section label helper ──────────────────────────────────────────────────
function SectionLabel({ text, count }: { text: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/10 text-xs font-medium uppercase tracking-wider text-primary">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        {text}
      </div>
      {count !== undefined && (
        <span className="text-xs text-slate-400 font-medium">{count} {text.toLowerCase()}</span>
      )}
    </div>
  );
}

import { useEffect } from "react";

// ─── Page ─────────────────────────────────────────────────────────────────
export default function MediaPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [videosList, setVideosList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [bRes, vRes] = await Promise.all([
          fetch("/api/public/blogs"),
          fetch("/api/public/media"),
        ]);
        if (bRes.ok) {
          const bData = await bRes.json();
          setBlogsList(bData);
        }
        if (vRes.ok) {
          const vData = await vRes.json();
          setVideosList(vData);
        }
      } catch (err) {
        console.error("Error fetching media data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
            <Link href="/" className="hover:text-primary transition-colors uppercase flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <span className="text-primary uppercase font-bold">Media</span>
          </nav>

          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-dark-navy to-slate-950 text-white p-8 sm:p-12 md:p-16 mb-16 shadow-premium border border-white/5 flex flex-col items-start gap-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
                Media &amp; Stories
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight uppercase">
                Stories, Films &amp; Insights
              </h1>
              <p className="text-sm sm:text-base text-blue-50/80 leading-relaxed font-medium">
                Explore our product films, campaigns, expert articles and brand stories — all in one place.
              </p>
            </div>
            <div className="absolute right-8 bottom-8 sm:right-16 sm:bottom-12 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-30 pointer-events-none">
              <Play className="w-8 h-8 sm:w-14 sm:h-14 text-white fill-white" />
            </div>
          </div>

          {/* ── BLOGS ────────────────────────────────────────────────────── */}
          <SectionLabel text="Blog" count={isLoading ? undefined : blogsList.length} />

          {/* Blog cards grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-[28px] bg-slate-50 border border-slate-100 h-96" />
              ))}
            </div>
          ) : blogsList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm mb-24">
              No blog posts found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {blogsList.map((blog, idx) => (
                <Link
                  key={idx}
                  href={`/media/blog/${blog.slug}`}
                  className="group flex flex-col rounded-[28px] overflow-hidden bg-white border border-slate-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-350 cursor-pointer"
                >
                  {/* Full-bleed image with gradient scrim */}
                  <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${blog.accent || "from-blue-600/30 to-blue-900/60"} flex-shrink-0`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.image || "/logo.png"}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110 mix-blend-luminosity opacity-70"
                    />
                    {/* Bottom scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Category pill — floats top-left */}
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm">
                      {blog.category}
                    </span>

                    {/* Date — bottom-left on image */}
                    <span className="absolute bottom-4 left-4 text-[10px] font-semibold text-white/70 tracking-wide">
                      {blog.date}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all duration-200">
                        Read Article
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── VIDEOS ───────────────────────────────────────────────────── */}
          <SectionLabel text="Videos" count={isLoading ? undefined : videosList.length} />

          {/* Pinterest-style Masonry Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-20">
              {[1, 2, 4, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-slate-900 border border-slate-800 h-48" />
              ))}
            </div>
          ) : videosList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm pb-20">
              No videos found.
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 pb-20 [column-fill:_balance]">
              {videosList.map((video, idx) => (
                <div
                  key={video.id}
                  className={`break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-md hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-pointer ${MASONRY_HEIGHTS[idx % MASONRY_HEIGHTS.length]}`}
                  onClick={() => setActiveVideo(video.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${video.title}`}
                  onKeyDown={(e) => e.key === "Enter" && setActiveVideo(video.id)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-primary/80 group-hover:border-primary/60 transition-all duration-300 shadow-lg">
                      <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/80 border border-white/10">
                      {video.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-2 drop-shadow-lg">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Video Lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="media-lightbox-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute -top-10 right-0 z-10 flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold transition-colors"
            >
              Close
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

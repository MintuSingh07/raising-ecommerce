"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Home, ChevronRight, ArrowLeft, Clock, Calendar, Share2, Tag, BookOpen } from "lucide-react";

// Full blog content database
const BLOG_POSTS: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    accent: string;
    intro: string;
    sections: { heading: string; paragraphs: string[] }[];
    author: string;
    authorRole: string;
    tags: string[];
  }
> = {
  "why-rechargeable-flashlights-are-future": {
    title: "Why Rechargeable Flashlights Are the Future of Portable Lighting",
    category: "Insights",
    date: "June 18, 2025",
    readTime: "4 min read",
    image: "/product_torch.png",
    accent: "from-blue-600/30 to-blue-900/60",
    intro:
      "For decades, households and workers across India relied on heavy, plastic dry-cell torches that devoured carbon-zinc batteries. Today, a permanent shift is underway. Rechargeable LED flashlights have emerged as the standard, outperforming legacy options in cost efficiency, environmental sustainability, and lighting performance.",
    sections: [
      {
        heading: "1. Massive Long-Term Cost Savings",
        paragraphs: [
          "While a legacy dry-cell flashlight might have a low upfront cost, the continuous expense of replacing AA or D-cell batteries adds up quickly. A typical user might spend thousands of rupees annually on replacement cells.",
          "In contrast, rechargeable flashlights feature high-capacity lithium-ion or lead-acid batteries designed for hundreds of charge cycles. Recharging a flashlight costs only a fraction of a rupee in electricity, making it pay for itself within the first few months of active use.",
        ],
      },
      {
        heading: "2. Consistently Brighter & Stable Beam Output",
        paragraphs: [
          "Legacy flashlights suffer from gradual voltage drop, meaning the light slowly dims as the battery drains. If you need reliable illumination for an emergency, a fading yellow beam is a major liability.",
          "Modern RISING rechargeable flashlights utilize advanced constant-current drivers. They maintain an incredibly bright, uniform beam right up until the battery requires a recharge, ensuring maximum visibility when you need it most.",
        ],
      },
      {
        heading: "3. Reduced Environmental Impact & E-Waste",
        paragraphs: [
          "Disposable batteries are one of the leading contributors to heavy metal soil pollution and landfill contamination. Most dry cells in India are disposed of in household waste rather than specialized recycling units.",
          "By choosing a rechargeable LED torch, you prevent hundreds of single-use batteries from ending up in landfills. RISING is committed to developing energy-efficient charging systems that lower carbon footprints.",
        ],
      },
    ],
    author: "Arun Mehra",
    authorRole: "Technical Director",
    tags: ["LED Technology", "Sustainability", "Product Guide"],
  },
  "kisan-torch-revolutionising-rural-india": {
    title: "Kisan Torch: Revolutionising Nighttime Work in Rural India",
    category: "Story",
    date: "May 5, 2025",
    readTime: "5 min read",
    image: "/product_torch.png",
    accent: "from-emerald-600/30 to-emerald-900/60",
    intro:
      "Indian agriculture never stops, even after sundown. Farmers routinely work before dawn and after dusk to manage watering schedules, guard crops from wild animals, and navigate uneven fields. The RISING Kisan Torch was engineered specifically to meet this demanding agricultural reality.",
    sections: [
      {
        heading: "1. A Dual-Purpose Lighting Beast",
        paragraphs: [
          "Farmers need two very different types of lighting: a highly focused, long-range beam to check distant crops or spot snakes, and a broad floodlight to work hands-free at close quarters.",
          "RISING Kisan Torches feature an innovative dual-lighting layout. The front spotlight projects a powerful beam reaching up to 1km, while the integrated high-lumen side SMD emergency panel serves as a wide work light.",
        ],
      },
      {
        heading: "2. Engineered for Extreme Field Environments",
        paragraphs: [
          "Agricultural equipment must withstand mud, dust, high drops, and splash water. Heavy plastic bodies often crack under the heat or when dropped onto rocky soil.",
          "Our torches use thick, high-impact virgin ABS plastic reinforced with shock-absorbing seals. The charging ports are protected by rubber caps, preventing soil ingress from causing short circuits during monsoon field operations.",
        ],
      },
      {
        heading: "3. Comfort & Mobility on Long Patrols",
        paragraphs: [
          "Carrying a heavy spotlight by hand during a three-hour farm inspection is exhausting. To alleviate worker fatigue, all our agricultural searchlights come equipped with adjustable shoulder carrying straps, keeping hands free for other farm tasks.",
        ],
      },
    ],
    author: "Harish Choudhary",
    authorRole: "Rural Product Lead",
    tags: ["Agriculture", "Kisan Torch", "Field Work"],
  },
  "solar-energy-kit-power-every-home": {
    title: "Solar Energy Kit: Bringing Light to Off-Grid Homes",
    category: "Product",
    date: "April 22, 2025",
    readTime: "3 min read",
    image: "/product_emergency.png",
    accent: "from-amber-500/30 to-orange-900/60",
    intro:
      "For families living in off-grid hamlets or experiencing frequent power outages, reliable light is essential for child education and general safety. The RISING Solar Energy Kit offers a compact, sustainable home electrification system that harnesses clean solar energy.",
    sections: [
      {
        heading: "1. All-in-One Power Package",
        paragraphs: [
          "The kit features a high-efficiency solar panel, a durable battery backup control unit, three bright low-wattage LED bulbs, and a multi-port USB cable for mobile phone charging.",
          "This ensures that even without any grid connectivity, households can keep multiple rooms illuminated and stay connected to mobile networks.",
        ],
      },
      {
        heading: "2. Clean, Sustainable & Safe Charging",
        paragraphs: [
          "Kerosene lamps produce dangerous fumes and pose a significant fire hazard in tight home settings. Solar power replaces fossil fuels with clean energy, creating a safer, smoke-free indoor environment for families.",
        ],
      },
    ],
    author: "Siddharth Sen",
    authorRole: "Solar Solutions Architect",
    tags: ["Solar Power", "Off-Grid", "Clean Energy"],
  },
  "led-headlamp-hands-free-guide": {
    title: "A Complete Guide to Choosing the Right LED Headlamp",
    category: "Guide",
    date: "March 10, 2025",
    readTime: "4 min read",
    image: "/product_headlamp.png",
    accent: "from-violet-600/30 to-violet-900/60",
    intro:
      "Whether you are trekking in the Himalayas, working inside dark industrial machinery, or navigating a blacked-out basement, keeping your hands free is essential. Selecting the correct LED headlamp requires assessing weight, focus, and battery placement.",
    sections: [
      {
        heading: "1. Understanding Lumen Output vs Beam Distance",
        paragraphs: [
          "High lumens do not automatically mean a better headlamp. For close-up repair tasks, a wide, soft flood beam is preferable to prevent blinding glare. For outdoor trekking, a focused spotlight with long-throw visibility is needed.",
          "RISING headlamps feature adjustable focusing lenses and variable brightness modes, allowing users to toggle between wide area floods and tight searchlight spot beams.",
        ],
      },
      {
        heading: "2. Ergonomics & Weight Balancing",
        paragraphs: [
          "A heavy headlamp can cause neck strain and slip during activity. Look for models featuring comfortable, sweat-wicking elastic headbands and adjustable tilt hinges so you can direct light precisely where your eyes look.",
        ],
      },
    ],
    author: "Rohan Das",
    authorRole: "Outdoor Gear Specialist",
    tags: ["Headlamps", "Buying Guide", "Trekking"],
  },
  "metal-flashlights-vs-plastic": {
    title: "Metal vs Plastic Flashlights: Which One Should You Buy?",
    category: "Insights",
    date: "February 14, 2025",
    readTime: "3 min read",
    image: "/product_torch.png",
    accent: "from-slate-600/30 to-slate-900/60",
    intro:
      "While plastic flashlights are lightweight and non-conductive, aircraft-grade metal torches offer superior performance in heat dissipation, tactical strength, and longevity for demanding professional operations.",
    sections: [
      {
        heading: "1. Superior Thermal Management",
        paragraphs: [
          "High-wattage LEDs generate significant heat. Anodized aluminum bodies act as a natural heatsink, drawing heat away from the emitter core to extend the operating life of the LED chip.",
        ],
      },
      {
        heading: "2. Extreme Impact & Structural Integrity",
        paragraphs: [
          "Drop a plastic flashlight onto concrete and it may crack. RISING aluminum alloy searchlights are engineered to survive heavy drop impacts, making them the preferred choice for industrial security and tactical defense teams.",
        ],
      },
    ],
    author: "Vikram Rathore",
    authorRole: "Lead Testing Engineer",
    tags: ["Material Science", "Metal Torches", "Industrial Quality"],
  },
  "rising-35-years-lighting-india": {
    title: "35 Years of Lighting India: The RISING Story",
    category: "Brand",
    date: "January 1, 2025",
    readTime: "6 min read",
    image: "/product_lantern.png",
    accent: "from-primary/30 to-dark-navy/80",
    intro:
      "From a humble local assembly unit to a premier portable lighting brand in India, the RISING story is built on manufacturing excellence, absolute product durability, and rural customer trust.",
    sections: [
      {
        heading: "Our Foundational Philosophy",
        paragraphs: [
          "We started with a simple belief: every Indian home, farm, and workspace deserves access to reliable, affordable, and durable backup lighting. Over three decades, we have continuously innovated our product configurations to adapt to changing consumer demands.",
        ],
      },
      {
        heading: "Continuous Engineering Innovation",
        paragraphs: [
          "By strictly keeping all manufacturing processes local, we enforce rigorous quality checks on battery safety, solder durability, and lens transparency. We look forward to lighting millions of more lives.",
        ],
      },
    ],
    author: "Mintu Singh",
    authorRole: "Managing Director",
    tags: ["Brand History", "Manufacturing", "Make In India"],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const blog = BLOG_POSTS[slug];

  // Dynamic recommendations: suggest other blog posts
  const recommendedBlogs = useMemo(() => {
    return Object.entries(BLOG_POSTS)
      .filter(([key]) => key !== slug)
      .slice(0, 3)
      .map(([key, value]) => ({
        slug: key,
        title: value.title,
        date: value.date,
        image: value.image,
        accent: value.accent,
      }));
  }, [slug]);

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="relative w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 shadow-sm">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-navy tracking-tight mb-2">
            Article Not Found
          </h1>
          <p className="text-sm text-slate-body max-w-md mb-8">
            The article you are looking for does not exist or has been relocated.
          </p>
          <Link
            href="/media"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold bg-primary text-white border border-primary hover:bg-primary-navy shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Media Center
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

      <main className="flex-grow pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
            <Link
              href="/"
              className="hover:text-primary transition-colors uppercase flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <Link
              href="/media"
              className="hover:text-primary transition-colors uppercase"
            >
              Media
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <span className="text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
              {blog.title}
            </span>
          </nav>

          {/* Grid Layout: Article Body vs Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
            {/* Left Column: Full Article content */}
            <article className="lg:col-span-8 bg-white rounded-[32px] overflow-hidden border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
              {/* Featured Image with accent gradient scrim */}
              <div
                className={`relative w-full h-[260px] sm:h-[380px] bg-gradient-to-br ${blog.accent} flex items-center justify-center overflow-hidden`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-contain w-full h-full p-12 sm:p-16 mix-blend-luminosity opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-accent text-dark-navy inline-block">
                    {blog.category}
                  </span>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>

              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-6 px-6 py-4.5 sm:px-8 border-b border-slate-100 text-xs text-slate-light font-medium bg-slate-50/40 select-none">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {blog.readTime}
                </span>
                <span className="flex items-center gap-1.5 ml-auto text-slate-600">
                  By {blog.author} ({blog.authorRole})
                </span>
              </div>

              {/* Paragraphs body */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Introduction Paragraph (Large) */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold italic border-l-4 border-primary pl-4 py-1">
                  {blog.intro}
                </p>

                {/* Content Sections */}
                {blog.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-dark-navy uppercase tracking-tight">
                      {sec.heading}
                    </h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-slate-body font-medium leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}

                {/* Article Footer Tags */}
                <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2 select-none">
                  <Tag className="w-4 h-4 text-slate-400 mr-1" />
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs font-bold text-slate-600 bg-slate-150 rounded-full px-3 py-1 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Right Column: Sidebar suggestions & Share links */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Dynamic Suggestions widgets */}
              <div className="bg-white rounded-[32px] p-6 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
                <h3 className="text-base sm:text-lg font-bold text-dark-navy uppercase tracking-tight">
                  Recommended Reads
                </h3>
                <div className="w-8 h-1 bg-accent rounded-full -mt-2" />

                <div className="space-y-4 pt-2">
                  {recommendedBlogs.map((rec) => (
                    <Link
                      key={rec.slug}
                      href={`/media/blog/${rec.slug}`}
                      className="group flex gap-4 p-2 rounded-2xl border border-slate-50 hover:border-primary/25 hover:bg-slate-50/50 transition-all duration-300"
                    >
                      <div
                        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${rec.accent} flex-shrink-0 overflow-hidden flex items-center justify-center`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rec.image}
                          alt={rec.title}
                          className="w-10 h-10 object-contain mix-blend-luminosity opacity-60 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-0.5 justify-center flex flex-col flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-dark-navy leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {rec.title}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-semibold leading-tight mt-0.5">
                          {rec.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Box */}
              <div className="bg-white rounded-[32px] p-6 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-dark-navy uppercase tracking-tight flex items-center gap-2 select-none">
                  <Share2 className="w-4 h-4 text-slate-400" />
                  Share This Article
                </h3>
                <div className="flex gap-3">
                  {/* WhatsApp Share */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this article: "${blog.title}" at ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/10 hover:from-emerald-600 hover:to-green-700 hover:shadow-lg active:scale-98 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    WhatsApp
                  </a>
                  {/* Twitter / X Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Read: ${blog.title}`)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-bold bg-[#1DA1F2] text-white shadow-md shadow-[#1DA1F2]/10 hover:bg-[#1a91da] hover:shadow-lg active:scale-98 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter / X
                  </a>
                </div>
              </div>

              {/* Back CTA */}
              <Link
                href="/media"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-dark-navy shadow-sm hover:shadow active:scale-98 transition-all duration-300 select-none"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Media Center
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

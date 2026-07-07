import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Blog from "@/models/Blog";
import Media from "@/models/Media";
import Banner from "@/models/Banner";
import { getSession } from "@/lib/session";

const WEBSITE_CATEGORIES = [
  {
    id: "rechargeable-led-flashlight",
    label: "Rechargeable LED Flash Light",
    desc: "High-efficiency rechargeable beam flashlights engineered for long runtime.",
    section: "product-types",
  },
  {
    id: "kisan-torch",
    label: "Kisan Torch",
    desc: "Heavy-duty agricultural torches tailored for nighttime farming and outdoor field conditions.",
    section: "product-types",
  },
  {
    id: "metal-flashlights",
    label: "Metal Flash Lights",
    desc: "Rugged and durable metal-body searchlights and tactical security lights.",
    section: "product-types",
  },
  {
    id: "led-headlamp",
    label: "LED Headlamp",
    desc: "Hands-free, adjustable high-power headlamps for trekking, mining, and repairs.",
    section: "product-types",
  },
  {
    id: "led-table-lamp",
    label: "LED Table Lamp",
    desc: "Flexible reading desk lamps and smart energy-saving study lights.",
    section: "product-types",
  },
  {
    id: "solar-lantern-searchlight",
    label: "Solar Lantern and Search Light",
    desc: "Dual-charging solar emergency lanterns and long-distance spotlights.",
    section: "product-types",
  },
  {
    id: "led-lantern",
    label: "LED Lantern",
    desc: "Premium backup emergency lights and high-lumen room lanterns.",
    section: "product-types",
  },
  {
    id: "led-usb-lamp",
    label: "LED USB Lamp",
    desc: "Compact USB plug-and-play bulbs for portable power-bank and laptop hookups.",
    section: "product-types",
  },
  {
    id: "solar-energy-kit",
    label: "Solar Energy Kit",
    desc: "All-in-one solar panel home system with multiple bulbs and multi-device charging.",
    section: "product-types",
  },
  {
    id: "power-extension-board",
    label: "Power Extension Board",
    desc: "Multi-socket surge-protected power extension boards for safety and convenience.",
    section: "product-types",
  },
  {
    id: "village-remote",
    label: "Village & Remote",
    desc: "Targeted lighting solutions optimized for villages and remote off-grid locations.",
    section: "applications-target-uses",
  },
  {
    id: "corporate-gifting",
    label: "Corporate Gifting",
    desc: "Premium, functional corporate gifting lights and table lamps.",
    section: "applications-target-uses",
  },
  {
    id: "defense-security",
    label: "Defense & Security",
    desc: "Tactical, durable flashlights and headlamps engineered for security personnel.",
    section: "applications-target-uses",
  },
  {
    id: "farming-fields",
    label: "Farming & Fields",
    desc: "Heavy-duty lights and torches custom-designed for farming and fields work.",
    section: "applications-target-uses",
  },
  {
    id: "industrial-yards",
    label: "Industrial Yards",
    desc: "High-power industrial flashlights and headlamps built for rough, industrial conditions.",
    section: "applications-target-uses",
  },
];

const SEED_BLOGS = [
  {
    slug: "why-rechargeable-flashlights-are-future",
    title: "Why Rechargeable Flashlights Are the Future of Portable Lighting",
    category: "Insights",
    date: "June 18, 2025",
    readTime: "4 min read",
    excerpt: "From farming fields to construction sites, rechargeable LED flashlights are replacing disposable-battery torches across India. Here's why the shift is permanent.",
    image: "/product_torch.png",
    accent: "from-blue-600/30 to-blue-900/60",
    content: {
      intro: "For decades, households and workers across India relied on heavy, plastic dry-cell torches that devoured carbon-zinc batteries. Today, a permanent shift is underway. Rechargeable LED flashlights have emerged as the standard, outperforming legacy options in cost efficiency, environmental sustainability, and lighting performance.",
      sections: [
        {
          heading: "1. Massive Long-Term Cost Savings",
          paragraphs: [
            "While a legacy dry-cell flashlight might have a low upfront cost, the continuous expense of replacing AA or D-cell batteries adds up quickly. A typical user might spend thousands of rupees annually on replacement cells.",
            "In contrast, rechargeable flashlights feature high-capacity lithium-ion or lead-acid batteries designed for hundreds of charge cycles. Recharging a flashlight costs only a fraction of a rupee in electricity, making it pay for itself within the first few months of active use."
          ]
        },
        {
          heading: "2. Consistently Brighter & Stable Beam Output",
          paragraphs: [
            "Legacy flashlights suffer from gradual voltage drop, meaning the light slowly dims as the battery drains. If you need reliable illumination for an emergency, a fading yellow beam is a major liability.",
            "Modern RISING rechargeable flashlights utilize advanced constant-current drivers. They maintain an incredibly bright, uniform beam right up until the battery requires a recharge, ensuring maximum visibility when you need it most."
          ]
        },
        {
          heading: "3. Reduced Environmental Impact & E-Waste",
          paragraphs: [
            "Disposable batteries are one of the leading contributors to heavy metal soil pollution and landfill contamination. Most dry cells in India are disposed of in household waste rather than specialized recycling units.",
            "By choosing a rechargeable LED torch, you prevent hundreds of single-use batteries from ending up in landfills. RISING is committed to developing energy-efficient charging systems that lower carbon footprints."
          ]
        }
      ]
    },
    author: "Arun Mehra",
    authorRole: "Technical Director",
    tags: ["LED Technology", "Sustainability", "Product Guide"]
  },
  {
    slug: "kisan-torch-revolutionising-rural-india",
    title: "Kisan Torch: Revolutionising Nighttime Work in Rural India",
    category: "Story",
    date: "May 5, 2025",
    readTime: "5 min read",
    excerpt: "Millions of Indian farmers work before dawn and after dusk. The RISING Kisan Torch was engineered specifically for this reality — long beam, tough build, USB rechargeable.",
    image: "/product_torch.png",
    accent: "from-emerald-600/30 to-emerald-900/60",
    content: {
      intro: "Indian agriculture never stops, even after sundown. Farmers routinely work before dawn and after dusk to manage watering schedules, guard crops from wild animals, and navigate uneven fields. The RISING Kisan Torch was engineered specifically to meet this demanding agricultural reality.",
      sections: [
        {
          heading: "1. A Dual-Purpose Lighting Beast",
          paragraphs: [
            "Farmers need two very different types of lighting: a highly focused, long-range beam to check distant crops or spot snakes, and a broad floodlight to work hands-free at close quarters.",
            "RISING Kisan Torches feature an innovative dual-lighting layout. The front spotlight projects a powerful beam reaching up to 1km, while the integrated high-lumen side SMD emergency panel serves as a wide work light."
          ]
        },
        {
          heading: "2. Engineered for Extreme Field Environments",
          paragraphs: [
            "Agricultural equipment must withstand mud, dust, high drops, and splash water. Heavy plastic bodies often crack under the heat or when dropped onto rocky soil.",
            "Our torches use thick, high-impact virgin ABS plastic reinforced with shock-absorbing seals. The charging ports are protected by rubber caps, preventing soil ingress from causing short circuits during monsoon field operations."
          ]
        },
        {
          heading: "3. Comfort & Mobility on Long Patrols",
          paragraphs: [
            "Carrying a heavy spotlight by hand during a three-hour farm inspection is exhausting. To alleviate worker fatigue, all our agricultural searchlights come equipped with adjustable shoulder carrying straps, keeping hands free for other farm tasks."
          ]
        }
      ]
    },
    author: "Harish Choudhary",
    authorRole: "Rural Product Lead",
    tags: ["Agriculture", "Kisan Torch", "Field Work"]
  },
  {
    slug: "solar-energy-kit-power-every-home",
    title: "Solar Energy Kit: Bringing Light to Off-Grid Homes",
    category: "Product",
    date: "April 22, 2025",
    readTime: "3 min read",
    excerpt: "With reliable solar panels and a compact storage unit, the RISING Solar Energy Kit delivers consistent power even in areas with no grid connectivity.",
    image: "/product_emergency.png",
    accent: "from-amber-500/30 to-orange-900/60",
    content: {
      intro: "For families living in off-grid hamlets or experiencing frequent power outages, reliable light is essential for child education and general safety. The RISING Solar Energy Kit offers a compact, sustainable home electrification system that harnesses clean solar energy.",
      sections: [
        {
          heading: "1. All-in-One Power Package",
          paragraphs: [
            "The kit features a high-efficiency solar panel, a durable battery backup control unit, three bright low-wattage LED bulbs, and a multi-port USB cable for mobile phone charging.",
            "This ensures that even without any grid connectivity, households can keep multiple rooms illuminated and stay connected to mobile networks."
          ]
        },
        {
          heading: "2. Clean, Sustainable & Safe Charging",
          paragraphs: [
            "Kerosene lamps produce dangerous fumes and pose a significant fire hazard in tight home settings. Solar power replaces fossil fuels with clean energy, creating a safer, smoke-free indoor environment for families."
          ]
        }
      ]
    },
    author: "Siddharth Sen",
    authorRole: "Solar Solutions Architect",
    tags: ["Solar Power", "Off-Grid", "Clean Energy"]
  },
  {
    slug: "led-headlamp-hands-free-guide",
    title: "A Complete Guide to Choosing the Right LED Headlamp",
    category: "Guide",
    date: "March 10, 2025",
    readTime: "4 min read",
    excerpt: "Trekking, mining, or emergency use — not all headlamps are built equal. This guide breaks down lumen counts, beam angles, and battery life so you buy right.",
    image: "/product_headlamp.png",
    accent: "from-violet-600/30 to-violet-900/60",
    content: {
      intro: "Whether you are trekking in the Himalayas, working inside dark industrial machinery, or navigating a blacked-out basement, keeping your hands free is essential. Selecting the correct LED headlamp requires assessing weight, focus, and battery placement.",
      sections: [
        {
          heading: "1. Understanding Lumen Output vs Beam Distance",
          paragraphs: [
            "High lumens do not automatically mean a better headlamp. For close-up repair tasks, a wide, soft flood beam is preferable to prevent blinding glare. For outdoor trekking, a focused spotlight with long-throw visibility is needed.",
            "RISING headlamps feature adjustable focusing lenses and variable brightness modes, allowing users to toggle between wide area floods and tight searchlight spot beams."
          ]
        },
        {
          heading: "2. Ergonomics & Weight Balancing",
          paragraphs: [
            "A heavy headlamp can cause neck strain and slip during activity. Look for models featuring comfortable, sweat-wicking elastic headbands and adjustable tilt hinges so you can direct light precisely where your eyes look."
          ]
        }
      ]
    },
    author: "Rohan Das",
    authorRole: "Outdoor Gear Specialist",
    tags: ["Headlamps", "Buying Guide", "Trekking"]
  },
  {
    slug: "metal-flashlights-vs-plastic",
    title: "Metal vs Plastic Flashlights: Which One Should You Buy?",
    category: "Insights",
    date: "February 14, 2025",
    readTime: "3 min read",
    excerpt: "Both have their place, but for heavy-duty professional and outdoor use, metal-body flashlights consistently outperform plastic counterparts in durability and heat dissipation.",
    image: "/product_torch.png",
    accent: "from-slate-600/30 to-slate-900/60",
    content: {
      intro: "While plastic flashlights are lightweight and non-conductive, aircraft-grade metal torches offer superior performance in heat dissipation, tactical strength, and longevity for demanding professional operations.",
      sections: [
        {
          heading: "1. Superior Thermal Management",
          paragraphs: [
            "High-wattage LEDs generate significant heat. Anodized aluminum bodies act as a natural heatsink, drawing heat away from the emitter core to extend the operating life of the LED chip."
          ]
        },
        {
          heading: "2. Extreme Impact & Structural Integrity",
          paragraphs: [
            "Drop a plastic flashlight onto concrete and it may crack. RISING aluminum alloy searchlights are engineered to survive heavy drop impacts, making them the preferred choice for industrial security and tactical defense teams."
          ]
        }
      ]
    },
    author: "Vikram Rathore",
    authorRole: "Lead Testing Engineer",
    tags: ["Material Science", "Metal Torches", "Industrial Quality"]
  },
  {
    slug: "rising-35-years-lighting-india",
    title: "35 Years of Lighting India: The RISING Story",
    category: "Brand",
    date: "January 1, 2025",
    readTime: "6 min read",
    excerpt: "From a small enterprise in Jodhpur to one of India's leading portable lighting manufacturers — the RISING journey is a story of perseverance, quality, and light.",
    image: "/product_lantern.png",
    accent: "from-primary/30 to-dark-navy/80",
    content: {
      intro: "From a humble local assembly unit to a premier portable lighting brand in India, the RISING story is built on manufacturing excellence, absolute product durability, and rural customer trust.",
      sections: [
        {
          heading: "Our Foundational Philosophy",
          paragraphs: [
            "We started with a simple belief: every Indian home, farm, and workspace deserves access to reliable, affordable, and durable backup lighting. Over three decades, we have continuously innovated our product configurations to adapt to changing consumer demands."
          ]
        },
        {
          heading: "Continuous Engineering Innovation",
          paragraphs: [
            "By strictly keeping all manufacturing processes local, we enforce rigorous quality checks on battery safety, solder durability, and lens transparency. We look forward to lighting millions of more lives."
          ]
        }
      ]
    },
    author: "Mintu Singh",
    authorRole: "Managing Director",
    tags: ["Brand History", "Manufacturing", "Make In India"]
  }
];

const SEED_VIDEOS = [
  { id: "umJrIUCI13c", title: "RISING LED Flashlight – Product Showcase", category: "Product" },
  { id: "8KGcwPhTk5A", title: "Kisan Torch by RISING – For Every Farmer", category: "Campaign" },
  { id: "KRYuhZwbRpU", title: "RISING Metal Flashlights – Built to Last", category: "Product" },
  { id: "7vixOxaaBgo", title: "LED Headlamp – Hands-Free Precision Light", category: "Product" },
  { id: "wekWWH1e-wk", title: "RISING Solar Energy Kit – Power Every Home", category: "Campaign" },
  { id: "yZPW2WzXNTY", title: "LED Table Lamp – Smart Desk Lighting", category: "Product" },
  { id: "eS1YM8-1Jh4", title: "RISING LED Lantern – Emergency Ready", category: "Campaign" },
  { id: "FfLLhq2R5DY", title: "RISING – Lighting the Future of India", category: "Brand" },
];

const SEED_BANNERS = [
  { id: 1, image: "/banner-1.png" },
  { id: 2, image: "/banner-2.png" },
  { id: 3, image: "/banner-3.png" },
];

function getCategorySlug(cats: string[]): string {
  const lowercaseCats = cats.map((c) => c.toLowerCase());
  if (lowercaseCats.includes("led headlamp")) return "led-headlamp";
  if (lowercaseCats.includes("led lantern")) return "led-lantern";
  if (lowercaseCats.includes("led table lamp") || lowercaseCats.includes("corporate gifting"))
    return "led-table-lamp";
  if (lowercaseCats.includes("led usb lamp")) return "led-usb-lamp";
  if (
    lowercaseCats.includes("metal flashlights") ||
    lowercaseCats.includes("defence/security") ||
    lowercaseCats.includes("industrial")
  )
    return "metal-flashlights";
  if (lowercaseCats.includes("rechargeable led flashlight"))
    return "rechargeable-led-flashlight";
  if (
    lowercaseCats.includes("kisan torch") ||
    lowercaseCats.includes("farming") ||
    lowercaseCats.includes("remote areas/village")
  )
    return "kisan-torch";
  if (lowercaseCats.includes("solar energy kit")) return "solar-energy-kit";
  if (lowercaseCats.includes("solar lantern & searchlight"))
    return "solar-lantern-searchlight";
  if (lowercaseCats.includes("power extension board")) return "power-extension-board";
  return "other";
}

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

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 1. Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Media.deleteMany({});
    await Banner.deleteMany({});

    // 2. Seed Categories & Banners & Videos & Blogs
    await Category.insertMany(WEBSITE_CATEGORIES);
    await Blog.insertMany(SEED_BLOGS);
    await Media.insertMany(SEED_VIDEOS);
    await Banner.insertMany(SEED_BANNERS);

    // 3. Load products from file and seed
    const filePath = path.join(process.cwd(), "public/products_structured.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileData);
    const rawProducts = json.products || [];

    const productsToInsert = rawProducts.map((p: any) => {
      const { features, specs } = parseHtmlDescription(p.descriptions?.short || "");
      return {
        id: p.id.toString(),
        name: p.name,
        category: getCategorySlug(p.categories || []),
        image: p.media?.images?.[0] || "",
        gallery: p.media?.images || [],
        description: p.descriptions?.short || "",
        features,
        specs,
      };
    });

    await Product.insertMany(productsToInsert);

    return Response.json({
      success: true,
      message: `Database successfully seeded: ${WEBSITE_CATEGORIES.length} Categories, ${productsToInsert.length} Products, ${SEED_BLOGS.length} Blogs, ${SEED_VIDEOS.length} Videos, and ${SEED_BANNERS.length} Banner slides.`,
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return Response.json(
      { error: "Seeding failed: " + error.message },
      { status: 500 }
    );
  }
}

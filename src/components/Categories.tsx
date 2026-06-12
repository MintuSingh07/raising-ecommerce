import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      title: "LED Torches",
      image: "/product_torch.png",
      href: "#torches",
    },
    {
      title: "Spotlights",
      image: "/product_spotlight.png",
      href: "#spotlights",
    },
    {
      title: "Emergency Lights",
      image: "/product_emergency.png",
      href: "#emergency-lights",
    },
    {
      title: "Rechargeable Products",
      image: "/product_lantern.png",
      href: "#rechargeable",
    },
    {
      title: "Industrial Solutions",
      image: "/product_highbay.png",
      href: "#industrial",
    },
  ];

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-accent rounded-full"></span>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Our Product Categories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-dark-navy tracking-tight leading-tight">
              Solutions That <span className="text-primary">Light</span> Every Need
            </h2>
          </div>
          <Link
            href="#all-products"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-navy group transition-colors"
          >
            View All Products
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group relative flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Image Container */}
              <div className="relative w-full aspect-square mb-6 flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="relative w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-dark-navy leading-tight group-hover:text-primary transition-colors pr-2">
                  {cat.title}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

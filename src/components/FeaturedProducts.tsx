import Image from "next/image";

export default function FeaturedProducts() {
  const products = [
    {
      id: "RT-1000",
      name: "RT-1000 Torch",
      category: "High Power LED Torch",
      image: "/product_torch.png",
    },
    {
      id: "RS-200",
      name: "RS-200 Spotlight",
      category: "Industrial Grade Spotlight",
      image: "/product_spotlight.png",
    },
    {
      id: "RE-500",
      name: "RE-500 Emergency Light",
      category: "LED Emergency Light",
      image: "/product_emergency.png",
    },
    {
      id: "RL-350",
      name: "RL-350 Lantern",
      category: "Rechargeable Lantern",
      image: "/product_lantern.png",
    },
    {
      id: "HB-150",
      name: "HB-150 Highbay",
      category: "Industrial Highbay Light",
      image: "/product_highbay.png",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-accent rounded-full"></span>
              <span className="text-xs font-extrabold tracking-widest text-primary uppercase">
                Featured Products
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-navy tracking-tight leading-tight">
              Our Bestselling Solutions
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:scale-95">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-navy transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((prod, idx) => (
            <div
              key={idx}
              className="group flex flex-col p-5 bg-white rounded-3xl border border-slate-100 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-square mb-6 flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 180px"
                  />
                </div>
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col flex-grow">
                <span className="text-xs font-extrabold text-primary uppercase tracking-widest leading-none mb-1">
                  {prod.id}
                </span>
                <h3 className="text-base font-extrabold text-dark-navy group-hover:text-primary transition-colors leading-tight mb-2">
                  {prod.name}
                </h3>
                <p className="text-xs font-semibold text-slate-light mt-auto">
                  {prod.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

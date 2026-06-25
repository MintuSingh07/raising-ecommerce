"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import Categories from "@/components/Categories";
import VersatileUsage from "@/components/VersatileUsage";
import AboutUs from "@/components/AboutUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useRouter } from "next/navigation";
import { type Product } from "@/components/ProductCatalog";

export default function Home() {
  const router = useRouter();

  const handleSelectProduct = (product: Product) => {
    router.push(`/products?product=${product.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsBanner />
        <Categories />
        <VersatileUsage />
        <AboutUs />
        <FeaturedProducts setSelectedProduct={handleSelectProduct} />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

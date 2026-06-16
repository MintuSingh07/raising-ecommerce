"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import Categories from "@/components/Categories";
import Manufacturing from "@/components/Manufacturing";
import VersatileUsage from "@/components/VersatileUsage";
import AboutUs from "@/components/AboutUs";
import ProductCatalog, { type Product } from "@/components/ProductCatalog";
import FeaturedProducts from "@/components/FeaturedProducts";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import productData from "../../public/products_structured.json";



export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<{ url: string; expiresAt: number }[]>([]);

  // Periodically clean up expired cached images from DOM
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPreloadedImages((prev) => prev.filter((img) => img.expiresAt > now));
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Preload and cache images inside hidden DOM nodes when a product is clicked / loaded
  useEffect(() => {
    if (selectedProduct) {
      const urls: string[] = [];
      if (selectedProduct.media?.images) {
        urls.push(...selectedProduct.media.images);
      }
      if (selectedProduct.variations) {
        selectedProduct.variations.forEach((v: any) => {
          if (v.images) {
            urls.push(...v.images);
          }
        });
      }

      const uniqueUrls = Array.from(new Set(urls));
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes cache expiration

      setPreloadedImages((prev) => {
        const next = [...prev];
        uniqueUrls.forEach((url) => {
          const index = next.findIndex((item) => item.url === url);
          if (index !== -1) {
            next[index].expiresAt = expiry; // Refresh expiration time
          } else {
            next.push({ url, expiresAt: expiry });
          }
        });
        return next;
      });
    }
  }, [selectedProduct]);

  // Read product ID from URL query parameters on mount to persist product detail view on reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const prodIdStr = params.get("product");
      if (prodIdStr) {
        const prodId = parseInt(prodIdStr, 10);
        const products = productData.products as Product[];
        const match = products.find((p) => p.id === prodId);
        if (match) {
          setSelectedProduct(match);
        }
      }
    }
  }, []);

  // Update URL search parameters when selectedProduct changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (selectedProduct) {
        url.searchParams.set("product", selectedProduct.id.toString());
      } else {
        url.searchParams.delete("product");
      }
      window.history.pushState({}, "", url.toString());
    }
  }, [selectedProduct]);

  // Scroll to top when product is selected
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [selectedProduct]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />
      <main className="flex-grow">
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            <Hero />
            <StatsBanner />
            <Categories />
            <Manufacturing />
            <VersatileUsage />
            <AboutUs />
            <ProductCatalog setSelectedProduct={setSelectedProduct} />
            <FeaturedProducts setSelectedProduct={setSelectedProduct} />
          </>
        )}
        <CtaBanner />
      </main>
      <Footer />

      {/* Hidden DOM Cache for preloading product images, auto-expiring after 5 minutes */}
      <div style={{ display: "none" }} aria-hidden="true">
        {preloadedImages.map((img) => (
          <img key={img.url} src={img.url} alt="" />
        ))}
      </div>
    </div>
  );
}

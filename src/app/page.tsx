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

// Client-side cache for preloaded product images
interface PreloadCache {
  [productId: number]: number; // Map of product ID to cache timestamp (milliseconds)
}
const preloadedCache: PreloadCache = {};
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes expiration

function preloadProductImages(product: Product) {
  if (typeof window === "undefined") return;

  const now = Date.now();
  const cachedTime = preloadedCache[product.id];

  // If not cached or cached more than 5 minutes ago, preload images
  if (!cachedTime || now - cachedTime > CACHE_EXPIRY_MS) {
    const imagesToPreload: string[] = [];

    // Base images
    if (product.media?.images) {
      imagesToPreload.push(...product.media.images);
    }

    // Variation images
    if (product.variations) {
      product.variations.forEach((v: any) => {
        if (v.images) {
          imagesToPreload.push(...v.images);
        }
      });
    }

    // Deduplicate image URLs
    const uniqueUrls = Array.from(new Set(imagesToPreload));

    // Load each image in the background to populate the browser HTTP cache
    uniqueUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });

    // Save timestamp to cache
    preloadedCache[product.id] = now;
  }
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  // Scroll to top and preload images when product is selected
  useEffect(() => {
    if (selectedProduct) {
      // Preload images into cache
      preloadProductImages(selectedProduct);

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
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCatalog, { type Product } from "@/components/ProductCatalog";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import productData from "../../../public/products_structured.json";

export default function ProductsPage() {
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
      <main className="flex-grow pt-10 lg:pt-16">
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        ) : (
          <ProductCatalog setSelectedProduct={setSelectedProduct} />
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

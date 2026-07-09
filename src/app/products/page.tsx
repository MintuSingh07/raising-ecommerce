"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCatalog, { type Product } from "@/components/ProductCatalog";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Read product ID from URL query parameters when products load to persist product detail view on reload
  useEffect(() => {
    if (typeof window !== "undefined" && products.length > 0 && !hasInitialized) {
      const params = new URLSearchParams(window.location.search);
      const prodIdStr = params.get("product");
      if (prodIdStr) {
        const match = products.find((p) => String(p.id) === String(prodIdStr));
        if (match) {
          setSelectedProduct(match);
        }
      }
      setHasInitialized(true);
    }
  }, [products, hasInitialized]);

  // Update URL search parameters when selectedProduct changes
  useEffect(() => {
    if (typeof window !== "undefined" && hasInitialized) {
      const url = new URL(window.location.href);
      if (selectedProduct) {
        url.searchParams.set("product", selectedProduct.id.toString());
      } else {
        url.searchParams.delete("product");
      }
      window.history.pushState({}, "", url.toString());
    }
  }, [selectedProduct, hasInitialized]);

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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500 font-sans">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm font-semibold mt-4">Loading products...</span>
          </div>
        ) : selectedProduct ? (
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

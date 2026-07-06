import { useState, useEffect } from "react";
import { type Product } from "@/components/ProductCatalog";
import staticProductData from "../../public/products_structured.json";

let cachedProducts: Product[] | null = null;
let pendingPromise: Promise<Product[]> | null = null;

async function fetchProductsFromApi(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;
  if (pendingPromise) return pendingPromise;

  pendingPromise = fetch("/api/public/products")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products from API");
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        cachedProducts = data as Product[];
        return cachedProducts;
      }
      throw new Error("API returned empty or invalid products array");
    })
    .catch((err) => {
      console.warn("API fetch error, falling back to static product data:", err);
      // Fallback to static JSON structure
      return staticProductData.products as Product[];
    })
    .finally(() => {
      pendingPromise = null;
    });

  return pendingPromise;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProductsFromApi().then((data) => {
      if (active) {
        setProducts(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { products, isLoading };
}

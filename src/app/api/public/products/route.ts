import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

const categoryMap: { [key: string]: string } = {
  "rechargeable-led-flashlight": "Rechargeable LED Flash Light",
  "kisan-torch": "Kisan Torch",
  "metal-flashlights": "Metal Flash Lights",
  "led-headlamp": "LED Headlamp",
  "led-table-lamp": "LED Table Lamp",
  "solar-lantern-searchlight": "Solar Lantern & Searchlight",
  "led-lantern": "LED Lantern",
  "led-usb-lamp": "LED USB Lamp",
  "solar-energy-kit": "Solar Energy Kit",
  "power-extension-board": "Power Extension Board",
  "village-remote": "Village & Remote",
  "corporate-gifting": "Corporate Gifting",
  "defense-security": "Defense & Security",
  "farming-fields": "Farming & Fields",
  "industrial-yards": "Industrial Yards"
};

export async function GET() {
  try {
    await dbConnect();
    const dbProducts = await Product.find({}).sort({ createdAt: -1 });

    const products = dbProducts.map((p: any) => {
      const numericId = parseInt(p.id, 10);
      const id = isNaN(numericId) ? p.id : numericId;

      // Handle categories mapping (translating slugs to labels)
      let mappedCategories = (p.categories || []).map((cat: string) => {
        return categoryMap[cat] || cat;
      });
      if (mappedCategories.length === 0 && p.category) {
        mappedCategories.push(categoryMap[p.category] || p.category);
      }

      // Convert colors list to attributes.Colors string
      const colorsStr = (p.colors || []).map((c: any) => c.name).join(", ");
      const attributes = {
        Colors: colorsStr,
        ...p.attributes
      };

      // Map colors to variations
      const variations = (p.colors || []).map((c: any, idx: number) => ({
        id: isNaN(numericId) ? `${p.id}-var-${idx}` : numericId * 10 + idx,
        name: `${p.name} - ${c.name}`,
        sku: p.sku || null,
        price: {
          regular: p.pricing?.regular || null,
          sale: p.pricing?.sale || null
        },
        stock: {
          inStock: p.inventory?.inStock ? 1 : 0,
          quantity: p.inventory?.stock || null
        },
        attributes: {
          Colors: c.name
        },
        images: c.gallery && c.gallery.length > 0 ? c.gallery : (c.image ? [c.image] : [])
      }));

      // Helper to build HTML description with specs/features/productFeatures for compatibility with legacy parser
      let descriptionHtml = p.description || "";
      
      // If we don't have specification-section in the description HTML, and we have specs list, construct it
      if (p.specs && p.specs.length > 0 && !descriptionHtml.includes("specification-section")) {
        let specsHtml = '<div id="specification-section" class="toggle-content"><div class="specification-heading">';
        p.specs.forEach((s: any) => {
          specsHtml += `<div><span class="label">${s.label}</span>${s.value}</div>`;
        });
        specsHtml += '</div></div>';
        descriptionHtml += specsHtml;
      }

      // If we don't have features-section in description HTML, and we have productFeatures or features, construct it
      if (!descriptionHtml.includes("features-section")) {
        if (p.productFeatures && p.productFeatures.length > 0) {
          let featuresHtml = '<div id="features-section" class="toggle-content"><ul>';
          p.productFeatures.forEach((f: any) => {
            featuresHtml += `<li>${f.label}: ${f.detail}</li>`;
          });
          featuresHtml += '</ul></div>';
          descriptionHtml += featuresHtml;
        } else if (p.features && p.features.length > 0) {
          let featuresHtml = '<div id="features-section" class="toggle-content"><ul>';
          p.features.forEach((f: any) => {
            const text = typeof f === "string" ? f : f.text;
            featuresHtml += `<li>${text}</li>`;
          });
          featuresHtml += '</ul></div>';
          descriptionHtml += featuresHtml;
        }
      }

      const descriptions = {
        short: descriptionHtml,
        full: null
      };

      // Map media images
      const images = p.gallery && p.gallery.length > 0 ? p.gallery : (p.image ? [p.image] : []);
      const media = {
        images: images,
        video: p.video || ""
      };

      return {
        id,
        type: p.colors && p.colors.length > 0 ? "variable" : "simple",
        name: p.name,
        video: p.video || "",
        sku: p.sku || null,
        gtin_upc_ean_isbn: null,
        published: p.inventory?.inStock ? 1 : 0,
        featured: p.featured ? 1 : 0,
        catalogVisibility: "visible",
        brand: p.brand || "RISING",
        categories: mappedCategories,
        tags: p.tags || [],
        descriptions,
        pricing: {
          regular: p.pricing?.regular || null,
          sale: p.pricing?.sale || null,
          saleStart: p.pricing?.saleStart || null,
          saleEnd: p.pricing?.saleEnd || null
        },
        inventory: {
          inStock: p.inventory?.inStock ? 1 : 0,
          stock: p.inventory?.stock || null,
          lowStockAmount: p.inventory?.lowStockAmount || null,
          backordersAllowed: p.inventory?.backordersAllowed ? 1 : 0,
          soldIndividually: p.inventory?.soldIndividually ? 1 : 0
        },
        dimensions: {
          weightKg: p.dimensions?.weightKg || null,
          lengthCm: p.dimensions?.lengthCm || null,
          widthCm: p.dimensions?.widthCm || null,
          heightCm: p.dimensions?.heightCm || null
        },
        tax: {
          status: "taxable",
          class: null
        },
        media,
        attributes,
        shippingClass: null,
        purchaseNote: null,
        externalUrl: p.datasheetUrl || null,
        buttonText: p.datasheetUrl ? "Download Datasheet" : null,
        position: p.position || 0,
        meta: {},
        variations,
        // Include native fields as well, just in case frontend accesses them directly:
        highlights: p.highlights || [],
        productFeatures: p.productFeatures || [],
        specs: p.specs || [],
        applications: p.applications || [],
        inBox: p.inBox || [],
        // Pass-through raw fields for Admin Dashboard / Edit Form compatibility:
        subtitle: p.subtitle || "",
        category: p.category || "",
        badge: p.badge || "",
        rating: p.rating ?? 5,
        reviewCount: p.reviewCount ?? 12,
        image: p.image || "",
        gallery: p.gallery || [],
        datasheetUrl: p.datasheetUrl || "",
        description: p.description || "",
        colors: p.colors || []
      };
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch products: " + error.message },
      { status: 500 }
    );
  }
}

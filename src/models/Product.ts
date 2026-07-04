import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  // ── Identity ────────────────────────────────────────────────────────────────
  id: { type: String, required: true, unique: true, trim: true },   // SKU / model code
  name: { type: String, required: true, trim: true },               // "Toofan"
  subtitle: { type: String, trim: true },                            // "8000 mAh Rechargeable Li-ion battery, …"
  category: { type: String, required: true, trim: true },           // category slug
  badge: { type: String, trim: true },                               // "BEST SELLER" | "NEW" | ""
  featured: { type: Boolean, default: false },

  // ── Social proof ────────────────────────────────────────────────────────────
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 },

  // ── Media ───────────────────────────────────────────────────────────────────
  image: { type: String },                                           // primary / hero image
  gallery: [{ type: String }],                                       // carousel thumbnails
  datasheetUrl: { type: String, trim: true },                        // PDF download link

  // ── Content ─────────────────────────────────────────────────────────────────
  description: { type: String },                                     // rich HTML description

  // ── Quick highlights (bullet icons above color picker) ───────────────────────
  highlights: [
    {
      text: { type: String, required: true },
      icons: [{ type: String }],
    },
  ],

  // ── Detailed product features table ─────────────────────────────────────────
  productFeatures: [
    {
      label: { type: String, required: true },   // "USB Output"
      detail: { type: String, required: true },  // "For Mobile Charging."
      icons: [{ type: String }],
    },
  ],

  // ── Specifications (right-side specs grid, legacy compatible) ───────────────
  specs: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
      icons: [{ type: String }],
    },
  ],

  // ── Colors (swatches) ───────────────────────────────────────────────────────
  colors: [
    {
      name: { type: String, required: true },   // "Red"
      hex: { type: String, required: true },    // "#EF4444"
      image: { type: String },                   // per-color hero image
      gallery: [{ type: String }],               // per-color side images / thumbnails
    },
  ],

  // ── Applications ────────────────────────────────────────────────────────────
  applications: [
    {
      text: { type: String, required: true },
      icons: [{ type: String }],
    },
  ],

  // ── What's in the Box ───────────────────────────────────────────────────────
  inBox: [
    {
      text: { type: String, required: true },
      icons: [{ type: String }],
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

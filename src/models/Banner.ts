import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  // Sequence index scoped within its type (desktop or mobile)
  id: { type: Number, required: true },
  // "desktop" banners show on sm+ screens; "mobile" banners show on xs screens
  type: { type: String, enum: ["desktop", "mobile"], required: true, default: "desktop" },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound unique index: (type, id) must be unique
BannerSchema.index({ type: 1, id: 1 }, { unique: true });

// Drop the old model cache to pick up the new schema (safe in dev hot-reload)
if (mongoose.models.Banner) {
  delete (mongoose.models as Record<string, unknown>).Banner;
}

export default mongoose.model("Banner", BannerSchema);

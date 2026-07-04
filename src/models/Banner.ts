import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Slide sequence index
  image: { type: String, required: true }, // Image URL or path (e.g. "/banner-1.png")
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

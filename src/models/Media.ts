import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true }, // Youtube video ID
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // e.g. "Product", "Campaign", "Brand"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true }, // Slug
  label: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  image: { type: String, trim: true },
  section: { type: String, default: "product-types", trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);

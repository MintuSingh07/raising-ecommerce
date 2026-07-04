import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // e.g. "Insights", "Story"
  date: { type: String, required: true }, // e.g. "June 18, 2025"
  readTime: { type: String, required: true }, // e.g. "4 min read"
  excerpt: { type: String, required: true, trim: true },
  image: { type: String },
  accent: { type: String, default: "from-blue-600/30 to-blue-900/60" },
  intro: { type: String, default: "" },
  sections: {
    type: [
      {
        heading: { type: String },
        paragraphs: [{ type: String }],
      },
    ],
    default: [],
  },
  htmlContent: { type: String, default: "" },
  author: { type: String, required: true, default: "RISING Admin" },
  authorRole: { type: String, required: true, default: "Technical Team" },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

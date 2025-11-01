import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    contentHtml: { type: String, required: true },
    description: { type: String, required: true }, // NEW FIELD
    bannerImageUrl: { type: String, required: true }, // NEW FIELD
    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

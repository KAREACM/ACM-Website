import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface
export interface IBlog extends Document {
  title: string;
  image: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const blogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: "KARE ACM" },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;

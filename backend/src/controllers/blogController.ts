import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";

// GET all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET single blog
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog: IBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

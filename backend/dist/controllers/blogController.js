"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
// GET all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog_1.default.find().sort({ createdAt: -1 });
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getBlogs = getBlogs;
// GET single blog
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getBlogById = getBlogById;
// CREATE blog
const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog_1.default(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createBlog = createBlog;
// UPDATE blog
const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedBlog)
            return res.status(404).json({ message: "Blog not found" });
        res.json(updatedBlog);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateBlog = updateBlog;
// DELETE blog
const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBlog)
            return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteBlog = deleteBlog;

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


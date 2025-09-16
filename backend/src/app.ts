import express, { Application, Request, Response } from "express";
import cors from "cors";

// Import route files
import awardRoutes from "./routes/awardRoutes";
import eventRoutes from "./routes/eventRoutes";
import photoRoutes from "./routes/photoRoutes";
import blogRoutes from "./routes/blogRoutes"; 
import teamRoutes from "./routes/teamRoutes";
// import galleryRoutes from "./routes/galleryRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running...");
});

// 🔎 Debug logs to check route imports
console.log("awardRoutes:", awardRoutes);
console.log("blogRoutes:", blogRoutes);
console.log("eventRoutes:", eventRoutes);
// console.log("galleryRoutes:", galleryRoutes);
console.log("photoRoutes:", photoRoutes);

// Register all routes
app.use("/api/awards", awardRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/events", eventRoutes);
// app.use("/api/gallery", galleryRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/teams", teamRoutes);

// Blog routes
app.use("/api/blogs", blogRoutes); 

export default app;

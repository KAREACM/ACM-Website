import express from "express";
import cors from "cors";
import { getProjects, createProject } from "./controllers/projectController";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running...");
});


export default app;

import express, { Application, Request, Response } from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running...");
});

// Event routes
app.use("/api/events", eventRoutes);

export default app;

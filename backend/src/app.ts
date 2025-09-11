import express from "express";
import cors from "cors";
import eventsRoutes from "./routes/events";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Events API
app.use("/api/events", eventsRoutes);

export default app;

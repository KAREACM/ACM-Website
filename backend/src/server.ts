import dotenv from "dotenv";
import { connectDB } from "./config/db";
import app from "./app";

dotenv.config();

const PORT: number | string = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ MongoDB connected`);
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit with failure
  }
};

startServer();

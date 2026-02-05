"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import route files
const awardRoutes_1 = __importDefault(require("./routes/awardRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const photoRoutes_1 = __importDefault(require("./routes/photoRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
// import galleryRoutes from "./routes/galleryRoutes";
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get("/", (_req, res) => {
    res.send("Backend is running...");
});
// 🔎 Debug logs to check route imports
console.log("awardRoutes:", awardRoutes_1.default);
console.log("blogRoutes:", blogRoutes_1.default);
console.log("eventRoutes:", eventRoutes_1.default);
// console.log("galleryRoutes:", galleryRoutes);
console.log("photoRoutes:", photoRoutes_1.default);
// Register all routes
app.use("/api/awards", awardRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
// app.use("/api/gallery", galleryRoutes);
app.use("/api/photos", photoRoutes_1.default);
app.use("/api/teams", teamRoutes_1.default);
// Blog routes
app.use("/api/blogs", blogRoutes_1.default);
exports.default = app;

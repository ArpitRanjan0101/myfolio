import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminUser from "./models/AdminUser.js";
import SiteSettings from "./models/SiteSettings.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://mongo:27017/myfolio";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "myfolio-backend",
    timestamp: new Date().toISOString()
  });
});

async function ensureAdminUser() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set");
    return;
  }

  const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (!existing) {
    await AdminUser.create({ email: ADMIN_EMAIL, passwordHash });
    console.log("Admin user created");
    return;
  }

  const matches = await bcrypt.compare(ADMIN_PASSWORD, existing.passwordHash);
  if (!matches) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log("Admin password updated from env");
  }
}

async function ensureSiteSettings() {
  const existing = await SiteSettings.findOne();
  if (!existing) {
    await SiteSettings.create({});
  }
}

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
    await ensureAdminUser();
    await ensureSiteSettings();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

startServer();

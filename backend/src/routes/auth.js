import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase();

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const normalizedEmail = String(email).toLowerCase();
  if (ADMIN_EMAIL && normalizedEmail !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const adminUser = await AdminUser.findOne({ email: normalizedEmail });
  if (!adminUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, adminUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: adminUser._id.toString(), email: adminUser.email, role: "admin" },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.json({ token, admin: { email: adminUser.email } });
});

export default router;

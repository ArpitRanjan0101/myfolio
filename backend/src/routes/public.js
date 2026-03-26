import express from "express";
import SiteSettings from "../models/SiteSettings.js";
import Project from "../models/Project.js";
import ClientProject from "../models/ClientProject.js";

const router = express.Router();

router.get("/site", async (req, res) => {
  const settings = await SiteSettings.findOne();
  return res.json(settings);
});

router.get("/projects", async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return res.json(projects);
});

router.get("/client-projects", async (req, res) => {
  const projects = await ClientProject.find().sort({ order: 1, createdAt: -1 });
  return res.json(projects);
});

export default router;

import express from "express";
import SiteSettings from "../models/SiteSettings.js";
import Project from "../models/Project.js";
import ClientProject from "../models/ClientProject.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/site", async (req, res) => {
  const settings = await SiteSettings.findOne();
  return res.json(settings);
});

router.put("/site", async (req, res) => {
  const payload = req.body || {};
  const settings = await SiteSettings.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true
  });
  return res.json(settings);
});

router.get("/projects", async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return res.json(projects);
});

router.post("/projects", async (req, res) => {
  const created = await Project.create(req.body || {});
  return res.status(201).json(created);
});

router.put("/projects/:id", async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  return res.json(updated);
});

router.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  return res.status(204).send();
});

router.get("/client-projects", async (req, res) => {
  const projects = await ClientProject.find().sort({ order: 1, createdAt: -1 });
  return res.json(projects);
});

router.post("/client-projects", async (req, res) => {
  const created = await ClientProject.create(req.body || {});
  return res.status(201).json(created);
});

router.put("/client-projects/:id", async (req, res) => {
  const updated = await ClientProject.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.json(updated);
});

router.delete("/client-projects/:id", async (req, res) => {
  await ClientProject.findByIdAndDelete(req.params.id);
  return res.status(204).send();
});

export default router;

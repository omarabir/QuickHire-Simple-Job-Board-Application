const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const {
  requireFields,
  requireAuth,
  requireAdmin,
} = require("../middleware/validate");

// ── GET /api/jobs ──────────────────────────────────────────────────────────
// Query params: search, category, location, page, limit
router.get("/", async (req, res) => {
  try {
    const { search, category, location, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [jobs, total] = await Promise.all([
      Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Job.countDocuments(query),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/jobs/:id ──────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/jobs ─────────────────────────────────────────────────────────
router.post(
  "/",
  requireAuth,
  requireAdmin,
  requireFields(["title", "company", "location", "category", "description"]),
  async (req, res) => {
    try {
      const job = await Job.create(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        Object.keys(err.errors).forEach(
          (k) => (errors[k] = err.errors[k].message),
        );
        return res.status(400).json({ success: false, errors });
      }
      res.status(500).json({ success: false, message: err.message });
    }
  },
);

// ── DELETE /api/jobs/:id ───────────────────────────────────────────────────
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

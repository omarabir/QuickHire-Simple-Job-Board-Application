const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// ── GET /api/companies ────────────────────────────────────────────────────
// Aggregates unique companies from the jobs collection
router.get("/", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12 } = req.query;

    const matchStage = {};
    if (category) matchStage.category = category;
    if (search) {
      matchStage.company = { $regex: search, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$company",
          company: { $first: "$company" },
          location: { $first: "$location" },
          logo: { $first: "$logo" },
          jobCount: { $sum: 1 },
          categories: { $addToSet: "$category" },
          latestJob: { $max: "$createdAt" },
        },
      },
      { $sort: { jobCount: -1, company: 1 } },
    ];

    const allCompanies = await Job.aggregate(pipeline);
    const total = allCompanies.length;
    const companies = allCompanies.slice(skip, skip + Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: companies,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/companies/:name/jobs ─────────────────────────────────────────
// Jobs for a specific company
router.get("/:name/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({
      company: { $regex: `^${req.params.name}$`, $options: "i" },
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

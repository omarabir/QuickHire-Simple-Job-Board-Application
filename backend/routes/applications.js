const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const { isValidEmail, isValidUrl } = require("../middleware/validate");

// ── POST /api/applications ────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { job, name, email, resumeLink, coverNote } = req.body;
    const errors = {};

    if (!job) errors.job = "Job ID is required";
    if (!name || String(name).trim() === "") errors.name = "Name is required";
    if (!email || String(email).trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!resumeLink || String(resumeLink).trim() === "") {
      errors.resumeLink = "Resume link is required";
    } else if (!isValidUrl(resumeLink)) {
      errors.resumeLink =
        "Resume link must be a valid URL (http:// or https://)";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Verify the job exists
    const jobExists = await Job.findById(job);
    if (!jobExists)
      return res.status(404).json({ success: false, message: "Job not found" });

    const application = await Application.create({
      job,
      name,
      email,
      resumeLink,
      coverNote,
    });
    res.status(201).json({ success: true, data: application });
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
});

// ── GET /api/applications ─────────────────────────────────────────────────
// Returns all applications (admin use)
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/applications/job/:jobId ─────────────────────────────────────
// Applications for a specific job (admin use)
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId }).sort(
      { createdAt: -1 },
    );
    res.json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

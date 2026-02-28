const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("../middleware/passport");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "quickhire_secret_key";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES },
  );
}

// ── POST /api/auth/register ───────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const errors = {};

    if (!firstName || !firstName.trim())
      errors.firstName = "First name is required";
    if (!lastName || !lastName.trim())
      errors.lastName = "Last name is required";
    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, errors });
    }

    // Check for existing user
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        errors: { email: "An account with this email already exists" },
      });
    }

    const user = await User.create({ firstName, lastName, email, password });
    const token = signToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
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

// ── POST /api/auth/login ──────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    if (!email || !email.trim()) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, errors });
    }

    // Include password field explicitly since select:false
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: { email: "No account found with this email" },
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: { password: "Incorrect password" },
      });
    }

    const token = signToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────
// Verify token and return current user
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
});

// ── GET /api/auth/google ─────────────────────────────────────────────────
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// ── GET /api/auth/google/callback ─────────────────────────────────────────
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
  }),
  (req, res) => {
    const token = signToken(req.user);
    // Redirect to frontend with token in query string; frontend stores it
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:3000"}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email, role: req.user.role }))}`,
    );
  },
);

module.exports = router;

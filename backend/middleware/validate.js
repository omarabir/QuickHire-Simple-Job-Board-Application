const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "quickhire_secret_key";

/**
 * Validate required fields and return an errors object.
 * @param {object} data – req.body
 * @param {string[]} fields – field names that are required
 * @returns {{ valid: boolean, errors: object }}
 */
function validateRequired(data, fields) {
  const errors = {};
  fields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors[field] = `${field} is required`;
    }
  });
  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Express middleware factory – validates required fields and returns 400 on failure.
 */
function requireFields(fields) {
  return (req, res, next) => {
    const { valid, errors } = validateRequired(req.body, fields);
    if (!valid) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

/**
 * Validate email format.
 */
function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(String(email));
}

/**
 * Validate URL format (http/https).
 */
function isValidUrl(url) {
  return /^https?:\/\/.+/.test(String(url));
}

/**
 * Express middleware – verify JWT and attach user to req.user.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}


function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access required" });
  }
  next();
}

module.exports = {
  validateRequired,
  requireFields,
  isValidEmail,
  isValidUrl,
  requireAuth,
  requireAdmin,
};

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "quickhire_secret_key";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES },
  );
}

/**
 * Verify the Bearer token in the request header.
 * Returns the decoded payload or throws with a 401 NextResponse.
 */
export function verifyToken(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    throw NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 },
    );
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

/**
 * Same as verifyToken but also checks role === 'admin'.
 */
export function verifyAdmin(request) {
  const decoded = verifyToken(request);
  if (decoded.role !== "admin") {
    throw NextResponse.json(
      { success: false, message: "Admin access required" },
      { status: 403 },
    );
  }
  return decoded;
}

/** Wrap a route handler so thrown NextResponse errors are returned directly. */
export async function withErrorHandler(fn) {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof NextResponse) return err;
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

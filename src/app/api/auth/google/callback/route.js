import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken } from "@/lib/serverAuth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login?error=google_failed`);
  }

  try {
    // 1️⃣ Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${appUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok)
      throw new Error(tokens.error_description || "Token exchange failed");

    // 2️⃣ Get user info from Google
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );
    const profile = await profileRes.json();
    if (!profileRes.ok) throw new Error("Failed to fetch Google profile");

    const email = profile.email?.toLowerCase();
    if (!email) throw new Error("No email from Google profile");

    // 3️⃣ Find or create user in MongoDB
    await connectDB();
    let user = await User.findOne({ email });

    if (!user) {
      const nameParts = (profile.name || "").split(" ");
      user = await User.create({
        firstName: profile.given_name || nameParts[0] || "User",
        lastName: profile.family_name || nameParts.slice(1).join(" ") || ".",
        email,
        googleId: profile.id,
      });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }

    // 4️⃣ Issue JWT and redirect to frontend callback page
    const jwt = signToken(user);
    const userPayload = encodeURIComponent(
      JSON.stringify({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }),
    );

    return NextResponse.redirect(
      `${appUrl}/auth/callback?token=${jwt}&user=${userPayload}`,
    );
  } catch (err) {
    console.error("Google OAuth error:", err.message);
    return NextResponse.redirect(`${appUrl}/login?error=google_failed`);
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken, withErrorHandler } from "@/lib/serverAuth";

export async function POST(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const { email, password } = await request.json();
    const errors = {};

    if (!email?.trim()) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (Object.keys(errors).length) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          errors: { email: "No account found with this email" },
        },
        { status: 401 },
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, errors: { password: "Incorrect password" } },
        { status: 401 },
      );
    }

    const token = signToken(user);
    return NextResponse.json({
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
  });
}

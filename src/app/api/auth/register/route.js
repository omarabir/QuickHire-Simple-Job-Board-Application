import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken, withErrorHandler } from "@/lib/serverAuth";

export async function POST(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const { firstName, lastName, email, password } = await request.json();
    const errors = {};

    if (!firstName?.trim()) errors.firstName = "First name is required";
    if (!lastName?.trim()) errors.lastName = "Last name is required";
    if (!email?.trim()) {
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
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          errors: { email: "An account with this email already exists" },
        },
        { status: 409 },
      );
    }

    const user = await User.create({ firstName, lastName, email, password });
    const token = signToken(user);

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  });
}

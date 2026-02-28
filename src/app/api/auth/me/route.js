import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken, withErrorHandler } from "@/lib/serverAuth";

export async function GET(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const decoded = verifyToken(request); // throws 401 if invalid
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
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

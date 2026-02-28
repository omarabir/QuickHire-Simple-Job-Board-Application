import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { verifyAdmin, withErrorHandler } from "@/lib/serverAuth";

// GET /api/jobs/:id
export async function GET(_request, { params }) {
  return withErrorHandler(async () => {
    await connectDB();
    const job = await Job.findById(params.id);
    if (!job)
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: job });
  });
}

// DELETE /api/jobs/:id  (admin only)
export async function DELETE(request, { params }) {
  return withErrorHandler(async () => {
    await connectDB();
    verifyAdmin(request);

    const job = await Job.findByIdAndDelete(params.id);
    if (!job)
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 },
      );
    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  });
}

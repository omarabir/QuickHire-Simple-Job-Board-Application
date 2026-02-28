import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/lib/models/Application";
import { withErrorHandler } from "@/lib/serverAuth";

// GET /api/applications/job/:jobId
export async function GET(_request, { params }) {
  return withErrorHandler(async () => {
    await connectDB();
    const applications = await Application.find({ job: params.jobId }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: applications });
  });
}

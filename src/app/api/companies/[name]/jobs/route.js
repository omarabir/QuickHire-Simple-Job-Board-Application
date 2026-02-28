import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { withErrorHandler } from "@/lib/serverAuth";

// GET /api/companies/:name/jobs
export async function GET(_request, { params }) {
  return withErrorHandler(async () => {
    await connectDB();
    const jobs = await Job.find({
      company: { $regex: `^${params.name}$`, $options: "i" },
    }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  });
}

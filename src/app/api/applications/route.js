import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/lib/models/Application";
import Job from "@/lib/models/Job";
import { withErrorHandler } from "@/lib/serverAuth";

// POST /api/applications
export async function POST(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const { job, name, email, resumeLink, coverNote } = await request.json();
    const errors = {};

    if (!job) errors.job = "Job ID is required";
    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!resumeLink?.trim()) {
      errors.resumeLink = "Resume link is required";
    } else if (!/^https?:\/\/.+/.test(resumeLink)) {
      errors.resumeLink =
        "Resume link must be a valid URL (http:// or https://)";
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const jobExists = await Job.findById(job);
    if (!jobExists) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 },
      );
    }

    const application = await Application.create({
      job,
      name,
      email,
      resumeLink,
      coverNote,
    });
    return NextResponse.json(
      { success: true, data: application },
      { status: 201 },
    );
  });
}

// GET /api/applications  (admin)
export async function GET() {
  return withErrorHandler(async () => {
    await connectDB();
    const applications = await Application.find()
      .populate("job", "title company")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: applications });
  });
}

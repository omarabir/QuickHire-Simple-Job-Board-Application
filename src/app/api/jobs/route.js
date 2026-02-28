import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { verifyAdmin, withErrorHandler } from "@/lib/serverAuth";

// GET /api/jobs?search=&category=&location=&page=1&limit=10
export async function GET(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Job.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: jobs,
    });
  });
}

// POST /api/jobs  (admin only)
export async function POST(request) {
  return withErrorHandler(async () => {
    await connectDB();
    verifyAdmin(request); // throws 401/403 if not admin

    const body = await request.json();
    const required = [
      "title",
      "company",
      "location",
      "category",
      "description",
    ];
    const errors = {};
    required.forEach((f) => {
      if (!body[f]?.toString().trim()) errors[f] = `${f} is required`;
    });
    if (Object.keys(errors).length) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const job = await Job.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  });
}

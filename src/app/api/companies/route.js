import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { withErrorHandler } from "@/lib/serverAuth";

// GET /api/companies?search=&category=&page=1&limit=12
export async function GET(request) {
  return withErrorHandler(async () => {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);

    const matchStage = {};
    if (category) matchStage.category = category;
    if (search) matchStage.company = { $regex: search, $options: "i" };

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$company",
          company: { $first: "$company" },
          location: { $first: "$location" },
          logo: { $first: "$logo" },
          jobCount: { $sum: 1 },
          categories: { $addToSet: "$category" },
          latestJob: { $max: "$createdAt" },
        },
      },
      { $sort: { jobCount: -1, company: 1 } },
    ];

    const allCompanies = await Job.aggregate(pipeline);
    const total = allCompanies.length;
    const companies = allCompanies.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: companies,
    });
  });
}

"use client";
import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";

const categoryColors = {
  Design: "bg-teal-100 text-teal-700",
  Marketing: "bg-orange-100 text-orange-700",
  Technology: "bg-red-100 text-red-700",
  Business: "bg-purple-100 text-purple-700",
  Finance: "bg-blue-100 text-blue-700",
  Healthcare: "bg-green-100 text-green-700",
  Education: "bg-yellow-100 text-yellow-700",
  Other: "bg-slate-100 text-slate-700",
};

export default function JobCard({ job }) {
  const tagColor = categoryColors[job.category] || categoryColors.Other;
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 shrink-0">
            {job.company?.[0] ?? "?"}
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor}`}
          >
            {job.category}
          </span>
        </div>

        {/* Title & Company */}
        <div>
          <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">
            {job.title}
          </h3>
          <p className="text-slate-500 text-sm">{job.company}</p>
        </div>

        {/* Meta */}
        <div className="mt-auto flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> {job.type || "Full-time"}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {job.salary}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

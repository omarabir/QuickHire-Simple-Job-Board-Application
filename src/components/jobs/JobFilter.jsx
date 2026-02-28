"use client";

const CATEGORIES = [
  "All",
  "Design",
  "Marketing",
  "Technology",
  "Business",
  "Finance",
  "Healthcare",
  "Education",
  "Other",
];

const JOB_TYPES = [
  "All",
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

export default function JobFilter({ category, location, type, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Category */}
      <select
        value={category}
        onChange={(e) =>
          onChange("category", e.target.value === "All" ? "" : e.target.value)
        }
        className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c === "All" ? "" : c}>
            {c === "All" ? "All Categories" : c}
          </option>
        ))}
      </select>

      {/* Job Type */}
      <select
        value={type}
        onChange={(e) =>
          onChange("type", e.target.value === "All" ? "" : e.target.value)
        }
        className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {JOB_TYPES.map((t) => (
          <option key={t} value={t === "All" ? "" : t}>
            {t === "All" ? "All Types" : t}
          </option>
        ))}
      </select>

      {/* Location */}
      <input
        type="text"
        value={location}
        onChange={(e) => onChange("location", e.target.value)}
        placeholder="Filter by location…"
        className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}

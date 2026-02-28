"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getCompanies, getCompanyJobs } from "@/lib/api";
import {
  Search,
  MapPin,
  Briefcase,
  X,
  Loader2,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

function CompanyCard({ company }) {
  const [expanded, setExpanded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  async function toggleJobs() {
    if (!expanded && jobs.length === 0) {
      setLoadingJobs(true);
      try {
        const res = await getCompanyJobs(company.company);
        setJobs(res.data);
      } catch {
        setJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    }
    setExpanded((v) => !v);
  }

  const initials = company.company
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base">
              {company.company}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{company.location}</span>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {company.categories?.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[cat] || categoryColors.Other}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Job count */}
          <div className="shrink-0 text-right">
            <div className="text-2xl font-bold text-blue-600">
              {company.jobCount}
            </div>
            <div className="text-xs text-slate-400">
              open job{company.jobCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Toggle jobs button */}
        <button
          onClick={toggleJobs}
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 py-2 rounded-xl transition"
        >
          {loadingJobs ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide jobs
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> View {company.jobCount} job
              {company.jobCount !== 1 ? "s" : ""}
            </>
          )}
        </button>
      </div>

      {/* Expanded job list */}
      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {jobs.length === 0 && !loadingJobs && (
            <p className="px-6 py-4 text-sm text-slate-400">No jobs found.</p>
          )}
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/jobs/${job._id}`}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition group"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition">
                  {job.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {job.type} · {job.location}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${categoryColors[job.category] || categoryColors.Other}`}
              >
                {job.category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowseCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category) params.category = category;
      const res = await getCompanies(params);
      setCompanies(res.data);
      setTotal(res.total);
      setPages(res.pages);
    } catch {
      setError("Failed to load companies. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setPage(1);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* ── Hero ── */}
        <section className="bg-blue-600 text-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Browse Companies
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Discover {total > 0 ? total : ""} companies hiring right now
            </p>

            {/* Search */}
            <div className="bg-white rounded-2xl p-3 shadow-xl max-w-2xl mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search company name…"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none rounded-xl"
                />
              </div>
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => {
              const active = (cat === "All" && !category) || cat === category;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat === "All" ? "" : cat);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            {(search || category) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Count */}
          {!loading && !error && (
            <p className="text-slate-500 text-sm mb-6">
              {total} compan{total !== 1 ? "ies" : "y"} found
            </p>
          )}

          {/* States */}
          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-3">{error}</p>
              <button
                onClick={fetchCompanies}
                className="text-blue-600 font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && companies.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <Building2 className="w-14 h-14 text-slate-300" />
              <p className="text-slate-500 text-lg">No companies found.</p>
              <button
                onClick={clearFilters}
                className="text-blue-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && companies.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {companies.map((company) => (
                  <CompanyCard key={company._id} company={company} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                        p === page
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

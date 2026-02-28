"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import JobCard from "@/components/jobs/JobCard";
import JobSearch from "@/components/jobs/JobSearch";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api";
import { Loader2, Briefcase } from "lucide-react";

function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (location) params.location = location;
      if (type) params.type = type;
      params.page = page;
      params.limit = 12;

      const data = await getJobs(params);
      setJobs(data.data);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setError("Failed to load jobs. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }, [search, category, location, type, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Sync URL with filter state
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (page > 1) params.set("page", page);
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  }, [search, category, location, type, page, router]);

  function handleFilterChange(key, value) {
    setPage(1);
    if (key === "category") setCategory(value);
    if (key === "location") setLocation(value);
    if (key === "type") setType(value);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* ── Hero banner ── */}
        <section className="bg-blue-600 text-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Find Your Next Opportunity
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Browse {total > 0 ? `${total} available` : ""} jobs from top
              companies worldwide
            </p>
            <div className="bg-white rounded-2xl p-3 shadow-xl max-w-2xl mx-auto">
              <JobSearch value={search} onChange={handleSearchChange} />
            </div>
          </div>
        </section>

        {/* ── Filters + Grid ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <JobFilter
              category={category}
              location={location}
              type={type}
              onChange={handleFilterChange}
            />
            {(search || category || location || type) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setLocation("");
                  setType("");
                  setPage(1);
                }}
                className="text-sm text-blue-600 font-medium hover:underline whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          {!loading && !error && (
            <p className="text-slate-500 text-sm mb-6">
              {total} job{total !== 1 ? "s" : ""} found
            </p>
          )}

          {/* States */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-3">{error}</p>
              <button
                onClick={fetchJobs}
                className="text-blue-600 font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <Briefcase className="w-14 h-14 text-slate-300" />
              <p className="text-slate-500 text-lg">
                No jobs match your search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setLocation("");
                  setType("");
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && jobs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
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

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}

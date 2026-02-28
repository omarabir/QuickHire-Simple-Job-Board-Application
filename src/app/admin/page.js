"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AdminJobForm from "@/components/jobs/AdminJobForm";
import { getJobs, deleteJob, getApplications, getStoredUser } from "@/lib/api";
import {
  Loader2,
  Trash2,
  Plus,
  X,
  Briefcase,
  Users,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TABS = ["Jobs", "Applications"];

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState("Jobs");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expandedApp, setExpandedApp] = useState(null);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      setAuthChecked(true);
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
      setAuthChecked(true);
    }
  }, [router]);

  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = await getJobs({ limit: 100 });
      setJobs(res.data);
    } catch {
      setError("Failed to load jobs.");
    } finally {
      setLoadingJobs(false);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingApps(true);
    try {
      const res = await getApplications();
      setApplications(res.data);
    } catch {
      setError("Failed to load applications.");
    } finally {
      setLoadingApps(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchJobs();
  }, [isAdmin, fetchJobs]);

  useEffect(() => {
    if (tab === "Applications") fetchApplications();
  }, [tab, fetchApplications]);

  async function handleDelete(id) {
    if (!confirm("Delete this job listing? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch {
      alert("Failed to delete job.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleJobCreated(job) {
    setJobs((prev) => [job, ...prev]);
    setShowForm(false);
  }

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

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Access Denied
            </h1>
            <p className="text-slate-500 mb-8">
              You don't have permission to view this page. Please contact an
              administrator.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Go Home
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* ── Page header ── */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Manage job listings and applications
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-xl">
                <Briefcase className="w-4 h-4" /> {jobs.length} Jobs
              </div>
              <div className="flex items-center gap-2 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-xl">
                <Users className="w-4 h-4" /> {applications.length} Applications
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* ── Tabs ── */}
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit mb-8">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === t
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {error && (
            <p className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* ── JOBS TAB ── */}
          {tab === "Jobs" && (
            <>
              {/* Add job toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setShowForm((v) => !v)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
                >
                  {showForm ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {showForm ? "Cancel" : "Post New Job"}
                </button>
              </div>

              {showForm && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-5">
                    New Job Listing
                  </h2>
                  <AdminJobForm onCreated={handleJobCreated} />
                </div>
              )}

              {/* Jobs table */}
              {loadingJobs ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No jobs yet. Post your first one!</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                        <tr>
                          <th className="text-left px-5 py-3.5 font-semibold">
                            Job Title
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold">
                            Company
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">
                            Location
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold hidden sm:table-cell">
                            Category
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">
                            Type
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">
                            Posted
                          </th>
                          <th className="px-5 py-3.5" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {jobs.map((job) => {
                          const tagColor =
                            categoryColors[job.category] ||
                            categoryColors.Other;
                          return (
                            <tr
                              key={job._id}
                              className="hover:bg-slate-50 transition"
                            >
                              <td className="px-5 py-4 font-semibold text-slate-900">
                                {job.title}
                              </td>
                              <td className="px-5 py-4 text-slate-600">
                                {job.company}
                              </td>
                              <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />{" "}
                                  {job.location}
                                </span>
                              </td>
                              <td className="px-5 py-4 hidden sm:table-cell">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tagColor}`}
                                >
                                  {job.category}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-slate-500 hidden lg:table-cell">
                                {job.type}
                              </td>
                              <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">
                                {new Date(job.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-5 py-4">
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  disabled={deletingId === job._id}
                                  className="text-red-400 hover:text-red-600 disabled:opacity-50 transition p-1.5 rounded-lg hover:bg-red-50"
                                  title="Delete job"
                                >
                                  {deletingId === job._id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── APPLICATIONS TAB ── */}
          {tab === "Applications" && (
            <>
              {loadingApps ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No applications yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {applications.map((app) => (
                    <div
                      key={app._id}
                      className="bg-white border border-slate-200 rounded-2xl px-5 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {app.name}
                          </p>
                          <p className="text-slate-500 text-sm">{app.email}</p>
                          {app.job && (
                            <p className="text-blue-600 text-xs mt-0.5 font-medium">
                              {app.job.title} @ {app.job.company}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                          >
                            Resume ↗
                          </a>
                          <button
                            onClick={() =>
                              setExpandedApp(
                                expandedApp === app._id ? null : app._id,
                              )
                            }
                            className="text-slate-400 hover:text-slate-700 transition"
                          >
                            {expandedApp === app._id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      {expandedApp === app._id && app.coverNote && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs text-slate-500 font-medium mb-1">
                            Cover Note
                          </p>
                          <p className="text-sm text-slate-700 whitespace-pre-line">
                            {app.coverNote}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(app.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

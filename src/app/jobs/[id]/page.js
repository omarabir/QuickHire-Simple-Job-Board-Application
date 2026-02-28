"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import ApplyForm from "@/components/jobs/ApplyForm";
import { getJob } from "@/lib/api";
import { MapPin, Briefcase, Tag, ArrowLeft, Loader2 } from "lucide-react";

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

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getJob(id);
        setJob(res.data);
      } catch {
        setError("Job not found or server error.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <div className="text-center py-24">
          <p className="text-red-500 mb-4">{error || "Job not found"}</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline"
          >
            ← Go back
          </button>
        </div>
      </>
    );
  }

  const tagColor = categoryColors[job.category] || categoryColors.Other;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to jobs
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Main detail ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Job card header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600 shrink-0">
                    {job.company?.[0] ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-1">
                      {job.title}
                    </h1>
                    <p className="text-slate-600 font-medium">{job.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-500" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-500" />{" "}
                    {job.type || "Full-time"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${tagColor}`}
                    >
                      {job.category}
                    </span>
                  </span>
                  {job.salary && (
                    <span className="font-semibold text-blue-600">
                      {job.salary}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition text-sm"
                >
                  Apply Now
                </button>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  Job Description
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">
                    Requirements
                  </h2>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              )}
            </div>

            {/* ── Apply form sidebar ── */}
            <div className="lg:col-span-1">
              <div
                className={`bg-white rounded-2xl border border-slate-200 p-6 sticky top-6 transition-all ${
                  showForm ? "" : "hidden lg:block"
                }`}
              >
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Apply for this position
                </h2>
                <ApplyForm jobId={id} />
              </div>

              {/* Mobile: show form button revealed above, second CTA */}
              {!showForm && (
                <div className="lg:hidden bg-white rounded-2xl border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm mb-4">
                    Ready to apply? Fill in the quick form and send your
                    application.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
                  >
                    Apply Now
                  </button>
                </div>
              )}
              {showForm && (
                <div className="lg:hidden bg-white rounded-2xl border border-slate-200 p-6 mt-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    Apply for this position
                  </h2>
                  <ApplyForm jobId={id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

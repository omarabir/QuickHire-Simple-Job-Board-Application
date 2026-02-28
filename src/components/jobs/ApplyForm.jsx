"use client";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { submitApplication } from "@/lib/api";

export default function ApplyForm({ jobId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    if (!form.resumeLink.trim()) {
      e.resumeLink = "Resume link is required";
    } else if (!/^https?:\/\/.+/.test(form.resumeLink)) {
      e.resumeLink = "Must be a valid URL (http:// or https://)";
    }
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) return setErrors(e2);
    setLoading(true);
    try {
      await submitApplication({ ...form, job: jobId });
      setSuccess(true);
      setForm({ name: "", email: "", resumeLink: "", coverNote: "" });
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      else
        setServerError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle className="w-14 h-14 text-green-500" />
        <h3 className="text-xl font-bold text-slate-900">
          Application Submitted!
        </h3>
        <p className="text-slate-500 text-sm">
          We've received your application. Good luck!
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-blue-600 text-sm font-semibold hover:underline"
        >
          Apply again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {serverError && (
        <p className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-400" : "border-slate-200"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email Address *
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-400" : "border-slate-200"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Resume link */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Resume Link *
        </label>
        <input
          name="resumeLink"
          value={form.resumeLink}
          onChange={handleChange}
          placeholder="https://drive.google.com/…"
          className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.resumeLink ? "border-red-400" : "border-slate-200"
          }`}
        />
        {errors.resumeLink && (
          <p className="mt-1 text-xs text-red-500">{errors.resumeLink}</p>
        )}
      </div>

      {/* Cover note */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Cover Note{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          name="coverNote"
          value={form.coverNote}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us why you're a great fit…"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Submitting…" : "Apply Now"}
      </button>
    </form>
  );
}

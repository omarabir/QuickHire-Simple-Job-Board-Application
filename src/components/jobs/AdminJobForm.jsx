"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createJob } from "@/lib/api";

const CATEGORIES = [
  "Design",
  "Marketing",
  "Technology",
  "Business",
  "Finance",
  "Healthcare",
  "Education",
  "Other",
];
const TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];

const empty = {
  title: "",
  company: "",
  location: "",
  category: "Technology",
  type: "Full-time",
  description: "",
  requirements: "",
  salary: "",
};

export default function AdminJobForm({ onCreated }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.description.trim()) e.description = "Description is required";
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
      const res = await createJob(form);
      setForm(empty);
      onCreated?.(res.data);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      else setServerError(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  }

  const field = (
    name,
    label,
    placeholder,
    type = "input",
    required = false,
  ) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4}
          className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors[name] ? "border-red-400" : "border-slate-200"}`}
        />
      ) : (
        <input
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] ? "border-red-400" : "border-slate-200"}`}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {serverError && (
        <p className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field("title", "Job Title", "e.g. Senior UI Designer", "input", true)}
        {field("company", "Company", "e.g. Acme Inc.", "input", true)}
        {field("location", "Location", "e.g. New York, NY", "input", true)}
        {field("salary", "Salary Range", "e.g. $80k – $100k")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Job Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {field(
        "description",
        "Job Description",
        "Describe the role, responsibilities…",
        "textarea",
        true,
      )}
      {field(
        "requirements",
        "Requirements",
        "List required skills & experience…",
        "textarea",
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center gap-2 self-start"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Creating…" : "Post Job"}
      </button>
    </form>
  );
}

// Uses Next.js API routes — works locally and on Vercel with no extra config
const BASE_URL = "/api";

async function request(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("qh_token") : null;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const register = (body) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(body) });

export const login = (body) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(body) });

export const getMe = () => request("/auth/me");

export function saveAuth(token, user) {
  localStorage.setItem("qh_token", token);
  localStorage.setItem("qh_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("qh_token");
  localStorage.removeItem("qh_user");
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("qh_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Companies ─────────────────────────────────────────────────────────────
export const getCompanies = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/companies${qs ? `?${qs}` : ""}`);
};

export const getCompanyJobs = (name) =>
  request(`/companies/${encodeURIComponent(name)}/jobs`);

// ── Jobs ──────────────────────────────────────────────────────────────────
export const getJobs = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/jobs${qs ? `?${qs}` : ""}`);
};

export const getJob = (id) => request(`/jobs/${id}`);

export const createJob = (body) =>
  request("/jobs", { method: "POST", body: JSON.stringify(body) });

export const deleteJob = (id) => request(`/jobs/${id}`, { method: "DELETE" });

// ── Applications ──────────────────────────────────────────────────────────
export const submitApplication = (body) =>
  request("/applications", { method: "POST", body: JSON.stringify(body) });

export const getApplications = () => request("/applications");

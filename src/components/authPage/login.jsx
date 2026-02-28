"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { login, saveAuth } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    try {
      const res = await login({ email: form.email, password: form.password });
      saveAuth(res.token, res.user);
      router.push("/");
    } catch (err) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        setServerError(
          err?.message || "Invalid email or password. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image
            src="/assests/logo.png"
            alt="QuickHire"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold font-display text-slate-900">
            QuickHire
          </span>
        </Link>

        <div className="max-w-md w-full">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 leading-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 mb-5 text-base">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {serverError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition ${
                  errors.email
                    ? "border-red-400"
                    : "border-slate-300 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`w-full border bg-white px-4 py-3 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition ${
                    errors.password
                      ? "border-red-400"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 text-base transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">or login with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="mx-auto flex justify-center">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"}/api/auth/google`}
              className="flex items-center justify-center gap-2 border border-slate-300 bg-white py-3 px-5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition w-full"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image
            src="/assests/Pattern.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-sm">
            <p className="text-white text-lg font-medium leading-relaxed mb-6">
              &ldquo;Great platform for the job seeker that is passionate about
              startups. Find your dream job easier.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden relative">
                <Image
                  src="/assests/men.png"
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Jake Gyll</p>
                <p className="text-white/70 text-xs">Product Designer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-white font-bold font-display text-5xl mb-4">
            Over 1,75,324
            <br />
            candidates waiting
          </h2>
          <p className="text-white/80 text-lg">
            Find the right person for your team today.
          </p>
        </div>

        <div className="relative z-10 flex gap-4">
          <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center flex-1">
            <p className="text-white font-bold font-display text-2xl">1.8k+</p>
            <p className="text-white/70 text-xs mt-1">Jobs Posted</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center flex-1">
            <p className="text-white font-bold font-display text-2xl">840k+</p>
            <p className="text-white/70 text-xs mt-1">Candidates</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center flex-1">
            <p className="text-white font-bold font-display text-2xl">100k+</p>
            <p className="text-white/70 text-xs mt-1">Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

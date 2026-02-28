"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { register, saveAuth } from "@/lib/api";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!form.terms) e.terms = "You must agree to the terms.";
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
      const res = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      saveAuth(res.token, res.user);
      router.push("/");
    } catch (err) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        setServerError(
          err?.message || "Something went wrong. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex">
      <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image
            src="/assests/Pattern.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <Image
            src="/assests/logo.png"
            alt="QuickHire"
            width={36}
            height={36}
          />
          <span className="text-xl font-bold font-display text-white">
            QuickHire
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-white font-bold font-display text-5xl leading-tight mb-6">
            Find your dream
            <br />
            job with us.
          </h2>
          <p className="text-white/80 text-lg max-w-sm leading-relaxed">
            Great platform for the job seeker that passionate about startups.
          </p>
        </div>

        <div className="relative z-10"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-12">
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
            Create Account
          </h1>
          <p className="text-slate-500 mb-4 text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          {serverError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`w-full border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition ${
                    errors.firstName
                      ? "border-red-400"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  &nbsp;
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`w-full border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition ${
                    errors.lastName
                      ? "border-red-400"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

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
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 mt-0.5 flex-shrink-0"
              />
              <div>
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-600 leading-snug"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <p className="mt-0.5 text-xs text-red-500">{errors.terms}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 text-base transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">or sign up with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="flex justify-center">
            <a
              href="/api/auth/google"
              className="flex items-center gap-2 border border-slate-300 bg-white py-3 px-5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition w-full justify-center"
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
    </div>
  );
}

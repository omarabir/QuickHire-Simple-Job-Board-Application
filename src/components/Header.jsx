"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, Briefcase } from "lucide-react";
import { clearAuth, getStoredUser } from "@/lib/api";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    clearAuth();
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-50">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assests/logo.png"
          alt="QuickHire Logo"
          width={32}
          height={32}
        />
        <span className="text-xl font-bold font-display text-slate-900">
          QuickHire
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <Link href="/jobs" className="hover:text-blue-600">
          Find Jobs
        </Link>
        <Link href="/browse-companies" className="hover:text-blue-600">
          Browse Companies
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-xl transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
              <span className="text-slate-700 font-semibold text-sm">
                {user.firstName}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="font-semibold text-slate-900 text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {user.email}
                  </p>
                </div>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <User className="w-4 h-4 text-slate-400" /> Admin Panel
                  </Link>
                )}
                <hr className="my-1 border-slate-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 font-bold">
            <Link
              href="/login"
              className="text-blue-600 px-4 py-2 hover:bg-blue-50 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-sm hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3">
        {user && (
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            {initials}
          </div>
        )}
        <button
          className="p-2 border rounded-full border-slate-200 hover:bg-slate-100 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-slate-700" />
          ) : (
            <Menu className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 flex flex-col p-4 gap-4 md:hidden z-50">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
            </div>
          )}
          <Link
            href="/jobs"
            className="text-slate-600 font-medium hover:text-blue-600 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="/browse-companies"
            className="text-slate-600 font-medium hover:text-blue-600 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Companies
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-slate-600 font-medium hover:text-blue-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <hr className="border-slate-100" />
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-red-500 font-bold py-2 hover:bg-red-50 rounded-md text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-blue-600 font-bold py-2 hover:bg-blue-50 rounded-md text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

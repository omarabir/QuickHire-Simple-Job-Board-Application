"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/assests/logo.png"
          alt="QuickHire Logo"
          width={32}
          height={32}
        />
        <span className="text-xl font-bold font-display text-slate-900">
          QuickHire
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <Link href="#" className="hover:text-blue-600">
          Find Jobs
        </Link>
        <Link href="#" className="hover:text-blue-600">
          Browse Companies
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4 font-bold">
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

      <div className="md:hidden flex items-center">
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
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          <Link
            href="#"
            className="text-slate-600 font-medium hover:text-blue-600 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="#"
            className="text-slate-600 font-medium hover:text-blue-600 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Companies
          </Link>
          <hr className="border-slate-100" />
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
        </div>
      )}
    </nav>
  );
}

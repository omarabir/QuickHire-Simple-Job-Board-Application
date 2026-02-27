'use client';
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F8F8FD] flex">
     
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image src="/assests/logo.png" alt="QuickHire" width={32} height={32} />
          <span className="text-xl font-bold font-display text-slate-900">QuickHire</span>
        </Link>

        <div className="max-w-md w-full">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 leading-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 mb-5 text-base">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          <form className="space-y-5">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

          
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link href="#" className="text-sm text-blue-600 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

      
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-blue-600" />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember me
              </label>
            </div>

           
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 text-base transition-colors"
            >
              Login
            </button>
          </form>

       
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">or login with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="mx-auto flex justify-center">
            <button className="flex items-center justify-center  border border-slate-300 bg-white py-3 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          
          </div>
        </div>
      </div>

      
      <div className="hidden lg:flex flex-1 bg-blue-600 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/assests/Pattern.png" alt="" fill className="object-cover" />
        </div>

       
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-sm">
            <p className="text-white text-lg font-medium leading-relaxed mb-6">
              &ldquo;Great platform for the job seeker that is passionate about startups. Find your dream job easier.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden relative">
                <Image src="/assests/men.png" alt="User" fill className="object-cover" />
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
            Over 1,75,324<br />candidates waiting
          </h2>
          <p className="text-white/80 text-lg">Find the right person for your team today.</p>
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

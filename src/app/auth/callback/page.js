"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveAuth } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const userRaw = searchParams.get("user");

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        saveAuth(token, user);
        router.replace("/");
      } catch {
        router.replace("/login?error=google_failed");
      }
    } else {
      router.replace("/login?error=google_failed");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-slate-500 text-sm">Signing you in with Google…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}

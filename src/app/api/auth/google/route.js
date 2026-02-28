import { NextResponse } from "next/server";

export async function GET() {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const redirectUri = `${(process.env.NEXT_PUBLIC_APP_URL || "").trim()}/api/auth/google/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "GOOGLE_CLIENT_ID not configured" },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
  );
}

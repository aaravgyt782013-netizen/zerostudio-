import { NextResponse } from "next/server";
import { ADMIN_CREDENTIALS_CONFIGURED, SESSION_COOKIE, checkCredentials, createSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  let user = "";
  let password = "";

  try {
    const body = await request.json();
    user = String(body?.user ?? "");
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!ADMIN_CREDENTIALS_CONFIGURED) {
    return NextResponse.json({ error: "Admin login is not configured. Set ADMIN_USER (or ADMIN_USERNAME / ADMIN_EMAIL) and ADMIN_PASSWORD in Vercel, then redeploy." }, { status: 503 });
  }

  if (!checkCredentials(user, password)) {
    return NextResponse.json({ error: "Galat username ya password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return response;
}

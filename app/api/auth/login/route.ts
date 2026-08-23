import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminPassword,
  safeEqual,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    if (typeof body.password === "string") password = body.password;
  } catch {
    /* fallthrough to failure */
  }

  if (!password || !safeEqual(password, getAdminPassword())) {
    // Small fixed delay to blunt brute-force timing probes.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/content";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json(searchAll(q));
}

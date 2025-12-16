import { NextRequest, NextResponse } from "next/server";
import { getReelsServerAction } from "@/app/(site)/gallery/reels/actions";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 20);
  const isReel = url.searchParams.get("isReel") === "true";

  const data = await getReelsServerAction({ page, limit, isReel });

  return NextResponse.json(data);
}

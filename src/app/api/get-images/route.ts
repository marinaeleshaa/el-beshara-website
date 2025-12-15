// app/api/get-images/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getImagesServerAction } from "@/app/(site)/gallery/images/actions";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 20);

  const data = await getImagesServerAction({ page, limit });

  return NextResponse.json(data);
}

import { getVideosServerAction } from "@/app/(site)/gallery/videos/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 20);

    const data = await getVideosServerAction({ page, limit });

    return NextResponse.json(data);
}
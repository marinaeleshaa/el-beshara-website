import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Disable caching for this route - signatures must be fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;

  try {
    const body = await request.json();

    const res = await fetch(`${process.env.SERVERBASE}/cloud/signature`, {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const backendResponse = await res.json();

    // Ensure we're returning the correct structure
    if (backendResponse.data) {
      return NextResponse.json(backendResponse.data);
    }
    return NextResponse.json(backendResponse);

  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate Cloudinary signature" },
      { status: 500 }
    );
  }
}
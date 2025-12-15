import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.SERVERBASE}/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    console.log("result from post video route", result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("An error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;

  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 5);

  try {
    const res = await fetch(`${process.env.SERVERBASE}/gallery/videos?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("An error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  const body = await req.json();
  try {
    const res = await fetch(`${process.env.SERVERBASE}/gallery`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("An error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${process.env.SERVERBASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      return NextResponse.json(
        { success: false, message: result.message || "Login failed" },
        { status: response.status }
      );
    }

    // Set Cookie
    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      data: result.data,
    });

    res.cookies.set("token", result.data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("An error occurred:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

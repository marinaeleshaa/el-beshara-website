import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const res = await fetch(`${process.env.SERVERBASE}/about`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

export async function PUT(req: Request) {
    const cookiesObj = await cookies();
    const token = cookiesObj.get("token")?.value;
    const body = await req.json();

    try{
        const res = await fetch(`${process.env.SERVERBASE}/about`, {
            method: "PUT",
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
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const cookiesObj = await cookies();
    const token = cookiesObj.get("token")?.value;

    const res = await fetch(`${process.env.SERVERBASE}/promotions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    // console.log("result from delete promotion route", result);

    if (!res.ok || result.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Delete promotion failed",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.log("Error:", error);
    // return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { title, description, validFrom, validTo } = await req.json();
    const cookiesObj = await cookies();
    const token = cookiesObj.get("token")?.value;
    const res = await fetch(`${process.env.SERVERBASE}/promotions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, validFrom, validTo }),
    });
    const result = await res.json();
    // console.log("result from patch promotion route", result);

    if (!res.ok || result.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Update promotion failed",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.log("Error:", error);
    // return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

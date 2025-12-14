import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  console.log(token)
  try {
    const res = await fetch(`${process.env.SERVERBASE}/cloud/signature`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const backendResponse = await res.json();
    console.log("backendResponse", backendResponse);
    return NextResponse.json(backendResponse.data);

    // const { cloudName, apiKey, signature, timestamp } = backendResponse.data;

    // return NextResponse.json({
    //   cloudName,
    //   apiKey,
    //   signature,
    //   timestamp,
    // });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate Cloudinary signature" },
      { status: 500 }
    );
  }
}

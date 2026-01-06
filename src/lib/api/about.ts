"use server";
import { revalidateTag } from "next/cache";
import { IProfile } from "../Interfaces/AboutInterface";
import { cookies } from "next/headers";

export async function getAbout(): Promise<
  IProfile | { success: false; message: string }
> {
  try {
    const res = await fetch(`${process.env.SERVERBASE}/about`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["about"],
      },
    });
    const result = await res.json();
    return result;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function UpdateAbout(data: IProfile) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  try {
    const res = await fetch(`${process.env.SERVERBASE}/about`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag("about", "default");
    return res.json();
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

"use server";

import { cookies } from "next/headers";

export const getImagesServerAction = async ({ page = 1, limit = 5 }) => {
  const cookiesObj = await cookies();
  const token = cookiesObj.get("token")?.value;
  try {
    const res = await fetch(
      `${process.env.SERVERBASE}/gallery/images/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 50 },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
    return { success: false, message: "Server error" };
  }
};

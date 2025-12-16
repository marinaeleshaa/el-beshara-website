"use server"

import { cookies } from "next/headers";

export const getReelsServerAction = async ({ page = 1, limit = 20 , isReel=true }) => {
    const cookiesObj = await cookies();
    const token = cookiesObj.get("token")?.value;
    try {
        const res = await fetch(`${process.env.SERVERBASE}/gallery/videos/?page=${page}&limit=${limit}&isReel=${isReel}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 50 },
        });
        const result = await res.json();
        return result;
    } catch (err) {
        console.error("An error occurred:", err);
        return { success: false, message: "Server error" };
    }
};
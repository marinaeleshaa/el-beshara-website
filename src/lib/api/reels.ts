import { IImage } from "../Interfaces/ImgInterface";

export const AddReelMethod = async (data: IImage) => {
  try {
    const res = await fetch("/api/reels", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const getReelsMethod = async ({
  page = 1,
  limit = 5,
  isReel = true,
}) => {
  try {
    const res = await fetch(
      `/api/reels?page=${page}&limit=${limit}&isReel=${isReel}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const deleteReelMethod = async (ids: string[]) => {
  try {
    const res = await fetch(`/api/reels`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    return res.json();
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

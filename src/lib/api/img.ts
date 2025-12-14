import { IImage } from "../Interfaces/ImgInterface";

export const AddImageMethod = async (data: IImage) => {
  try {
    const res = await fetch("/api/img", {
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

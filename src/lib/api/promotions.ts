import { IPromotionInterface } from "../Interfaces/PromotionInterface";

export const addPromotionMethod = async (data: IPromotionInterface) => {
  try {
    const res = await fetch("/api/promotions", {
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

export const getPromotionsMethod = async ({ page = 1, limit = 5 }) => {
  try {
    const res = await fetch(`/api/promotions?page=${page}&limit=${limit}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const deletePromotionMethod = async (id: string) => {
  try {
    const res = await fetch(`/api/promotions/${id}`, {
      method: "DELETE",
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
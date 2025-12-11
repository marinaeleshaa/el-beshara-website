export const addAdminMethod = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const result = await res.json();
    return result;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const getAdminsMethod = async ({ page = 1, limit = 5 }: { page?: number; limit?: number }) => {
  try {
    const res = await fetch(`/api/admin?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    // console.log("result", result);
    return result;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};


export const deleteAdminMethod = async (id: string) => {
  try {
    const res = await fetch(`/api/admin/${id}`, {
      method: "DELETE",
    })
    const result = await res.json();
    return result;
  } catch (err) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
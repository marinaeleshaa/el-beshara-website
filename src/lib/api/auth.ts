export const loginMethod = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    return result; // خلاص الريسبونس جاهز success, message, data
  } catch (err: unknown) {
    if (err instanceof Error) return { success: false, message: err.message };
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

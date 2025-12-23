"use server";

import { IMail } from "../Interfaces/Mail";

export const SendMail = async (data: IMail) => {
  console.log("data", data);

  const res = await fetch(`${process.env.SERVERBASE}/mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};


"use server";

import { getMyToken } from "@/app/utilitis/getToken";



export async function ClearCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart",
    {
      method: "DELETE",
      headers: {
        token: token,
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to clear cart.");
  }

  return payload;
}
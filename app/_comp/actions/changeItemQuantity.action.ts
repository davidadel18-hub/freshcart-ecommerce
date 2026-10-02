"use server";

import { getMyToken } from "@/app/utilitis/getToken";



export async function UpdateCartItem(
  productId: string,
  count: number
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/changeItemQuantity`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        productId,
        count: String(count),
      }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to update cart item");
  }

  return payload;
}
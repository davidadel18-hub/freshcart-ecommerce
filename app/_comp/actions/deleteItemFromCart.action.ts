"use server";

import { getMyToken } from "@/app/utilitis/getToken";



export async function DeleteItemFromCart(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/deleteItemFromCart`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to delete product");
  }

  return payload;
}
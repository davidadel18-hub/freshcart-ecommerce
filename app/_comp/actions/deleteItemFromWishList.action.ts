"use server";

import { getMyToken } from "@/app/utilitis/getToken";

export async function DeleteItemFromWishList(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/deleteItemFromWishList`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      payload.message || "Failed to delete item from wishlist"
    );
  }

  return payload;
}
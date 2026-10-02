"use server";

import { getMyToken } from "@/app/utilitis/getToken";

type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export async function PayOnline(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/payOnline`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        shippingAddress,
      }),
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to start online payment");
  }

  return payload;
}
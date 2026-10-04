"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";

export async function GetAllOrders() {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  console.log("Orders User ID:", userId);

  if (!userId) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const payload = await response.json();

  console.log("Orders Response:", payload);

  if (!response.ok) {
    throw new Error(
      payload?.message || "Failed to get orders"
    );
  }

  return payload;
}
"use server";

import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";


export async function GetAllOrders() {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/allorders?userId=${userId}`
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to get orders");
  }

  return payload;
}
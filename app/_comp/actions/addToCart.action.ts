"use server";

import { getMyToken } from "@/app/utilitis/getToken";

export async function AddToCart(productId: string) {
  const token = await getMyToken();

  console.log("Token exists:", !!token);
  console.log("Token length:", token?.length);

  // User is not logged in
  if (!token) {
    return {
      success: false,
      message: "Please Login",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/addProduct`,
      {
        method: "POST",
        body: JSON.stringify({
          productId,
        }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    const payload = await response.json();

    console.log("API Response:", payload);

    if (!response.ok) {
      return {
        success: false,
        message: payload.message || "Failed to add product",
      };
    }

    return {
      success: true,
      data: payload,
    };
  } catch (error: unknown) {
    console.error("Catch Error Details:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}
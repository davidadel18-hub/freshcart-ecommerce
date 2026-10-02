import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    console.error("Get user orders error:", error);

    return NextResponse.json(
      { message: "Failed to get orders" },
      { status: 500 }
    );
  }
}
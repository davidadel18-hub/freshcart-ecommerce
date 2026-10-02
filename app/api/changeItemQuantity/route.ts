import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("token");
    const { productId, count } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!productId || count === undefined) {
      return NextResponse.json(
        { message: "Product ID and count are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          count: String(count),
        }),
      }
    );

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update cart item" },
      { status: 500 }
    );
  }
}
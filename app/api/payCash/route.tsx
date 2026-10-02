import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cartId, shippingAddress } = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { message: "Cart ID is required" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { message: "Shipping address is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress,
        }),
      }
    );

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    console.error("Pay cash error:", error);

    return NextResponse.json(
      { message: "Failed to place cash order" },
      { status: 500 }
    );
  }
}
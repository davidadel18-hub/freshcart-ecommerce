
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    // Get token from request headers
    const token = request.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 }
      );
    }

    // Send DELETE request to Route Egypt API
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/clearCart}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    const payload = await response.json();

    // Handle backend errors
    if (!response.ok) {
      return NextResponse.json(payload, {
        status: response.status,
      });
    }

    // Return successful response
    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    console.error("Clear Cart Route Handler Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


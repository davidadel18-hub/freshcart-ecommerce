import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        method: "GET",
      }
    );

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get brands",
      },
      {
        status: 500,
      }
    );
  }
}
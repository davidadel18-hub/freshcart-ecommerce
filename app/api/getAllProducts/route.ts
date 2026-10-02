import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
     if (!res.ok) throw new Error('Api Error')
     const payload = await res.json()
     return NextResponse.json(payload);
   } catch (error) {
     console.error("Data Fetching Error:", error);

    throw new Error(error instanceof Error ? error.message : 'Unknown data layer connection failure');

   }
}
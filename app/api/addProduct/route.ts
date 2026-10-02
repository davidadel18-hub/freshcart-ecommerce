
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // 1. Get token sent from Server Action
        const token = request.headers.get('token')

        // 2. Check token before calling the API
        if (!token) {
            return NextResponse.json(
                { message: 'Token is missing. Please login again.' },
                { status: 401 }
            )
        }

        // 3. Get productId from request body
        const { productId } = await request.json()

        // 4. Send request to the real API
        const apiResponse = await fetch(
            'https://ecommerce.routemisr.com/api/v1/cart',
            {
                method: 'POST',
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            }
        )

        // 5. Read API response
        const payload = await apiResponse.json()

        // 6. Handle API errors
        if (!apiResponse.ok) {
            return NextResponse.json(payload, {
                status: apiResponse.status,
            })
        }

        // 7. Return success response
        return NextResponse.json(payload)

    } catch (error: unknown) {
        console.error('AddProduct route error:', error)

        return NextResponse.json(
            { message: 'API failed' },
            { status: 500 }
        )
    }
}


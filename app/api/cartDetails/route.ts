
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        // Get token from the request headers
        const token = request.headers.get('token')

        // Check if token exists
        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized. Please login again.' },
                { status: 401 }
            )
        }

        // Call the real Cart API
        const response = await fetch(
            'https://ecommerce.routemisr.com/api/v1/cart',
            {
                method: 'GET',
                headers: {
                    token: token,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        )

        const payload = await response.json()

        // Handle API error
        if (!response.ok) {
            return NextResponse.json(payload, {
                status: response.status,
            })
        }

        // Return cart details
        return NextResponse.json(payload)

    } catch (error: unknown) {
        console.error('Cart Details route error:', error)

        return NextResponse.json(
            { message: 'API failed' },
            { status: 500 }
        )
    }
}


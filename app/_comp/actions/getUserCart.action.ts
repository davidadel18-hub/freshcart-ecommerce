'use server'

import { getMyToken } from '@/app/utilitis/getToken'

export async function GetUSerCart() {
    const token = await getMyToken()

    if (!token) {
        throw new Error('Please login first')
    }

    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/cartDetails`,
        {
            method: 'GET',
            headers: {
                token: token,
            },
            
        }
    )

    const payload = await response.json()

    if (!response.ok) {
        throw new Error(
            payload.message || 'Failed to get user cart'
        )
    }

    return payload
}


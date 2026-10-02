'use server'

import { getMyToken } from "@/app/utilitis/getToken"

export async function AddToCart(productId: string) {
    const token = await getMyToken()

console.log('Token exists:', !!token)
console.log('Token length:', token?.length)

    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/addProduct`, {
            method: 'POST',
            body: JSON.stringify({ productId: productId }),
            headers: {
                token: token || '',
                'Content-Type': 'application/json'
            }
        });

        const payload = await response.json();
        console.log("API Response:", payload);
        if (!token) {
    throw new Error('Please Login');
}
        
        if (!response.ok) {
            throw new Error(payload.message || 'Failed to add product');
        }

        return payload;
        
   } catch (error: unknown) {
    console.error("Catch Error Details:", error);
    const message = error instanceof Error ? error.message : 'Api failed';
    throw new Error(message);
}
}
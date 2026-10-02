'use server'

import { LoginType } from "@/app/(auth)/login/page";
import { User } from "@/app/(auth)/register/page";
import { signIn } from "next-auth/react";

export async function registerUser(data: User) {

    try {
        const request = await fetch(`${process.env.API}/auth/signup` , {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            const payload = await request.json()
            console.log(payload);
        return request.ok
    } catch (error) {
        return false
    }




}






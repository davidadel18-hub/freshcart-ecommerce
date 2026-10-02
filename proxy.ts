import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
    const pathName = req.nextUrl.pathname

    const protectedPages = ['/cart' , '/wishList']
    const authPages = ['/login', '/register']

    const myToken = await getToken({
        req : req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    })

    const isAuthenticated = !!myToken

   
    if (isAuthenticated && authPages.some((path) => pathName.startsWith(path))) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

   
    if (!isAuthenticated && protectedPages.some((path) => pathName.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart/:path*', '/login', '/register' , '/wishList/:path*']
}

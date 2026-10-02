import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface DecodedToken {
    id: string;
    [key: string]: unknown;
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: 'myLogin',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'enter your email' },
                password: { label: 'password', type: 'password', placeholder: 'enter your password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                let req: Response;
                try {
                    req = await fetch(`${process.env.API}auth/signin`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });
                } catch {
                    throw new Error('Unable to reach authentication server');
                }

                if (!req.ok) {
                    const errorData = await req.json().catch(() => null);
                    throw new Error(errorData?.message || 'Invalid email or password');
                }

                let payload: { token: string; user: { name: string; email: string } };
                let decodedToken: DecodedToken;
                try {
                    payload = await req.json();
                    decodedToken = jwtDecode<DecodedToken>(payload.token);
                } catch {
                    throw new Error('Invalid server response');
                }

                return {
                    id: decodedToken.id,
                    name: payload.user.name,
                    email: payload.user.email,
                    realToken: payload.token
                };
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.realToken = user.realToken;
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                // ⚠️ لسه موجودة هنا - راجع الملاحظة تحت
                session.user.realToken = token.realToken;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
};
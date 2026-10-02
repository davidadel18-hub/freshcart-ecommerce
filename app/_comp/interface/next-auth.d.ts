import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      address?: string
      realToken: string
    } & DefaultSession["user"]
  }

  interface User {
    realToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realToken: string
    id: string
  }
}

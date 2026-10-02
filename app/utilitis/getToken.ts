
import { authOptions } from '@/next-auth/authOptions'
import { getServerSession } from 'next-auth'


export async function getMyToken(): Promise<string | null> {
    const session = await getServerSession(authOptions)

    return session?.user?.realToken ?? null
}


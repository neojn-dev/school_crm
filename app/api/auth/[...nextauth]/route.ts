import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Add explicit runtime configuration for Next.js 15
export const runtime = 'nodejs'

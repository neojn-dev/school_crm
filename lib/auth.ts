import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { config } from "@/lib/config"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null
        }

        // Find user by username or email
        const user = await db.user.findFirst({
          where: {
            OR: [
              { username: credentials.identifier },
              { email: credentials.identifier },
            ],
          },
        })

        if (!user || !user.emailVerified) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id
          token.role = user.role
          token.username = user.username
        }
        return token
      } catch (error) {
        console.warn('JWT callback error:', error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (token && session?.user) {
          session.user.id = token.id as string
          session.user.role = token.role as string
          session.user.username = token.username as string
        }
        return session
      } catch (error) {
        console.warn('Session callback error:', error)
        return session
      }
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", // Redirect errors to signin page
  },
  secret: config.auth.secret,
  debug: false, // Disable debug logging to reduce console noise
  trustHost: true,
  logger: {
    error: () => {
      // Completely suppress all NextAuth errors to prevent console noise
      // In production, we don't want any NextAuth errors in the console
      // In development, 401 errors are expected when users aren't logged in
      return
    },
    warn: () => {
      // Suppress all NextAuth warnings
      return
    },
    debug: () => {
      // Suppress all NextAuth debug messages
      return
    }
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
}

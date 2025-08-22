"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionProviderWrapperProps {
  children: ReactNode
}

export function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch every 5 minutes
      refetchOnWindowFocus={false} // Don't refetch on window focus to prevent hydration issues
      basePath="/api/auth" // Explicitly set the base path for NextAuth API calls
    >
      {children}
    </SessionProvider>
  )
}


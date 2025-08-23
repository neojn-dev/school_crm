"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionProviderWrapperProps {
  children: ReactNode
}

export function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true} // Refetch on window focus to ensure fresh session
      basePath="/api/auth" // Explicitly set the base path for NextAuth API calls
    >
      {children}
    </SessionProvider>
  )
}


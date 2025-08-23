"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionProviderWrapperProps {
  children: ReactNode
}

export function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  return (
    <SessionProvider 
      session={null} // Explicitly set to null to prevent initial session fetch
      refetchInterval={0} // Disable automatic refetching
      refetchOnWindowFocus={false} // Don't refetch on window focus
      basePath="/api/auth" // Explicitly set the base path for NextAuth API calls
      refetchWhenOffline={false} // Don't refetch when offline
    >
      {children}
    </SessionProvider>
  )
}


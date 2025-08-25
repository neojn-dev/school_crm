"use client"

import { useEffect, useRef, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { toast } from "@/components/ui/toast-container"

interface SessionValidationResponse {
  valid: boolean
  reason?: string
  user?: {
    id: string
    role: string
    roleId: string | null
  }
}

interface UseSessionValidatorOptions {
  /**
   * Interval in milliseconds for periodic validation
   * Default: 5 minutes (300000ms)
   */
  intervalMs?: number
  
  /**
   * Whether to validate on window focus/visibility change
   * Default: true
   */
  validateOnFocus?: boolean
  
  /**
   * Whether to validate on page load/refresh
   * Default: true
   */
  validateOnMount?: boolean
  
  /**
   * Whether to show toast notifications
   * Default: true
   */
  showNotifications?: boolean
}

export function useSessionValidator(options: UseSessionValidatorOptions = {}) {
  const {
    intervalMs = 5 * 60 * 1000, // 5 minutes
    validateOnFocus = true,
    validateOnMount = true,
    showNotifications = true
  } = options

  const { data: session, status } = useSession()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isValidatingRef = useRef(false)

  const validateSession = useCallback(async (): Promise<boolean> => {
    // Don't validate if no session or already validating
    if (!session?.user?.id || isValidatingRef.current || status !== "authenticated") {
      return true
    }

    isValidatingRef.current = true

    try {
      const response = await fetch('/api/auth/validate-session', {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: SessionValidationResponse = await response.json()

      if (!data.valid) {
        // Session is invalid, log out the user
        await handleInvalidSession(data.reason || 'UNKNOWN')
        return false
      }

      return true
    } catch (error) {
      console.warn('Session validation failed:', error)
      // Don't log out on network errors, just log the issue
      return true
    } finally {
      isValidatingRef.current = false
    }
  }, [session?.user?.id, status])

  const handleInvalidSession = useCallback(async (reason: string) => {
    let message = "Your session has expired. Please sign in again."

    switch (reason) {
      case "ACCOUNT_DEACTIVATED":
        message = "Your account has been deactivated. Please contact your administrator."
        break
      case "USER_NOT_FOUND":
        message = "Your account no longer exists. Please contact your administrator."
        break
      case "EMAIL_NOT_VERIFIED":
        message = "Your email verification has been revoked. Please contact your administrator."
        break
      case "NO_SESSION":
        message = "Your session has expired. Please sign in again."
        break
    }

    if (showNotifications) {
      toast.error(message)
    }

    // Wait a moment for the toast to show, then sign out
    setTimeout(async () => {
      await signOut({ 
        callbackUrl: '/auth/signin',
        redirect: true 
      })
    }, 2000)
  }, [showNotifications])

  const startPeriodicValidation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      validateSession()
    }, intervalMs)
  }, [validateSession, intervalMs])

  const stopPeriodicValidation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Handle window focus/visibility change
  useEffect(() => {
    if (!validateOnFocus) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, validate session
        validateSession()
      }
    }

    const handleFocus = () => {
      validateSession()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [validateOnFocus, validateSession])

  // Handle mount validation and periodic validation
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) {
      stopPeriodicValidation()
      return
    }

    // Validate on mount if enabled
    if (validateOnMount) {
      validateSession()
    }

    // Start periodic validation
    startPeriodicValidation()

    return () => {
      stopPeriodicValidation()
    }
  }, [
    session?.user?.id, 
    status, 
    validateOnMount, 
    validateSession, 
    startPeriodicValidation, 
    stopPeriodicValidation
  ])

  return {
    validateSession,
    isValidating: isValidatingRef.current
  }
}

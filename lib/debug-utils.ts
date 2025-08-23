/**
 * Debug Utilities for Server-Side Debugging
 * 
 * These utilities help with common debugging scenarios in Next.js applications.
 * Only use these in development - they should not be included in production builds.
 */

// Type for debug levels
type DebugLevel = 'info' | 'warn' | 'error' | 'debug'

/**
 * Enhanced console logging with timestamps and context
 */
export function debugLog(level: DebugLevel, context: string, message: string, data?: any) {
  if (process.env.NODE_ENV === 'production') return

  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${context}]`
  
  switch (level) {
    case 'error':
      console.error(`🔴 ${prefix}`, message, data || '')
      break
    case 'warn':
      console.warn(`🟡 ${prefix}`, message, data || '')
      break
    case 'info':
      console.info(`🔵 ${prefix}`, message, data || '')
      break
    case 'debug':
      console.debug(`🟣 ${prefix}`, message, data || '')
      break
  }
}

/**
 * Debug API requests and responses
 */
export function debugAPI(method: string, url: string, data?: any, response?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('info', 'API', `${method} ${url}`)
  
  if (data) {
    debugLog('debug', 'API-REQUEST', 'Request data:', data)
  }
  
  if (response) {
    debugLog('debug', 'API-RESPONSE', 'Response data:', response)
  }
}

/**
 * Debug database operations
 */
export function debugDB(operation: string, table: string, data?: any, result?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('info', 'DATABASE', `${operation} on ${table}`)
  
  if (data) {
    debugLog('debug', 'DB-DATA', 'Operation data:', data)
  }
  
  if (result) {
    debugLog('debug', 'DB-RESULT', 'Operation result:', result)
  }
}

/**
 * Debug authentication operations
 */
export function debugAuth(operation: string, user?: any, session?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('info', 'AUTH', `Authentication: ${operation}`)
  
  if (user) {
    // Don't log sensitive data like passwords
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
    debugLog('debug', 'AUTH-USER', 'User data:', safeUser)
  }
  
  if (session) {
    debugLog('debug', 'AUTH-SESSION', 'Session data:', session)
  }
}

/**
 * Performance debugging - measure execution time
 */
export function debugPerformance<T>(
  label: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  if (process.env.NODE_ENV === 'production') {
    return fn()
  }

  const start = performance.now()
  debugLog('debug', 'PERF', `Starting: ${label}`)
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.then((value) => {
      const end = performance.now()
      debugLog('info', 'PERF', `Completed: ${label} (${(end - start).toFixed(2)}ms)`)
      return value
    }).catch((error) => {
      const end = performance.now()
      debugLog('error', 'PERF', `Failed: ${label} (${(end - start).toFixed(2)}ms)`, error)
      throw error
    })
  } else {
    const end = performance.now()
    debugLog('info', 'PERF', `Completed: ${label} (${(end - start).toFixed(2)}ms)`)
    return result
  }
}

/**
 * Debug middleware execution
 */
export function debugMiddleware(path: string, method: string, headers?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('info', 'MIDDLEWARE', `${method} ${path}`)
  
  if (headers) {
    // Log relevant headers (avoid sensitive ones)
    const safeHeaders = {
      'user-agent': headers['user-agent'],
      'content-type': headers['content-type'],
      'accept': headers['accept'],
      'referer': headers['referer']
    }
    debugLog('debug', 'MIDDLEWARE-HEADERS', 'Request headers:', safeHeaders)
  }
}

/**
 * Debug server-side props and components
 */
export function debugSSR(component: string, props?: any, context?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('info', 'SSR', `Rendering: ${component}`)
  
  if (props) {
    debugLog('debug', 'SSR-PROPS', 'Component props:', props)
  }
  
  if (context) {
    debugLog('debug', 'SSR-CONTEXT', 'Render context:', context)
  }
}

/**
 * Conditional debugger statement
 */
export function debugBreakpoint(condition?: boolean, message?: string) {
  if (process.env.NODE_ENV === 'production') return
  
  if (condition === undefined || condition) {
    if (message) {
      debugLog('debug', 'BREAKPOINT', message)
    }
    // eslint-disable-next-line no-debugger
    debugger
  }
}

/**
 * Debug error with stack trace
 */
export function debugError(error: Error, context: string, additionalData?: any) {
  if (process.env.NODE_ENV === 'production') return

  debugLog('error', context, `Error: ${error.message}`)
  debugLog('error', context, `Stack: ${error.stack}`)
  
  if (additionalData) {
    debugLog('error', context, 'Additional data:', additionalData)
  }
}

/**
 * Debug session state
 */
export function debugSession(session: any, context: string = 'SESSION') {
  if (process.env.NODE_ENV === 'production') return

  if (!session) {
    debugLog('warn', context, 'No session found')
    return
  }

  const safeSession = {
    user: session.user ? {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      role: session.user.role
    } : null,
    expires: session.expires
  }

  debugLog('info', context, 'Session state:', safeSession)
}

// Export a debug object with all utilities for easy importing
export const debug = {
  log: debugLog,
  api: debugAPI,
  db: debugDB,
  auth: debugAuth,
  perf: debugPerformance,
  middleware: debugMiddleware,
  ssr: debugSSR,
  breakpoint: debugBreakpoint,
  error: debugError,
  session: debugSession
}

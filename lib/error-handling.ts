// Standardized error handling utilities for consistent error management

export interface AppError {
  message: string
  code?: string
  statusCode?: number
  details?: any
}

export class AuthError extends Error {
  code: string
  statusCode: number
  details?: any

  constructor(message: string, code: string = 'AUTH_ERROR', statusCode: number = 400, details?: any) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

export class ValidationError extends Error {
  code: string
  statusCode: number
  details?: any

  constructor(message: string, details?: any) {
    super(message)
    this.name = 'ValidationError'
    this.code = 'VALIDATION_ERROR'
    this.statusCode = 400
    this.details = details
  }
}

export class NetworkError extends Error {
  code: string
  statusCode: number

  constructor(message: string = 'Network error occurred') {
    super(message)
    this.name = 'NetworkError'
    this.code = 'NETWORK_ERROR'
    this.statusCode = 500
  }
}

// Standard error messages
export const ERROR_MESSAGES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'Invalid username or password',
  ACCOUNT_DEACTIVATED: 'Your account has been deactivated. Please contact your administrator.',
  EMAIL_NOT_VERIFIED: 'Please verify your email before signing in',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  
  // Validation errors
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: "Passwords don't match",
  
  // Network errors
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  SERVER_ERROR: 'An error occurred. Please try again later.',
  
  // Token errors
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_EXPIRED: 'Token has expired',
  
  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
} as const

// Error handler for API responses
export function handleApiError(error: any): AppError {
  if (error instanceof AuthError || error instanceof ValidationError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details
    }
  }

  if (error instanceof NetworkError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode
    }
  }

  if (error?.response) {
    // HTTP error response
    return {
      message: error.response.data?.error || ERROR_MESSAGES.SERVER_ERROR,
      code: 'HTTP_ERROR',
      statusCode: error.response.status,
      details: error.response.data
    }
  }

  if (error?.request) {
    // Network error
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
      statusCode: 500
    }
  }

  // Generic error
  return {
    message: error?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    code: 'UNKNOWN_ERROR',
    statusCode: 500
  }
}

// Error display helper
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error
  }

  if (error?.message) {
    return error.message
  }

  if (error?.error) {
    return error.error
  }

  return ERROR_MESSAGES.SOMETHING_WENT_WRONG
}

// Form error helper
export function getFieldError(errors: any, fieldName: string): string | undefined {
  const error = errors[fieldName]
  if (!error) return undefined
  
  return error.message || ERROR_MESSAGES.REQUIRED_FIELD
}

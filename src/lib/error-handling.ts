import { NextRequest, NextResponse } from "next/server"
import * as Sentry from '@sentry/nextjs'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export const handleError = (error: unknown) => {
  console.error("Error:", error)

  if (error instanceof AppError) {
    // Log operational errors to Sentry
    if (!error.isOperational) {
      Sentry.captureException(error)
    }
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    // Log unknown errors to Sentry
    Sentry.captureException(error)
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    )
  }

  // Log unknown errors to Sentry
  Sentry.captureException(error)

  return NextResponse.json(
    {
      status: "error",
      message: "An unexpected error occurred",
    },
    { status: 500 }
  )
}

export const asyncHandler = (fn: Function) => {
  return async (req: NextRequest) => {
    try {
      return await fn(req)
    } catch (error) {
      return handleError(error)
    }
  }
}

// API error response helper
export const sendErrorResponse = (statusCode: number, message: string) => {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: statusCode }
  )
}

// API success response helper
export const sendSuccessResponse = (data: any, statusCode = 200) => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  )
}

// Validation error helper
export const createValidationError = (message: string) => {
  return new AppError(400, message, true)
}

// Authentication error helper
export const createAuthError = (message: string) => {
  return new AppError(401, message, true)
}

// Authorization error helper
export const createForbiddenError = (message: string) => {
  return new AppError(403, message, true)
}

// Not found error helper
export const createNotFoundError = (message: string) => {
  return new AppError(404, message, true)
}

// Rate limit error helper
export const createRateLimitError = (message: string) => {
  return new AppError(429, message, true)
} 
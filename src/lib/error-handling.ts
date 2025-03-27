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
  if (error instanceof AppError) {
    // Log operational errors to Sentry
    if (!error.isOperational) {
      Sentry.captureException(error)
    }
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    }
  }

  // Log unknown errors to Sentry
  Sentry.captureException(error)

  return {
    statusCode: 500,
    message: 'An unexpected error occurred',
    isOperational: false,
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// API error response helper
export const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({
    success: false,
    error: message,
  })
}

// API success response helper
export const sendSuccessResponse = (res: Response, data: any, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  })
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
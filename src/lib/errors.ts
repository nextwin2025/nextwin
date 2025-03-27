export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message)
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(401, message)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Not authorized") {
    super(403, message)
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(404, message)
    this.name = "NotFoundError"
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Resource already exists") {
    super(409, message)
    this.name = "ConflictError"
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed") {
    super(500, message)
    this.name = "DatabaseError"
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      name: error.name,
    }
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; message: string }
    switch (prismaError.code) {
      case "P2002":
        return {
          statusCode: 409,
          message: "A record with this unique field already exists",
          name: "ConflictError",
        }
      case "P2025":
        return {
          statusCode: 404,
          message: "Record not found",
          name: "NotFoundError",
        }
      default:
        return {
          statusCode: 500,
          message: "Database operation failed",
          name: "DatabaseError",
        }
    }
  }

  // Handle unknown errors
  console.error("Unhandled error:", error)
  return {
    statusCode: 500,
    message: "An unexpected error occurred",
    name: "InternalServerError",
  }
} 
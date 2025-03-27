import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Database connection error handler
export const handleDatabaseError = (error: unknown) => {
  console.error('Database error:', error)
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific database errors
    switch (error.code) {
      case 'P2002':
        return {
          statusCode: 409,
          message: 'A record with this unique field already exists',
        }
      case 'P2025':
        return {
          statusCode: 404,
          message: 'Record not found',
        }
      case 'P1001':
        return {
          statusCode: 503,
          message: 'Database connection failed',
        }
      default:
        return {
          statusCode: 500,
          message: 'An unexpected database error occurred',
        }
    }
  }

  // Default error
  return {
    statusCode: 500,
    message: 'An unexpected database error occurred',
  }
}

// Transaction helper
export const withTransaction = async <T>(
  callback: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> => {
  return prisma.$transaction(async (tx) => {
    return callback(tx)
  })
}

// Connection status check
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection check failed:', error)
    return false
  }
}

// Graceful shutdown
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Export types
export type PrismaTransaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
> 
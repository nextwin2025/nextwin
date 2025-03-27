import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleDatabaseError } from "@/lib/db"

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`

    // Get database metrics
    const metrics = {
      connections: await prisma.$queryRaw`
        SELECT count(*) as count
        FROM pg_stat_activity
        WHERE datname = current_database()
      `,
      tables: await prisma.$queryRaw`
        SELECT count(*) as count
        FROM information_schema.tables
        WHERE table_schema = 'public'
      `,
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      metrics,
    })
  } catch (error) {
    console.error("Database health check failed:", error)
    const { statusCode, message } = handleDatabaseError(error)
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: message,
      },
      { status: statusCode }
    )
  }
} 
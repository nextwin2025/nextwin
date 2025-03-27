import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { config } from "@/lib/config"

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
      environment: process.env.NODE_ENV,
      config: {
        isProduction: config.isProduction,
        isDevelopment: config.isDevelopment,
        isTest: config.isTest,
      },
      metrics,
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 503 }
    )
  }
} 
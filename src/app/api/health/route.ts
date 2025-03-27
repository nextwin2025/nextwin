import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { config } from "@/lib/env"

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
})

export async function GET() {
  try {
    // Check Redis connection
    await redis.ping()

    // Check database connection
    const dbStatus = await fetch(`${config.api.baseUrl}/api/db/status`).then(
      (res) => res.ok
    )

    // Get system metrics
    const metrics = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        redis: "connected",
        database: dbStatus ? "connected" : "disconnected",
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
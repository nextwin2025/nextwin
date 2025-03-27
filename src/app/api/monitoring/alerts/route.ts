import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { config } from "@/lib/config"

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
})

export async function GET() {
  try {
    // Check Redis connection
    await redis.ping()

    // Get alerts from Redis
    const alerts = await redis.lrange("alerts", 0, -1)

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      alerts: alerts.map((alert) => JSON.parse(alert)),
    })
  } catch (error) {
    console.error("Failed to fetch alerts:", error)
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Failed to fetch alerts",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, message, severity = "info" } = body

    if (!type || !message) {
      return NextResponse.json(
        {
          status: "error",
          error: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const alert = {
      type,
      message,
      severity,
      timestamp: new Date().toISOString(),
    }

    // Store alert in Redis
    await redis.lpush("alerts", JSON.stringify(alert))
    await redis.ltrim("alerts", 0, 99) // Keep only last 100 alerts

    return NextResponse.json({
      status: "success",
      alert,
    })
  } catch (error) {
    console.error("Failed to create alert:", error)
    return NextResponse.json(
      {
        status: "error",
        error: "Failed to create alert",
      },
      { status: 500 }
    )
  }
} 
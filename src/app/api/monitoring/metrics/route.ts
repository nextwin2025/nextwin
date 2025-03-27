import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { config } from "@/lib/config"

interface Metrics {
  requests: number
  errors: number
  latency: number
  uptime: number
  timestamp: string
}

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
})

export async function GET() {
  try {
    // Check Redis connection
    await redis.ping()

    // Get metrics from Redis
    const metricsData = await redis.get<string>("monitoring:metrics")
    if (!metricsData) {
      return NextResponse.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        metrics: {
          requests: 0,
          errors: 0,
          latency: 0,
          uptime: process.uptime(),
        },
      })
    }

    const metrics: Metrics = JSON.parse(metricsData)

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      metrics,
    })
  } catch (error) {
    console.error("Failed to fetch metrics:", error)
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Failed to fetch metrics",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { requests, errors, latency } = body

    const metrics: Metrics = {
      requests: requests || 0,
      errors: errors || 0,
      latency: latency || 0,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }

    // Store metrics in Redis
    await redis.set("monitoring:metrics", JSON.stringify(metrics))

    return NextResponse.json({
      status: "success",
      metrics,
    })
  } catch (error) {
    console.error("Failed to update metrics:", error)
    return NextResponse.json(
      {
        status: "error",
        error: "Failed to update metrics",
      },
      { status: 500 }
    )
  }
} 
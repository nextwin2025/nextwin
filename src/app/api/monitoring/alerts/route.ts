import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { config } from "@/lib/env"

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
})

export async function GET() {
  try {
    // Fetch alerts from Redis
    const alerts = await redis.get("monitoring:alerts")
    if (!alerts) {
      return NextResponse.json([])
    }

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 }
    )
  }
} 
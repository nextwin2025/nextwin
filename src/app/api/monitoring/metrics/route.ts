import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { config } from "@/lib/env"

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
})

export async function GET() {
  try {
    // Fetch metrics from Redis
    const metrics = await redis.get("monitoring:metrics")
    if (!metrics) {
      return NextResponse.json([])
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    )
  }
} 
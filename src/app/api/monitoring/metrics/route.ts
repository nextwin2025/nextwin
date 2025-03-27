import { NextResponse } from "next/server"

interface Metrics {
  requests: number
  errors: number
  latency: number
  uptime: number
  timestamp: string
}

// In-memory storage for development
let metrics: Metrics = {
  requests: 0,
  errors: 0,
  latency: 0,
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
}

export async function GET() {
  try {
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

    metrics = {
      requests: requests || 0,
      errors: errors || 0,
      latency: latency || 0,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }

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
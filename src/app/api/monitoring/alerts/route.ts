import { NextResponse } from "next/server"

interface Alert {
  type: string
  message: string
  severity: string
  timestamp: string
}

// In-memory storage for development
let alerts: Alert[] = []

export async function GET() {
  try {
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      alerts,
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

    const alert: Alert = {
      type,
      message,
      severity,
      timestamp: new Date().toISOString(),
    }

    alerts = [alert, ...alerts].slice(0, 100) // Keep only last 100 alerts

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
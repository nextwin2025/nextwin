import { NextResponse } from "next/server"

interface Alert {
  id: string
  type: "default" | "destructive"
  title: string
  description: string
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
    const { type, title, description } = body

    if (!type || !title || !description) {
      return NextResponse.json(
        {
          status: "error",
          error: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const alert: Alert = {
      id: Math.random().toString(36).substring(7),
      type: type === "error" ? "destructive" : "default",
      title,
      description,
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
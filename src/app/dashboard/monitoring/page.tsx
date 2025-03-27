"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Clock, Activity } from "lucide-react"

interface Metric {
  name: string
  value: number
  timestamp: string
}

interface Alert {
  id: string
  type: "error" | "warning" | "info"
  title: string
  description: string
  timestamp: string
}

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/monitoring/metrics")
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error("Error fetching metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchAlerts = async () => {
      try {
        const response = await fetch("/api/monitoring/alerts")
        const data = await response.json()
        setAlerts(data)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      }
    }

    fetchMetrics()
    fetchAlerts()

    // Set up polling
    const metricsInterval = setInterval(fetchMetrics, 60000) // Every minute
    const alertsInterval = setInterval(fetchAlerts, 30000) // Every 30 seconds

    return () => {
      clearInterval(metricsInterval)
      clearInterval(alertsInterval)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Monitoring Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <Activity className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{metrics.find(m => m.name === "activeUsers")?.value || 0}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Response Time</p>
              <p className="text-2xl font-bold">{metrics.find(m => m.name === "responseTime")?.value || 0}ms</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">{metrics.find(m => m.name === "successRate")?.value || 0}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Error Rate</p>
              <p className="text-2xl font-bold">{metrics.find(m => m.name === "errorRate")?.value || 0}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Response Time Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.filter(m => m.name === "responseTime")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" name="Response Time (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Alerts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={alert.type}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
} 
import * as Sentry from '@sentry/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { config } from "./config"
import type { ReactNode } from 'react'

// Initialize Sentry
if (config.monitoring.sentry.dsn) {
  Sentry.init({
    dsn: config.monitoring.sentry.dsn,
    environment: config.monitoring.sentry.environment,
    tracesSampleRate: config.monitoring.sentry.tracesSampleRate,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
  })
}

// Initialize LogRocket
if (config.monitoring.logrocket.appId) {
  import('logrocket').then((LogRocket) => {
    if (config.monitoring.logrocket.appId) {
      LogRocket.init(config.monitoring.logrocket.appId)
    }
  })
}

// Export monitoring components
export function MonitoringComponents(): ReactNode {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// Error tracking with context
export const trackError = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', error, context)
  
  if (config.monitoring.sentry.dsn) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setExtra(key, value)
        })
      }
      Sentry.captureException(error)
    })
  }
}

// Performance monitoring with async support
export const trackPerformance = async <T>(
  metric: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = performance.now()
  try {
    const result = await fn()
    const duration = performance.now() - start
    
    if (config.monitoring.sentry.dsn) {
      Sentry.addBreadcrumb({
        category: 'performance',
        message: metric,
        data: { duration },
      })
    }
    
    return result
  } catch (error) {
    const duration = performance.now() - start
    if (config.monitoring.sentry.dsn) {
      Sentry.addBreadcrumb({
        category: 'performance',
        message: `${metric}_error`,
        data: { duration, error },
      })
    }
    throw error
  }
}

// User tracking
export const trackUser = (userId: string, traits?: Record<string, any>) => {
  if (config.monitoring.sentry.dsn) {
    Sentry.setUser({
      id: userId,
      ...traits,
    })
  }
}

// Custom analytics tracking
export const trackEvent = (
  name: string,
  properties?: Record<string, any>
) => {
  if (config.isProduction) {
    Sentry.addBreadcrumb({
      category: "event",
      message: name,
      data: properties,
    })
    // LogRocket tracking is handled by the LogRocket component
  } else {
    console.log("Event:", name, properties)
  }
}

// Clear user context
export const clearUserContext = () => {
  Sentry.setUser(null)
}

// Custom error class for application errors
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message)
    this.name = "AppError"
    trackError(this)
  }
}

// API error handling
export function handleApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(error.message, "INTERNAL_ERROR")
  }

  return new AppError("An unexpected error occurred", "UNKNOWN_ERROR")
} 
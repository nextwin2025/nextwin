import * as Sentry from '@sentry/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import LogRocket from "logrocket"
import { config } from "./env"

// Initialize Sentry
Sentry.init({
  dsn: config.monitoring.sentry.dsn,
  environment: config.monitoring.sentry.environment,
  tracesSampleRate: config.monitoring.sentry.tracesSampleRate,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourdomain\.com/],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})

// Initialize LogRocket
if (config.isProduction) {
  LogRocket.init(config.monitoring.logrocket.appId)
}

// Custom error tracking
export const trackError = (error: Error, context?: Record<string, any>) => {
  if (config.isProduction) {
    Sentry.captureException(error, {
      extra: context,
    })
    LogRocket.captureException(error)
  } else {
    console.error("Error:", error, context)
  }
}

// Custom performance monitoring
export const trackPerformance = (
  name: string,
  operation: () => Promise<any>
) => {
  const transaction = Sentry.startTransaction({
    name,
  })

  return operation().finally(() => {
    transaction.finish()
  })
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
    LogRocket.track(name, properties)
  } else {
    console.log("Event:", name, properties)
  }
}

// User context tracking
export const setUserContext = (user: {
  id: string
  email: string
  name?: string
}) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
  })
}

// Clear user context
export const clearUserContext = () => {
  Sentry.setUser(null)
}

// Performance monitoring
export const trackPerformanceMetric = (metric: string, value: number) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    Analytics.track(metric, value)
    
    // Send to Sentry
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${metric}: ${value}ms`,
      level: 'info',
    })
  }
}

// User action tracking
export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    Analytics.track(action, properties)
  }
}

// Page view tracking
export const trackPageView = (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    Analytics.track('page_view', { url })
  }
}

// Custom performance mark
export const markPerformance = (name: string) => {
  if (process.env.NODE_ENV === 'production') {
    performance.mark(name)
  }
}

// Custom performance measure
export const measurePerformance = (name: string, startMark: string, endMark: string) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      performance.measure(name, startMark, endMark)
      const entries = performance.getEntriesByName(name)
      if (entries.length > 0) {
        trackPerformanceMetric(name, entries[0].duration)
      }
    } catch (error) {
      console.error('Performance measurement failed:', error)
    }
  }
}

// Export monitoring components
export { Analytics, SpeedInsights }

export default Sentry 

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
    trackError(this, { code, statusCode, context })
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
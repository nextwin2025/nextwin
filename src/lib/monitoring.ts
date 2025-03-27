import * as Sentry from '@sentry/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { config } from "./config"

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
    LogRocket.init(config.monitoring.logrocket.appId)
  })
}

// Export monitoring components
export const MonitoringComponents = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// Error tracking
export const trackError = (error: Error) => {
  console.error('Error:', error)
  
  if (config.monitoring.sentry.dsn) {
    Sentry.captureException(error)
  }
}

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (config.monitoring.sentry.dsn) {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: metric,
      data: { value },
    })
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
    LogRocket.track(name, properties)
  } else {
    console.log("Event:", name, properties)
  }
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
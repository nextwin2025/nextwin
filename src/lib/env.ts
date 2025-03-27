import { z } from "zod"

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  
  // Redis
  REDIS_URL: z.string().url(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  
  // Monitoring
  NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
  SENTRY_AUTH_TOKEN: z.string(),
  LOGROCKET_APP_ID: z.string(),
  
  // Payment Processing
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  
  // Rate Limiting
  RATE_LIMIT_MAX: z.string().transform(Number),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number),
})

export const env = envSchema.parse(process.env)

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>

// Environment-specific configuration
export const config = {
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
  isTest: env.NODE_ENV === "test",
  
  // API configuration
  api: {
    baseUrl: env.NEXT_PUBLIC_APP_URL,
    timeout: 10000,
    retries: 3,
  },
  
  // Cache configuration
  cache: {
    ttl: 300, // 5 minutes
    maxSize: 1000,
  },
  
  // Rate limiting
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
  },
  
  // Monitoring
  monitoring: {
    sentry: {
      dsn: env.NEXT_PUBLIC_SENTRY_DSN,
      environment: env.NODE_ENV,
      tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
    },
    logrocket: {
      appId: env.LOGROCKET_APP_ID,
    },
  },
  
  // Security
  security: {
    cors: {
      origin: env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    },
  },
} 
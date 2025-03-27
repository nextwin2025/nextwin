export const config = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    retries: 3,
  },
  cache: {
    ttl: 3600, // 1 hour
    maxSize: 1000,
  },
  rateLimit: {
    max: 100, // requests
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  monitoring: {
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    },
    logrocket: {
      appId: process.env.LOGROCKET_APP_ID,
    },
  },
  security: {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    bcryptSaltRounds: 10,
  },
} as const 
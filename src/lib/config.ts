export const config = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 5000,
    retries: 3,
  },
  cache: {
    ttl: 60 * 5, // 5 minutes
    maxSize: 100, // 100 items
  },
  rateLimit: {
    max: 100, // requests
    windowMs: 60 * 1000, // 1 minute
  },
  monitoring: {
    enabled: process.env.NODE_ENV === "production",
    sampleRate: 0.1, // 10% of requests
  },
  security: {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
  },
} 
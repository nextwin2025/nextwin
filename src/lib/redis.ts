import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Redis get error:", error)
    return null
  }
}

export const setCachedData = async <T>(
  key: string,
  data: T,
  expirationSeconds: number = 3600
): Promise<void> => {
  try {
    await redis.set(key, JSON.stringify(data), "EX", expirationSeconds)
  } catch (error) {
    console.error("Redis set error:", error)
  }
}

export const deleteCachedData = async (key: string): Promise<void> => {
  try {
    await redis.del(key)
  } catch (error) {
    console.error("Redis delete error:", error)
  }
}

export const clearCache = async (): Promise<void> => {
  try {
    await redis.flushall()
  } catch (error) {
    console.error("Redis clear error:", error)
  }
}

export default redis 
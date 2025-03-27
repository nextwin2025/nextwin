import { useState, useCallback } from "react"
import { getCachedData, setCachedData } from "@/lib/redis"
import { trackError, trackPerformance } from "@/lib/monitoring"
import { AppError } from "@/lib/errors"
import { config } from '@/lib/config'

interface UseApiOptions<T> {
  cacheKey?: string
  cacheDuration?: number
  onSuccess?: (data: T) => void
  onError?: (error: AppError) => void
  onLoading?: (loading: boolean) => void
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AppError | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(
    async (
      url: string,
      options: RequestInit = {},
      apiOptions: UseApiOptions<T> = {}
    ) => {
      const {
        cacheKey,
        cacheDuration = 3600,
        onSuccess,
        onError,
        onLoading,
      } = apiOptions

      setLoading(true)
      setError(null)

      try {
        // Check cache if cacheKey is provided
        if (cacheKey) {
          const cachedData = await getCachedData<T>(cacheKey)
          if (cachedData) {
            setData(cachedData)
            onSuccess?.(cachedData)
            setLoading(false)
            onLoading?.(false)
            return
          }
        }

        // Perform the API request with performance tracking
        const response = await trackPerformance("api_request", async () => {
          const result = await fetch(url, {
            ...options,
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
            },
          })

          if (!result.ok) {
            throw new AppError(
              result.status,
              result.statusText || "An error occurred"
            )
          }

          return result
        })

        const responseData = await response.json()

        // Cache the response if cacheKey is provided
        if (cacheKey) {
          await setCachedData(cacheKey, responseData, cacheDuration)
        }

        setData(responseData)
        onSuccess?.(responseData)
      } catch (err) {
        const appError = err instanceof AppError ? err : new AppError(500, "An unexpected error occurred")
        setError(appError)
        trackError(appError, { url, options })
        onError?.(appError)
      } finally {
        setLoading(false)
        onLoading?.(false)
      }
    },
    []
  )

  const mutate = useCallback(
    async (
      url: string,
      method: string,
      body: any,
      options: UseApiOptions<T> = {}
    ) => {
      const { cacheKey, onSuccess, onError } = options

      setLoading(true)
      setError(null)

      try {
        const response = await trackPerformance("api_mutation", async () =>
          fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new AppError(
            response.status,
            errorData.message || "An error occurred"
          )
        }

        const responseData = await response.json()

        // Invalidate cache if cacheKey is provided
        if (cacheKey) {
          await setCachedData(cacheKey, responseData)
        }

        setData(responseData)
        onSuccess?.(responseData)
      } catch (err) {
        const appError = err instanceof AppError ? err : new AppError(500, "An unexpected error occurred")
        setError(appError)
        trackError(appError, { url, method, body })
        onError?.(appError)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    data,
    error,
    loading,
    fetchData,
    mutate,
  }
} 
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground text-center max-w-md">
        We apologize for the inconvenience. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={reset}>Try again</Button>
      <Button variant="outline" onClick={() => window.location.href = "/"}>
        Go to homepage
      </Button>
    </div>
  )
} 
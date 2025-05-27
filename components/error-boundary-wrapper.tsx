"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleError } from "@/lib/error-utils"

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      try {
        // Try to rethrow Next.js internal errors
        handleError(event.error)
      } catch (e) {
        // If handleError doesn't rethrow, we handle it here
        console.error("Error caught by error boundary:", event.error)
        setError(event.error)
        setHasError(true)
      }
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return fallback || <DefaultErrorFallback error={error} reset={() => setHasError(false)} />
  }

  return <>{children}</>
}

interface ErrorFallbackProps {
  error: Error | null
  reset: () => void
}

export function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-6">
      <div className="glassmorphic-card max-w-md p-8">
        <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive mx-auto w-fit">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">Something went wrong</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          {error?.message || "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Page
          </Button>
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}

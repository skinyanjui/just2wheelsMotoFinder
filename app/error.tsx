"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="glassmorphic-card max-w-md p-8">
        <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive mx-auto w-fit">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">Something went wrong</h2>
        <p className="mb-6 text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="/">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </a>
          </Button>
        </div>
        {error.digest && <p className="mt-4 text-xs text-muted-foreground">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}

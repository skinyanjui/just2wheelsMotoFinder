"use client"

import type React from "react"

import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-destructive/10 p-2 text-destructive">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={resetErrorBoundary} size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    </div>
  )
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      {children}
    </ErrorBoundary>
  )
}

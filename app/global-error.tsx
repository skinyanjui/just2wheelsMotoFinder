"use client"

import { useEffect } from "react"
import { IBM_Plex_Sans } from "next/font/google"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} font-sans`}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 mx-auto w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold">Something went wrong!</h1>
            <p className="mb-6 text-gray-600">
              {error.message || "An unexpected error occurred. Please try again later."}
            </p>
            <button
              onClick={() => reset()}
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

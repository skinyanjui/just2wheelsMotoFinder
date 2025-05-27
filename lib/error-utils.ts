import { unstable_rethrow } from "next/navigation"

export function handleError(err: unknown) {
  // Rethrow Next.js internal errors
  unstable_rethrow(err)

  // Log other errors
  console.error("Application error:", err)

  // You can add custom error reporting here
  // reportErrorToService(err)
}

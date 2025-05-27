import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export default function Loading() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center">
      <div className="glassmorphic-card max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <LoadingSkeleton height="h-6" className="mb-2 mx-auto w-3/4" />
        <LoadingSkeleton height="h-4" className="mb-6 mx-auto w-1/2" />
        <LoadingSkeleton height="h-10" className="mx-auto w-full max-w-xs" />
      </div>
    </div>
  )
}

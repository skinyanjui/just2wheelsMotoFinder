import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  count?: number
  height?: string
  width?: string
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  animate?: boolean
}

export function LoadingSkeleton({
  className,
  count = 1,
  height = "h-4",
  width = "w-full",
  rounded = "md",
  animate = true,
}: LoadingSkeletonProps) {
  const roundedClass = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            className={cn(height, width, roundedClass[rounded], animate ? "animate-pulse" : "", className)}
          />
        ))}
    </>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glassmorphic-card p-6", className)}>
      <LoadingSkeleton height="h-6" className="mb-4" />
      <LoadingSkeleton count={3} height="h-4" className="mb-2" />
      <LoadingSkeleton width="w-2/3" height="h-4" className="mb-6" />
      <div className="flex justify-between">
        <LoadingSkeleton width="w-24" height="h-10" />
        <LoadingSkeleton width="w-24" height="h-10" />
      </div>
    </div>
  )
}

export function ListingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glassmorphic-card overflow-hidden", className)}>
      <LoadingSkeleton height="h-48" className="mb-4" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <LoadingSkeleton width="w-20" height="h-6" rounded="lg" />
          <LoadingSkeleton width="w-24" height="h-6" />
        </div>
        <LoadingSkeleton height="h-6" className="mb-2" />
        <LoadingSkeleton height="h-8" className="mb-4" />
        <LoadingSkeleton height="h-10" />
      </div>
    </div>
  )
}

export function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-4 mb-6">
        <LoadingSkeleton width="w-16" height="h-16" rounded="full" />
        <div className="flex-1">
          <LoadingSkeleton height="h-6" className="mb-2" />
          <LoadingSkeleton width="w-2/3" height="h-4" />
        </div>
      </div>
      <LoadingSkeleton count={4} height="h-4" className="mb-2" />
    </div>
  )
}

export function TableRowSkeleton({ columns = 4, className }: { columns?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 py-4", className)}>
      {Array(columns)
        .fill(0)
        .map((_, index) => (
          <LoadingSkeleton key={index} width={index === 0 ? "w-1/4" : "w-full"} height="h-6" />
        ))}
    </div>
  )
}

export function MessageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-2 mb-4", className)}>
      <LoadingSkeleton width="w-8" height="h-8" rounded="full" className="mt-1" />
      <div className="bg-muted rounded-lg p-3 max-w-[70%]">
        <LoadingSkeleton height="h-4" className="mb-1" />
        <LoadingSkeleton width="w-3/4" height="h-4" className="mb-1" />
        <LoadingSkeleton width="w-1/2" height="h-4" />
        <div className="flex justify-end mt-1">
          <LoadingSkeleton width="w-16" height="h-3" />
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react"
import type { Metadata } from "next"
import ListingsClient from "./listings-client"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Listings | Just2Wheels",
  description: "Browse motorcycles, parts, gear, and more on Just2Wheels.",
}

export default function ListingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : ""
  const category = typeof searchParams.category === "string" ? searchParams.category : ""
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest"
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : undefined
  const condition = typeof searchParams.condition === "string" ? searchParams.condition : ""
  const location = typeof searchParams.location === "string" ? searchParams.location : ""

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Browse Listings</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <Skeleton className="h-[600px] w-full rounded-lg" />
            </div>
            <div className="md:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-10 w-40 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ListingsClient
          initialQuery={q}
          initialCategory={category}
          initialSort={sort}
          initialMinPrice={minPrice}
          initialMaxPrice={maxPrice}
          initialCondition={condition}
          initialLocation={location}
        />
      </Suspense>
    </div>
  )
}

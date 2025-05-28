"use client"

import { useState, useEffect } from "react"
import ListingCard from "@/components/ui/listing-card"
import { Skeleton } from "@/components/ui/skeleton"
import { mockListings } from "@/lib/mock-data/listings"

export function FeaturedListings() {
  const [isLoading, setIsLoading] = useState(true)
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      // Filter featured listings
      const featuredListings = mockListings.filter((listing) => listing.isFeatured).slice(0, 10)
      setListings(featuredListings)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedListings

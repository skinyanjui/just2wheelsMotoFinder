"use client"

import { useState, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import ListingCard from "@/components/listing-card"
import { mockListings } from "@/lib/mock-data/listings"
import { ListingSkeleton } from "@/components/ui/loading-skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function FeaturedListings() {
  const [listings, setListings] = useState(mockListings.filter((listing) => listing.isFeatured))
  const [isLoading, setIsLoading] = useState(true)
  const [savedListings, setSavedListings] = useState<string[]>([])
  const { toast } = useToast()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Load saved listings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedListings")
    if (saved) {
      setSavedListings(JSON.parse(saved))
    }
  }, [])

  const handleSave = useCallback(
    (id: string) => {
      setSavedListings((prev) => {
        const newSaved = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]

        // Save to localStorage
        localStorage.setItem("savedListings", JSON.stringify(newSaved))

        // Show toast
        toast({
          title: prev.includes(id) ? "Removed from favorites" : "Added to favorites",
          description: prev.includes(id)
            ? "The listing has been removed from your favorites."
            : "The listing has been added to your favorites.",
          duration: 3000,
        })

        return newSaved
      })
    },
    [toast],
  )

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <ListingSkeleton key={i} />
          ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="glassmorphic-card p-8 text-center">
        <h3 className="text-xl font-semibold">No featured listings available</h3>
        <p className="mt-2 text-muted-foreground">Check back later for new featured listings.</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onSave={handleSave}
          isSaved={savedListings.includes(listing.id)}
        />
      ))}
    </div>
  )
}

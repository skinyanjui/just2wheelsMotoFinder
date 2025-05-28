"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: string
  condition: string
  imageUrl: string
  isFeatured: boolean
  createdAt: string
}

interface SimilarListingsProps {
  category: string
  currentListingId: string
}

export function SimilarListings({ category, currentListingId }: SimilarListingsProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    // In a real app, this would be an API call to fetch similar listings
    const fetchSimilarListings = async () => {
      try {
        // Mock data for similar listings
        const mockListings: Listing[] = [
          {
            id: "2",
            title: "2021 Kawasaki Ninja ZX-10R",
            price: 15999,
            location: "Portland, OR",
            category: "motorcycles",
            condition: "Used",
            imageUrl: "/kawasaki-ninja-side.png",
            isFeatured: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "2023 Yamaha YZF-R6",
            price: 12499,
            location: "San Francisco, CA",
            category: "motorcycles",
            condition: "New",
            imageUrl: "/yamaha-r6.png",
            isFeatured: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: "4",
            title: "2022 Honda CBR600RR",
            price: 11799,
            location: "Los Angeles, CA",
            category: "motorcycles",
            condition: "Used",
            imageUrl: "/placeholder-l7uiy.png",
            isFeatured: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "5",
            title: "2023 Zero SR/F Electric",
            price: 19995,
            location: "Seattle, WA",
            category: "electric",
            condition: "New",
            imageUrl: "/placeholder.svg?height=300&width=400&query=electric motorcycle",
            isFeatured: true,
            createdAt: new Date().toISOString(),
          },
        ].filter((listing) => listing.id !== currentListingId)

        setListings(mockListings)
      } catch (error) {
        console.error("Error fetching similar listings:", error)
      }
    }

    fetchSimilarListings()
  }, [category, currentListingId])

  const toggleFavorite = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
        toast({
          title: "Removed from favorites",
          description: "Listing has been removed from your favorites",
        })
      } else {
        newFavorites.add(id)
        toast({
          title: "Added to favorites",
          description: "Listing has been added to your favorites",
        })
      }
      return newFavorites
    })
  }

  if (listings.length === 0) {
    return <p className="text-muted-foreground">No similar listings found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing) => (
        <Card
          key={listing.id}
          className="glassmorphic-card overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="relative">
            <Link href={`/listings/${listing.id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.imageUrl || "/placeholder.svg"}
                  alt={listing.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => toggleFavorite(listing.id)}
            >
              <Heart className={`h-5 w-5 ${favorites.has(listing.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to favorites</span>
            </Button>
            {listing.isFeatured && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                Featured
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline">{listing.condition}</Badge>
              <span className="text-sm text-muted-foreground">{listing.location}</span>
            </div>
            <Link href={`/listings/${listing.id}`} className="group">
              <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">{listing.title}</h3>
            </Link>
            <p className="mt-1 text-xl font-bold">${listing.price.toLocaleString()}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
              <Link href={`/listings/${listing.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

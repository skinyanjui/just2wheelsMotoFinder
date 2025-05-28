"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock featured listings data
const mockFeaturedListings = [
  {
    id: "1",
    title: "2023 Kawasaki Ninja ZX-10R",
    price: 16999,
    location: "Los Angeles, CA",
    category: "motorcycles",
    condition: "New",
    imageUrl: "/kawasaki-ninja-motorcycle.png",
    isFeatured: true,
    createdAt: "2023-05-01T12:00:00Z",
    year: 2023,
    mileage: 0,
    engineSize: 998,
  },
  {
    id: "2",
    title: "2022 Harley-Davidson Street Glide",
    price: 24999,
    location: "Phoenix, AZ",
    category: "motorcycles",
    condition: "Used",
    imageUrl: "/classic-harley.png",
    isFeatured: true,
    createdAt: "2023-05-02T14:30:00Z",
    year: 2022,
    mileage: 3500,
    engineSize: 1868,
  },
  {
    id: "3",
    title: "2023 Zero SR/F Premium",
    price: 23495,
    location: "San Francisco, CA",
    category: "electric",
    condition: "New",
    imageUrl: "/placeholder.svg?height=600&width=800&query=zero electric motorcycle",
    isFeatured: true,
    createdAt: "2023-05-03T09:15:00Z",
    year: 2023,
    mileage: 0,
    engineSize: 0,
  },
  {
    id: "4",
    title: "AGV Pista GP RR Helmet",
    price: 1399,
    location: "Miami, FL",
    category: "gear",
    condition: "New",
    imageUrl: "/motorcycle-helmet.png",
    isFeatured: true,
    createdAt: "2023-05-04T16:20:00Z",
  },
  {
    id: "5",
    title: "2022 Ducati Panigale V4",
    price: 27995,
    location: "Chicago, IL",
    category: "motorcycles",
    condition: "New",
    imageUrl: "/ducati-panigale.png",
    isFeatured: true,
    createdAt: "2023-05-05T10:00:00Z",
    year: 2022,
    mileage: 1200,
    engineSize: 1103,
  },
]

export default function FeaturedListings() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {mockFeaturedListings.map((listing) => (
        <Card
          key={listing.id}
          className="glassmorphic-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
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
              onClick={(e) => toggleFavorite(listing.id, e)}
            >
              <Heart className={cn("h-5 w-5", favorites.has(listing.id) ? "fill-red-500 text-red-500" : "")} />
              <span className="sr-only">Add to favorites</span>
            </Button>
            {listing.isFeatured && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                Featured
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            <div className="mb-1 flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {listing.condition}
              </Badge>
              <span className="text-xs text-muted-foreground">{listing.location}</span>
            </div>
            <Link href={`/listings/${listing.id}`} className="group">
              <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary">{listing.title}</h3>
            </Link>
            <p className="mt-1 text-lg font-bold">${listing.price.toLocaleString()}</p>

            {/* Additional details for motorcycles */}
            {(listing.category === "motorcycles" || listing.category === "electric") && listing.year && (
              <div className="mt-1 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Year:</span> {listing.year}
                </div>
                {listing.mileage !== undefined && (
                  <div>
                    <span className="font-medium">Mileage:</span> {listing.mileage.toLocaleString()} mi
                  </div>
                )}
                {listing.category === "electric" ? (
                  <div className="col-span-2">
                    <span className="font-medium">Type:</span> Electric
                  </div>
                ) : listing.engineSize ? (
                  <div className="col-span-2">
                    <span className="font-medium">Engine:</span> {listing.engineSize} cc
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

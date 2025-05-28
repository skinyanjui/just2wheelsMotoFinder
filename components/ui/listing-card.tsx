"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ListingCardProps {
  listing: {
    id: string
    title: string
    price: number
    location: string
    category: string
    condition: string
    imageUrl: string
    isFeatured?: boolean
    createdAt: string
    year?: number
    mileage?: number
    engineSize?: string
  }
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
  }

  return (
    <Link href={`/listings/${listing.id}`} className="block group">
      <Card className="glassmorphic-card h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={imageError ? "/placeholder.svg?height=400&width=600" : listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
          {listing.isFeatured && (
            <Badge className="absolute left-2 top-2 bg-primary/90 backdrop-blur-sm">Featured</Badge>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-all hover:bg-background/90"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn("h-4 w-4 transition-colors", isFavorited ? "fill-red-500 text-red-500" : "text-foreground")}
            />
          </button>
        </div>
        <CardContent className="p-3">
          <h3 className="mb-1 line-clamp-1 text-base font-semibold">{listing.title}</h3>
          <p className="mb-2 text-lg font-bold text-primary">${listing.price.toLocaleString()}</p>

          {/* Additional details for motorcycles */}
          {listing.category === "motorcycles" && (
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              {listing.year && (
                <Badge variant="outline" className="font-normal">
                  {listing.year}
                </Badge>
              )}
              {listing.mileage && (
                <Badge variant="outline" className="font-normal">
                  {listing.mileage.toLocaleString()} mi
                </Badge>
              )}
              {listing.engineSize && (
                <Badge variant="outline" className="font-normal">
                  {listing.engineSize}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{listing.location}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {listing.condition}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

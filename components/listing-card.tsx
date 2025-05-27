"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Listing } from "@/lib/mock-data/listings"

interface ListingCardProps {
  listing: Listing
  onSave?: (id: string) => void
  isSaved?: boolean
  className?: string
}

export default function ListingCard({ listing, onSave, isSaved = false, className = "" }: ListingCardProps) {
  const { id, title, price, location, images, year, condition, isFeatured, isSold } = listing

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onSave) {
      onSave(id)
    }
  }

  return (
    <Card className={`glassmorphic-card overflow-hidden transition-all hover:shadow-lg ${className}`}>
      <Link href={`/listings/${id}`} className="block h-full">
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={images[0] || "/placeholder.svg?height=300&width=500&query=motorcycle"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm ${
              isSaved ? "text-red-500" : "text-gray-600"
            }`}
            onClick={handleSave}
            aria-label={isSaved ? "Remove from saved" : "Save listing"}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          {isFeatured && <Badge className="absolute left-2 top-2 bg-primary text-white">Featured</Badge>}
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge className="text-lg font-bold uppercase">Sold</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
            <p className="whitespace-nowrap text-lg font-bold text-primary">${price.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>{location}</p>
            <p>
              {year} • {condition}
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 pt-3">
          <Button variant="outline" className="w-full" disabled={isSold}>
            {isSold ? "Sold" : "View Details"}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

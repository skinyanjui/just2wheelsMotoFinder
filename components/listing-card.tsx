"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Listing } from "@/lib/mock-data/listings"

interface ListingCardProps {
  listing: Listing
  className?: string
  onSave?: (id: string) => void
  isSaved?: boolean
}

export default function ListingCard({ listing, className, onSave, isSaved = false }: ListingCardProps) {
  const { id, title, price, location, images, condition, year, make, model, isFeatured, isSold } = listing

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onSave) {
      onSave(id)
    }
  }

  return (
    <Card className={cn("glassmorphic-card overflow-hidden transition-all hover:shadow-md", className)}>
      <Link href={`/listings/${id}`} className="group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg?height=300&width=500&query=motorcycle"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge className="bg-destructive px-3 py-1 text-lg font-semibold">Sold</Badge>
            </div>
          )}
          {isFeatured && !isSold && <Badge className="absolute left-2 top-2 bg-primary">Featured</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleSave}
            aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isSaved ? "fill-destructive text-destructive" : "text-muted-foreground")} />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="font-normal">
              {condition}
            </Badge>
            <span className="text-lg font-bold text-primary">${price.toLocaleString()}</span>
          </div>
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{title}</h3>
          <p className="mb-2 line-clamp-1 text-sm text-muted-foreground">
            {year} {make} {model}
          </p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between border-t p-4">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/listings/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

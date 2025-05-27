"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle, ExternalLink } from "lucide-react"; // Changed Heart to XCircle for remove

// Define the expected shape of a listing prop
// This can be based on the Listing interface in featured-listings.tsx
interface FavoriteListing {
  id: string;
  title: string;
  price: number;
  location?: string; // Make optional if not always present
  category?: string; // Make optional
  condition?: string; // Make optional
  imageUrl: string;
  // Add any other relevant fields, e.g., dateFavorited
  dateFavorited?: string; 
}

interface FavoriteListingCardProps {
  listing: FavoriteListing;
  onRemoveFavorite: (id: string) => void;
}

export default function FavoriteListingCard({ listing, onRemoveFavorite }: FavoriteListingCardProps) {
  const { id, title, price, location, category, condition, imageUrl, dateFavorited } = listing;

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <Link href={`/listings/${id}`} className="group">
          <div className="aspect-[16/10] overflow-hidden"> {/* Adjusted aspect ratio slightly */}
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="destructive" // More explicit for a remove action
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-destructive-foreground hover:bg-destructive/90"
          onClick={() => onRemoveFavorite(id)}
          title="Remove from favorites"
        >
          <XCircle className="h-5 w-5" />
          <span className="sr-only">Remove from favorites</span>
        </Button>
        {/* Optional: Display category or condition as badges if desired */}
        {category && (
            <Badge className="absolute left-2 top-2" variant="secondary">
                {category}
            </Badge>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link href={`/listings/${id}`} className="group mb-1.5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug group-hover:text-primary" title={title}>
            {title}
          </h3>
        </Link>
        {condition && <Badge variant="outline" className="mb-1.5 w-fit">{condition}</Badge>}
        <p className="mb-2 text-xl font-bold text-primary">
          ${price.toLocaleString()}
        </p>
        {location && <p className="text-sm text-muted-foreground mb-1">{location}</p>}
        {dateFavorited && <p className="text-xs text-muted-foreground">Favorited on: {new Date(dateFavorited).toLocaleDateString()}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full">
          <Link href={`/listings/${id}`}>
            <ExternalLink className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

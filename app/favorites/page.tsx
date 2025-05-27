"use client";

import { useState, useEffect } from "react"; // For managing favorites list
import FavoriteListingCard from "@/components/favorite-listing-card";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, HeartOff } from "lucide-react"; // Icons for empty state or info

// Define the type for a favorited listing, matching FavoriteListingCard's props
interface FavoriteListingItem {
  id: string;
  title: string;
  price: number;
  location?: string;
  category?: string;
  condition?: string;
  imageUrl: string;
  dateFavorited?: string;
}

// Mock data for user's favorite listings
const initialMockFavorites: FavoriteListingItem[] = [
  {
    id: "1", // Should match an actual listing ID if linking
    title: "2022 Kawasaki Ninja ZX-6R - Favorited!",
    price: 11999,
    location: "Seattle, WA",
    category: "Sport Bikes",
    condition: "New",
    imageUrl: "/kawasaki-ninja-motorcycle.png", // Ensure this image exists
    dateFavorited: "2024-03-15",
  },
  {
    id: "3",
    title: "Shoei RF-1400 Helmet - Size M - Saved Item",
    price: 499,
    location: "San Francisco, CA",
    category: "Gear",
    condition: "New",
    imageUrl: "/motorcycle-helmet.png", // Ensure this image exists
    dateFavorited: "2024-03-10",
  },
  {
    id: "l7uiyphdfsd", // Example of a placeholder ID
    title: "Vintage Cafe Racer - Project Bike",
    price: 2500,
    location: "Austin, TX",
    category: "Vintage",
    condition: "Used - Project",
    imageUrl: "/placeholder-l7uiy.png", // Using an existing placeholder
    dateFavorited: "2024-03-01",
  },
];

export default function FavoritesPage() {
  const { toast } = useToast();
  const [favoriteItems, setFavoriteItems] = useState<FavoriteListingItem[]>(initialMockFavorites);

  const handleRemoveFavorite = (id: string) => {
    setFavoriteItems((prevItems) => prevItems.filter(item => item.id !== id));
    toast({
      title: "Removed from Favorites",
      description: `Listing ID: ${id} has been removed.`,
      // icon: <HeartOff className="h-5 w-5 text-destructive" />, // Optional: custom icon for toast
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Favorite Listings</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Here are the listings you've saved. You can view details or remove them from this list.
        </p>
      </div>

      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((listing) => (
            <FavoriteListingCard
              key={listing.id}
              listing={listing}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <HeartOff className="mx-auto h-16 w-16 mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
          <p className="text-lg">
            You haven't added any listings to your favorites. Start browsing and save items you like!
          </p>
          {/* Optional: Add a button to browse listings */}
          {/* 
          <Button asChild className="mt-6">
            <Link href="/listings">Browse Listings</Link>
          </Button> 
          */}
        </div>
      )}
    </div>
  );
}

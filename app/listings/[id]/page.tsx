"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  Heart,
  Share2,
  Flag,
  MessageSquare,
  Calendar,
  MapPin,
  Tag,
  Info,
  Shield,
  ChevronLeft,
  ChevronRight,
  Bike,
  Gauge,
  Fuel,
  Clock,
  Wrench,
  User,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContactSellerForm } from "@/components/contact-seller-form"
import { SimilarListings } from "@/components/similar-listings"

interface Listing {
  id: string
  title: string
  price: number
  description: string
  features: string[]
  specifications: Record<string, string>
  location: string
  category: string
  condition: string
  images: string[]
  isFeatured: boolean
  createdAt: string
  seller: {
    id: string
    name: string
    image: string
    joinedDate: string
    listingsCount: number
    responseRate: number
  }
}

export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the listing details
    const fetchListing = async () => {
      setIsLoading(true)
      try {
        // Mock data for the listing
        const mockListing: Listing = {
          id: params.id as string,
          title: "2022 Kawasaki Ninja ZX-6R KRT Edition",
          price: 11999,
          description:
            "Selling my 2022 Kawasaki Ninja ZX-6R KRT Edition with only 1,200 miles. This bike is in perfect condition and has been meticulously maintained. It comes with a few upgrades including an Akrapovič exhaust, frame sliders, and a fender eliminator kit. The bike has never been dropped or raced, only used for weekend rides. All maintenance is up to date, and it comes with the remainder of the factory warranty until June 2024. Serious inquiries only, no trades.",
          features: [
            "Akrapovič exhaust system",
            "Frame sliders",
            "Fender eliminator kit",
            "LED turn signals",
            "Smoked windscreen",
            "Tank pad",
            "Remaining factory warranty",
          ],
          specifications: {
            "Engine Type": "4-stroke, 4-cylinder, DOHC, 16-valve",
            "Engine Displacement": "636cc",
            "Maximum Power": "127.4 HP @ 13,500 rpm",
            "Maximum Torque": "70.8 Nm @ 11,000 rpm",
            "Fuel System": "DFI® with 38mm Keihin throttle bodies (4)",
            Transmission: "6-speed, return shift",
            "Final Drive": "Sealed chain",
            "Front Suspension":
              "41mm inverted Showa SFF-BP fork with spring preload, stepless compression and rebound damping adjustments",
            "Rear Suspension":
              "Uni-Trak® with adjustable spring preload, stepless compression and rebound damping adjustments",
            "Front Brake": "Dual 310mm discs with 4-piston monobloc calipers, ABS",
            "Rear Brake": "Single 220mm disc with single-piston caliper, ABS",
            "Front Tire": "120/70 ZR17",
            "Rear Tire": "180/55 ZR17",
            "Seat Height": "830mm (32.7 in)",
            "Curb Weight": "196kg (432 lbs)",
            "Fuel Capacity": "17 liters (4.5 gal)",
            Color: "KRT Edition (Green/Black)",
          },
          location: "Seattle, WA",
          category: "motorcycles",
          condition: "Like New",
          images: [
            "/kawasaki-ninja-motorcycle.png",
            "/kawasaki-ninja-side.png",
            "/kawasaki-ninja-front.png",
            "/kawasaki-ninja-rear.png",
            "/kawasaki-ninja-dashboard.png",
          ],
          isFeatured: true,
          createdAt: "2023-05-15T14:30:00Z",
          seller: {
            id: "seller-1",
            name: "Michael Thompson",
            image: "/man-with-helmet.png",
            joinedDate: "2021-03-10T00:00:00Z",
            listingsCount: 7,
            responseRate: 98,
          },
        }

        setListing(mockListing)
      } catch (error) {
        console.error("Error fetching listing:", error)
        toast({
          title: "Error",
          description: "Failed to load listing details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [params.id, toast])

  const handlePrevImage = () => {
    if (!listing) return
    setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!listing) return
    setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1))
  }

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "Listing has been removed from your favorites"
        : "Listing has been added to your favorites",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Listing URL has been copied to your clipboard",
    })
  }

  const handleReport = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to report listings",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Report submitted",
      description: "Thank you for your report. We will review this listing.",
    })
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg">Loading listing details...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container py-12">
        <div className="glassmorphic-card mx-auto max-w-md p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">Listing Not Found</h1>
          <p className="mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/listings">Browse Listings</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(listing.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to listings
        </Button>
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {listing.condition}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {listing.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            Listed on {formattedDate}
          </div>
          {listing.isFeatured && (
            <Badge variant="secondary" className="text-sm">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={listing.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
              <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                {currentImageIndex + 1} / {listing.images.length}
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square h-20 overflow-hidden rounded-md border-2 transition ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${listing.title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Listing Details */}
          <div className="mb-8">
            <Tabs defaultValue="description">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="glassmorphic-card p-6">
                <div className="mb-6">
                  <h2 className="mb-4 text-xl font-semibold">Description</h2>
                  <p className="whitespace-pre-line text-base leading-relaxed">{listing.description}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Features</h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1 text-primary">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="glassmorphic-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bike className="h-5 w-5 text-primary" />
                      <span className="font-medium">Engine & Performance</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine Type</span>
                        <span>{listing.specifications["Engine Type"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Displacement</span>
                        <span>{listing.specifications["Engine Displacement"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maximum Power</span>
                        <span>{listing.specifications["Maximum Power"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maximum Torque</span>
                        <span>{listing.specifications["Maximum Torque"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel System</span>
                        <span>{listing.specifications["Fuel System"]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span className="font-medium">Transmission</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transmission</span>
                        <span>{listing.specifications["Transmission"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Final Drive</span>
                        <span>{listing.specifications["Final Drive"]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      <span className="font-medium">Suspension & Brakes</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Front Suspension</span>
                        <span>{listing.specifications["Front Suspension"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rear Suspension</span>
                        <span>{listing.specifications["Rear Suspension"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Front Brake</span>
                        <span>{listing.specifications["Front Brake"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rear Brake</span>
                        <span>{listing.specifications["Rear Brake"]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">Dimensions</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seat Height</span>
                        <span>{listing.specifications["Seat Height"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Curb Weight</span>
                        <span>{listing.specifications["Curb Weight"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Capacity</span>
                        <span>{listing.specifications["Fuel Capacity"]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Fuel className="h-5 w-5 text-primary" />
                      <span className="font-medium">Tires</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Front Tire</span>
                        <span>{listing.specifications["Front Tire"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rear Tire</span>
                        <span>{listing.specifications["Rear Tire"]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">Other</span>
                    </div>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span>{listing.specifications["Color"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seller" className="glassmorphic-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Seller Information</h2>
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={listing.seller.image || "/placeholder.svg"} alt={listing.seller.name} />
                    <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{listing.seller.name}</h3>
                    <div className="mt-1 space-y-1 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        Member since{" "}
                        {new Date(listing.seller.joinedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Tag className="mr-2 h-4 w-4" />
                        {listing.seller.listingsCount} active listings
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {listing.seller.responseRate}% response rate
                      </div>
                    </div>
                    <Button className="mt-4" onClick={() => setShowContactForm(true)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Safety Tips */}
          <div className="mb-8 glassmorphic-card p-6">
            <div className="flex items-start">
              <Shield className="mr-3 h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Safety Tips</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Meet in a safe, public place for viewing and transactions</li>
                  <li>• Inspect the motorcycle and documentation thoroughly before purchase</li>
                  <li>• Verify the VIN and title match and check for liens</li>
                  <li>• Consider bringing a mechanic for a pre-purchase inspection</li>
                  <li>• Use secure payment methods and avoid cash for large transactions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Similar Listings */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Similar Listings</h2>
            <SimilarListings category={listing.category} currentListingId={listing.id} />
          </div>
        </div>

        <div>
          <div className="sticky top-24 space-y-6">
            {/* Price and Actions */}
            <Card className="glassmorphic-card overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-3xl font-bold">${listing.price.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => setShowContactForm(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Seller
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={toggleFavorite}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                      {isFavorite ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  <Button variant="ghost" className="w-full text-muted-foreground" onClick={handleReport}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report Listing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="glassmorphic-card">
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-medium">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium">{listing.condition}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{listing.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">
                      {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Seller Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
            <DialogDescription>
              Send a message to {listing.seller.name} about {listing.title}
            </DialogDescription>
          </DialogHeader>
          <ContactSellerForm
            listingId={listing.id}
            listingTitle={listing.title}
            sellerId={listing.seller.id}
            sellerName={listing.seller.name}
            onSuccess={() => setShowContactForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { ImagePlus, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreateListingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPaymentAlert, setShowPaymentAlert] = useState(false)

  if (!user) {
    return (
      <div className="container py-12">
        <Card className="glassmorphic-card mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You need to be logged in to create a listing.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/auth/login?redirect=/listings/create")} className="w-full">
              Log In
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just add a placeholder image
    if (images.length < 10) {
      setImages([...images, `/placeholder.svg?height=600&width=800&query=motorcycle ${images.length + 1}`])
    } else {
      toast({
        title: "Maximum images reached",
        description: "You can upload a maximum of 10 images per listing.",
        variant: "destructive",
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !description || !category || !condition || !price || !location || images.length === 0) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields and add at least one image.",
        variant: "destructive",
      })
      return
    }

    setShowPaymentAlert(true)
  }

  const handlePayment = () => {
    setIsSubmitting(true)

    // In a real app, this would process the payment and create the listing
    setTimeout(() => {
      toast({
        title: "Listing created successfully",
        description: "Your listing has been published and is now visible to buyers.",
      })
      router.push("/listings")
    }, 2000)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a Listing</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your listing. It costs $25 to post a listing.
        </p>
      </div>

      {showPaymentAlert ? (
        <Card className="glassmorphic-card mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Complete Your Listing</CardTitle>
            <CardDescription>
              Your listing is ready to be published. A $25 fee is required to post your listing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Required</AlertTitle>
              <AlertDescription>
                Your credit card will be charged $25 for this listing. This is a one-time fee and your listing will
                remain active for 30 days.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowPaymentAlert(false)}>
              Back to Editing
            </Button>
            <Button onClick={handlePayment} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay $25 & Publish"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>Listing Details</CardTitle>
                  <CardDescription>Provide detailed information about what you're selling.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 2022 Kawasaki Ninja ZX-6R"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail. Include specifications, condition, history, modifications, etc."
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="motorcycles">Motorcycles</SelectItem>
                          <SelectItem value="parts">Parts & Accessories</SelectItem>
                          <SelectItem value="gear">Riding Gear</SelectItem>
                          <SelectItem value="tools">Tools & Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={condition} onValueChange={setCondition} required>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>Pricing & Location</CardTitle>
                  <CardDescription>Set your price and specify your location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>
                    Add up to 10 images of your item. The first image will be the main image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md border bg-muted">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Listing image ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}

                    {images.length < 10 && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="flex aspect-square items-center justify-center rounded-md border border-dashed bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <ImagePlus className="h-8 w-8" />
                          <span className="text-xs">Add Image</span>
                        </div>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/listings")}>
                  Cancel
                </Button>
                <Button type="submit">Continue to Payment</Button>
              </div>
            </form>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <Card className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>Listing Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    There is a $25 fee to post a listing on Just2Wheels. This fee helps us maintain a high-quality
                    marketplace and provide the best service to our users.
                  </p>
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center justify-between font-medium">
                      <span>Listing Fee</span>
                      <span>$25.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>Listing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>Be honest about the condition of your item</li>
                    <li>Include detailed specifications</li>
                    <li>Mention any modifications or upgrades</li>
                    <li>Add clear, well-lit photos from multiple angles</li>
                    <li>Set a fair price based on market value</li>
                    <li>Respond promptly to inquiries</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

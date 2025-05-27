"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  ImagePlus,
  X,
  AlertCircle,
  Bike,
  Gauge,
  Wrench,
  Shield,
  Tag,
  MapPin,
  DollarSign,
  Info,
  Plus,
  Trash2,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Define types to match the details page
interface SpecificationField {
  key: string
  label: string
  value: string
  category: "engine" | "transmission" | "suspension" | "dimensions" | "tires" | "other"
}

interface Feature {
  id: string
  text: string
}

export default function CreateListingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Basic listing information
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([])

  // Additional fields to match details page
  const [features, setFeatures] = useState<Feature[]>([{ id: "1", text: "" }])
  const [specifications, setSpecifications] = useState<SpecificationField[]>([
    // Engine & Performance
    { key: "engineType", label: "Engine Type", value: "", category: "engine" },
    { key: "displacement", label: "Engine Displacement", value: "", category: "engine" },
    { key: "maxPower", label: "Maximum Power", value: "", category: "engine" },
    { key: "maxTorque", label: "Maximum Torque", value: "", category: "engine" },
    { key: "fuelSystem", label: "Fuel System", value: "", category: "engine" },

    // Transmission
    { key: "transmission", label: "Transmission", value: "", category: "transmission" },
    { key: "finalDrive", label: "Final Drive", value: "", category: "transmission" },

    // Suspension & Brakes
    { key: "frontSuspension", label: "Front Suspension", value: "", category: "suspension" },
    { key: "rearSuspension", label: "Rear Suspension", value: "", category: "suspension" },
    { key: "frontBrake", label: "Front Brake", value: "", category: "suspension" },
    { key: "rearBrake", label: "Rear Brake", value: "", category: "suspension" },

    // Dimensions
    { key: "seatHeight", label: "Seat Height", value: "", category: "dimensions" },
    { key: "weight", label: "Curb Weight", value: "", category: "dimensions" },
    { key: "fuelCapacity", label: "Fuel Capacity", value: "", category: "dimensions" },

    // Tires
    { key: "frontTire", label: "Front Tire", value: "", category: "tires" },
    { key: "rearTire", label: "Rear Tire", value: "", category: "tires" },

    // Other
    { key: "color", label: "Color", value: "", category: "other" },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPaymentAlert, setShowPaymentAlert] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    // Check if user is logged in
    if (!user && typeof window !== "undefined") {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to create a listing",
        variant: "destructive",
      })
    }
  }, [user, toast])

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

  const addFeature = () => {
    setFeatures([...features, { id: Date.now().toString(), text: "" }])
  }

  const updateFeature = (id: string, text: string) => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, text } : feature)))
  }

  const removeFeature = (id: string) => {
    if (features.length > 1) {
      setFeatures(features.filter((feature) => feature.id !== id))
    } else {
      toast({
        title: "Cannot remove",
        description: "You must have at least one feature",
        variant: "destructive",
      })
    }
  }

  const updateSpecification = (key: string, value: string) => {
    setSpecifications(specifications.map((spec) => (spec.key === key ? { ...spec, value } : spec)))
  }

  const validateForm = () => {
    // Basic validation
    if (!title || !description || !category || !condition || !price || !location || images.length === 0) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields and add at least one image.",
        variant: "destructive",
      })
      return false
    }

    // Validate features
    const validFeatures = features.filter((f) => f.text.trim() !== "")
    if (validFeatures.length === 0) {
      toast({
        title: "Features required",
        description: "Please add at least one feature for your listing.",
        variant: "destructive",
      })
      setActiveTab("features")
      return false
    }

    // Validate specifications (at least engine type and displacement for motorcycles)
    if (category === "motorcycles") {
      const engineType = specifications.find((s) => s.key === "engineType")?.value
      const displacement = specifications.find((s) => s.key === "displacement")?.value

      if (!engineType || !displacement) {
        toast({
          title: "Specifications required",
          description: "Please provide at least the engine type and displacement for motorcycle listings.",
          variant: "destructive",
        })
        setActiveTab("specifications")
        return false
      }
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
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
    <ErrorBoundary>
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

              {/* Preview summary */}
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Listing Summary</h3>
                <div className="rounded-md bg-muted p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Title:</span>
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-sm font-medium">${Number.parseFloat(price).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Images:</span>
                    <span className="text-sm font-medium">{images.length}</span>
                  </div>
                </div>
              </div>
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-8">
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

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="price"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="pl-9"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="location"
                              placeholder="City, State"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="pl-9"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => setActiveTab("features")}>Continue to Features</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-8">
                  <Card className="glassmorphic-card">
                    <CardHeader>
                      <CardTitle>Features</CardTitle>
                      <CardDescription>Add key features and selling points of your item.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {features.map((feature, index) => (
                          <div key={feature.id} className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <Input
                                placeholder={`Feature ${index + 1}, e.g., "Akrapovič exhaust system"`}
                                value={feature.text}
                                onChange={(e) => updateFeature(feature.id, e.target.value)}
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFeature(feature.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove feature</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addFeature}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Feature
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("basic")}>
                        Back to Basic Info
                      </Button>
                      <Button onClick={() => setActiveTab("specifications")}>Continue to Specifications</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="specifications" className="space-y-8">
                  <Card className="glassmorphic-card">
                    <CardHeader>
                      <CardTitle>Specifications</CardTitle>
                      <CardDescription>
                        Add detailed specifications for your item. These help buyers make informed decisions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Engine & Performance */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Bike className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Engine & Performance</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "engine")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Transmission */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Gauge className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Transmission</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "transmission")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Suspension & Brakes */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Wrench className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Suspension & Brakes</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "suspension")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Dimensions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Dimensions</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "dimensions")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Tires */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Tires</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "tires")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Other */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Other</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {specifications
                              .filter((spec) => spec.category === "other")
                              .map((spec) => (
                                <div key={spec.key} className="space-y-2">
                                  <Label htmlFor={spec.key}>{spec.label}</Label>
                                  <Input
                                    id={spec.key}
                                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(spec.key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("features")}>
                        Back to Features
                      </Button>
                      <Button onClick={() => setActiveTab("images")}>Continue to Images</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="images" className="space-y-8">
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
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Listing image ${index + 1}`}
                              fill
                              className="rounded-md object-cover"
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
                            {index === 0 && (
                              <Badge className="absolute left-1 top-1" variant="secondary">
                                Main
                              </Badge>
                            )}
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

                      {images.length === 0 && (
                        <Alert className="mt-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Images required</AlertTitle>
                          <AlertDescription>Please add at least one image to your listing.</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("specifications")}>
                        Back to Specifications
                      </Button>
                      <Button type="submit" onClick={handleSubmit} disabled={images.length === 0}>
                        Continue to Payment
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <div className="sticky top-24 space-y-6">
                <Card className="glassmorphic-card">
                  <CardHeader>
                    <CardTitle>Listing Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Title preview */}
                    {title ? (
                      <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
                    ) : (
                      <div className="h-6 w-full rounded bg-muted animate-pulse"></div>
                    )}

                    {/* Image preview */}
                    <div className="aspect-[4/3] rounded-md overflow-hidden bg-muted">
                      {images.length > 0 ? (
                        <Image
                          src={images[0] || "/placeholder.svg"}
                          alt="Main listing image"
                          width={300}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImagePlus className="h-12 w-12" />
                        </div>
                      )}
                    </div>

                    {/* Price preview */}
                    {price ? (
                      <p className="text-xl font-bold">${Number.parseFloat(price).toLocaleString()}</p>
                    ) : (
                      <div className="h-7 w-24 rounded bg-muted animate-pulse"></div>
                    )}

                    {/* Details preview */}
                    <div className="space-y-2">
                      {condition && <Badge variant="outline">{condition}</Badge>}

                      {location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {location}
                        </div>
                      )}

                      {category && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Tag className="mr-1 h-4 w-4" />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                      )}
                    </div>

                    {/* Features preview */}
                    {features.some((f) => f.text.trim() !== "") && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium mb-2">Features</h4>
                          <ul className="text-sm space-y-1">
                            {features
                              .filter((f) => f.text.trim() !== "")
                              .slice(0, 3)
                              .map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1 text-primary">
                                    <Check className="h-2 w-2" />
                                  </div>
                                  <span className="text-muted-foreground">{feature.text}</span>
                                </li>
                              ))}
                            {features.filter((f) => f.text.trim() !== "").length > 3 && (
                              <li className="text-xs text-muted-foreground">
                                +{features.filter((f) => f.text.trim() !== "").length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

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
                      <li>• Be honest about the condition of your item</li>
                      <li>• Include detailed specifications</li>
                      <li>• Mention any modifications or upgrades</li>
                      <li>• Add clear, well-lit photos from multiple angles</li>
                      <li>• Set a fair price based on market value</li>
                      <li>• Respond promptly to inquiries</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
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

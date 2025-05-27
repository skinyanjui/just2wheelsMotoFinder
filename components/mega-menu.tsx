"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Bike, Wrench, Shield, Gauge, Truck, Shirt, Sparkles, Clock, ChevronRight, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define the category structure to match the listing details
export interface Category {
  name: string
  slug: string
  icon: React.ReactNode
  featured?: boolean
  subcategories?: { name: string; slug: string; description?: string }[]
}

export const categories: Category[] = [
  {
    name: "Motorcycles",
    slug: "/categories/motorcycles",
    icon: <Bike className="h-5 w-5" />,
    featured: true,
    subcategories: [
      {
        name: "Sport Bikes",
        slug: "/categories/motorcycles/sport-bikes",
        description: "High-performance motorcycles designed for speed and agility",
      },
      {
        name: "Cruisers",
        slug: "/categories/motorcycles/cruisers",
        description: "Comfortable motorcycles designed for long-distance riding",
      },
      {
        name: "Adventure",
        slug: "/categories/motorcycles/adventure",
        description: "Versatile motorcycles designed for on and off-road use",
      },
      {
        name: "Touring",
        slug: "/categories/motorcycles/touring",
        description: "Motorcycles designed for long-distance comfort and storage",
      },
      {
        name: "Off-Road",
        slug: "/categories/motorcycles/off-road",
        description: "Motorcycles designed specifically for off-road use",
      },
      {
        name: "Scooters",
        slug: "/categories/motorcycles/scooters",
        description: "Small, lightweight motorcycles with step-through frames",
      },
      {
        name: "Vintage",
        slug: "/categories/motorcycles/vintage",
        description: "Classic and collectible motorcycles from years past",
      },
      {
        name: "Electric",
        slug: "/categories/motorcycles/electric",
        description: "Modern electric-powered motorcycles",
      },
    ],
  },
  {
    name: "Parts & Components",
    slug: "/categories/parts",
    icon: <Wrench className="h-5 w-5" />,
    subcategories: [
      {
        name: "Engine Parts",
        slug: "/categories/parts/engine",
        description: "Components for motorcycle engines and performance",
      },
      {
        name: "Exhaust Systems",
        slug: "/categories/parts/exhaust",
        description: "Exhaust pipes, mufflers, and complete systems",
      },
      {
        name: "Brakes & Suspension",
        slug: "/categories/parts/brakes-suspension",
        description: "Brake pads, rotors, forks, and shock absorbers",
      },
      {
        name: "Drivetrain",
        slug: "/categories/parts/drivetrain",
        description: "Chains, sprockets, and transmission components",
      },
      {
        name: "Electrical",
        slug: "/categories/parts/electrical",
        description: "Batteries, lighting, and electrical components",
      },
      {
        name: "Bodywork",
        slug: "/categories/parts/bodywork",
        description: "Fairings, fenders, and cosmetic components",
      },
    ],
  },
  {
    name: "Gear & Apparel",
    slug: "/categories/gear",
    icon: <Shield className="h-5 w-5" />,
    featured: true,
    subcategories: [
      {
        name: "Helmets",
        slug: "/categories/gear/helmets",
        description: "Full-face, modular, and open-face motorcycle helmets",
      },
      {
        name: "Jackets",
        slug: "/categories/gear/jackets",
        description: "Leather, textile, and armored motorcycle jackets",
      },
      {
        name: "Pants",
        slug: "/categories/gear/pants",
        description: "Riding jeans, leather, and textile motorcycle pants",
      },
      {
        name: "Boots",
        slug: "/categories/gear/boots",
        description: "Motorcycle-specific footwear for protection and comfort",
      },
      {
        name: "Gloves",
        slug: "/categories/gear/gloves",
        description: "Summer, winter, and racing motorcycle gloves",
      },
      {
        name: "Protective Gear",
        slug: "/categories/gear/protective",
        description: "Armor, back protectors, and safety equipment",
      },
    ],
  },
  {
    name: "Accessories",
    slug: "/categories/accessories",
    icon: <Gauge className="h-5 w-5" />,
    subcategories: [
      {
        name: "Luggage & Storage",
        slug: "/categories/accessories/luggage",
        description: "Saddlebags, tank bags, and motorcycle luggage solutions",
      },
      {
        name: "Electronics & Gadgets",
        slug: "/categories/accessories/electronics",
        description: "GPS units, cameras, and communication devices",
      },
      {
        name: "Maintenance Tools",
        slug: "/categories/accessories/tools",
        description: "Specialized tools for motorcycle maintenance",
      },
      {
        name: "Security",
        slug: "/categories/accessories/security",
        description: "Locks, alarms, and anti-theft devices",
      },
    ],
  },
  {
    name: "Riding Gear",
    slug: "/categories/riding-gear",
    icon: <Shirt className="h-5 w-5" />,
  },
  {
    name: "Vintage & Collectibles",
    slug: "/categories/vintage",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "Services",
    slug: "/categories/services",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    name: "Special Offers",
    slug: "/categories/special-offers",
    icon: <Sparkles className="h-5 w-5" />,
  },
]

interface MegaMenuProps {
  trigger: React.ReactNode
  className?: string
}

export function MegaMenu({ trigger, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Mobile version uses Sheet component
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className={className}>{trigger}</div>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-md p-0">
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between border-b bg-background p-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetTrigger>
            </div>
            <div className="flex-1 p-0">
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category) => (
                  <AccordionItem key={category.name} value={category.name} className="border-b">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center">
                        <span className={cn("mr-2", category.featured && "text-primary")}>{category.icon}</span>
                        <span className={cn(category.featured && "font-medium text-primary")}>{category.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0">
                      {category.subcategories && category.subcategories.length > 0 ? (
                        <ul className="space-y-1 px-4 py-2">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.name}>
                              <Link
                                href={subcategory.slug}
                                className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-2">
                          <Link
                            href={category.slug}
                            className="block rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted"
                          >
                            Browse all {category.name}
                          </Link>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="sticky bottom-0 border-t bg-background p-4">
              <Link href="/categories">
                <Button variant="outline" className="w-full">
                  View All Categories
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop version uses dropdown
  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <div className="flex items-center gap-1">
        {trigger}
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 ease-in-out group-hover:text-foreground" />
      </div>

      {isOpen && (
        <div className="glassmorphic-card absolute left-0 top-full z-50 mt-1 w-screen max-w-screen-xl rounded-lg border bg-background/95 p-6 shadow-lg backdrop-blur-sm">
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-1">
              <h3 className="mb-3 text-sm font-medium">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.slug}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted",
                        category.featured && "font-medium text-primary",
                      )}
                    >
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/categories" className="flex items-center text-sm font-medium text-primary hover:underline">
                  View all categories
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {categories
                .filter((category) => category.subcategories && category.subcategories.length > 0)
                .slice(0, 3)
                .map((category) => (
                  <div key={category.name}>
                    <h3 className="mb-3 text-sm font-medium">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.subcategories?.map((subcategory) => (
                        <li key={subcategory.name}>
                          <Link
                            href={subcategory.slug}
                            className="block text-sm text-muted-foreground hover:text-foreground"
                          >
                            {subcategory.name}
                            {subcategory.description && (
                              <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {subcategory.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
            <div className="col-span-1">
              <div className="rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src="/kawasaki-ninja-motorcycle.png" alt="Featured motorcycle" fill className="object-cover" />
                </div>
                <div className="p-3 bg-muted">
                  <h4 className="font-medium text-sm">Featured Listings</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Discover the latest and hottest motorcycles on the market
                  </p>
                  <Link
                    href="/listings?featured=true"
                    className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    View featured listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

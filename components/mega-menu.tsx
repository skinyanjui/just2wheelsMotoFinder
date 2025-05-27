"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Bike, Wrench, Shield, Gauge, Truck, Shirt, Sparkles, Clock, ChevronRight } from "lucide-react"

interface Category {
  name: string
  slug: string
  icon: React.ReactNode
  featured?: boolean
  subcategories?: { name: string; slug: string }[]
}

interface MegaMenuProps {
  trigger: React.ReactNode
  className?: string
}

export function MegaMenu({ trigger, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const categories: Category[] = [
    {
      name: "Motorcycles",
      slug: "/categories/motorcycles",
      icon: <Bike className="h-5 w-5" />,
      featured: true,
      subcategories: [
        { name: "Sport Bikes", slug: "/categories/motorcycles/sport-bikes" },
        { name: "Cruisers", slug: "/categories/motorcycles/cruisers" },
        { name: "Adventure", slug: "/categories/motorcycles/adventure" },
        { name: "Touring", slug: "/categories/motorcycles/touring" },
        { name: "Off-Road", slug: "/categories/motorcycles/off-road" },
        { name: "Scooters", slug: "/categories/motorcycles/scooters" },
        { name: "Vintage", slug: "/categories/motorcycles/vintage" },
        { name: "Electric", slug: "/categories/motorcycles/electric" },
      ],
    },
    {
      name: "Parts & Components",
      slug: "/categories/parts",
      icon: <Wrench className="h-5 w-5" />,
      subcategories: [
        { name: "Engine Parts", slug: "/categories/parts/engine" },
        { name: "Exhaust Systems", slug: "/categories/parts/exhaust" },
        { name: "Brakes & Suspension", slug: "/categories/parts/brakes-suspension" },
        { name: "Drivetrain", slug: "/categories/parts/drivetrain" },
        { name: "Electrical", slug: "/categories/parts/electrical" },
        { name: "Bodywork", slug: "/categories/parts/bodywork" },
      ],
    },
    {
      name: "Gear & Apparel",
      slug: "/categories/gear",
      icon: <Shield className="h-5 w-5" />,
      featured: true,
      subcategories: [
        { name: "Helmets", slug: "/categories/gear/helmets" },
        { name: "Jackets", slug: "/categories/gear/jackets" },
        { name: "Pants", slug: "/categories/gear/pants" },
        { name: "Boots", slug: "/categories/gear/boots" },
        { name: "Gloves", slug: "/categories/gear/gloves" },
        { name: "Protective Gear", slug: "/categories/gear/protective" },
      ],
    },
    {
      name: "Accessories",
      slug: "/categories/accessories",
      icon: <Gauge className="h-5 w-5" />,
      subcategories: [
        { name: "Luggage & Storage", slug: "/categories/accessories/luggage" },
        { name: "Electronics & Gadgets", slug: "/categories/accessories/electronics" },
        { name: "Maintenance Tools", slug: "/categories/accessories/tools" },
        { name: "Security", slug: "/categories/accessories/security" },
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

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      {trigger}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-screen max-w-screen-xl rounded-lg border bg-background p-6 shadow-lg">
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
                          <Link href={subcategory.slug} className="text-sm text-muted-foreground hover:text-foreground">
                            {subcategory.name}
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

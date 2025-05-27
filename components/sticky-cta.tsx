"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transform transition-all duration-300 sm:hidden",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
    >
      <Button asChild size="lg" className="h-12 rounded-full shadow-lg">
        <Link href="/listings/create">
          <Plus className="mr-2 h-5 w-5" />
          Post a Listing
        </Link>
      </Button>
    </div>
  )
}

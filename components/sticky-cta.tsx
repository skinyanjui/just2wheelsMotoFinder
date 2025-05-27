"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleScroll = () => {
      // Show the CTA when scrolled down 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isMobile) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-0 right-0 z-50 flex justify-center transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
      )}
    >
      <Button asChild size="lg" className="glassmorphic-card shadow-lg">
        <Link href="/listings/create">
          <Plus className="mr-2 h-5 w-5" />
          Post a Listing
        </Link>
      </Button>
    </div>
  )
}

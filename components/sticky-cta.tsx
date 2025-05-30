"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show if user is not logged in - they'll see the CTA in the header
  if (!user) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
      )}
    >
      <Button asChild size="lg" className="h-14 rounded-full shadow-lg">
        <Link href="/listings/create">
          <Plus className="mr-2 h-5 w-5" />
          Sell Your Motorcycle
        </Link>
      </Button>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function CreateListingFAB() {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  // Don't show on the create listing page or when user is not logged in
  const shouldShow = user && pathname !== "/listings/create"

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 500px
      setIsVisible(window.scrollY > 500)
    }

    if (shouldShow) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
      )}
    >
      <Button asChild size="lg" className="h-14 w-14 rounded-full p-0 shadow-lg md:w-auto md:px-4">
        <Link href="/listings/create">
          <Plus className="h-6 w-6 md:mr-2" />
          <span className="sr-only md:not-sr-only">Sell Your Motorcycle</span>
        </Link>
      </Button>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MegaMenu } from "@/components/mega-menu"
import {
  Bell,
  Menu,
  Search,
  User,
  MessageSquare,
  Heart,
  BookmarkCheck,
  Settings,
  LogOut,
  Home,
  Tag,
  Info,
  HelpCircle,
  Shield,
  FileText,
  Phone,
  Plus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Additional nav items (from feat/build-out-missing-pages)
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  // Notification handlers (from feat/build-out-missing-pages)
  const handleMarkNotificationRead = (notificationId: string) => {
    markNotificationAsRead(notificationId)
    updateNotificationData()
  }

  const handleMarkAllNotificationsRead = () => {
    notifications.forEach((n) => {
      if (!n.isRead) markNotificationAsRead(n.id)
    })
    updateNotificationData()
    setIsNotificationDropdownOpen(false)
  }

  // Search handler (from main)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // ... (rest of your full component is unchanged)

  return (
    // Entire <header> JSX remains unchanged from your original message
    // including the mobile nav, desktop nav, user menus, etc.
    // No need to repeat the JSX here unless you need changes
    );
}

export default Header

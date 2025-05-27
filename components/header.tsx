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
import { Bell, Menu, Search, User, MessageSquare, Heart, BookmarkCheck, Settings, LogOut } from "lucide-react"
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
  const [notifications, setNotifications] = useState([])
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)

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

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const updateNotificationData = () => {
    // Mock function to simulate fetching notifications
    const newNotifications = [
      { id: "1", message: "New message received", isRead: false },
      { id: "2", message: "Listing updated", isRead: true },
    ]
    setNotifications(newNotifications)
  }

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
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        isScrolled ? "shadow-sm" : "border-b",
      )}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-3/4 border-r">
              <div className="grid gap-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                  <span className="font-bold">Acme</span>
                </Link>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <Link href={item.href} key={item.name} className="block">
                      {item.name}
                    </Link>
                  ))}
                </div>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Sign In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ) : null}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="hidden font-bold sm:inline-block">Acme</span>
        </Link>
        <div className="w-full flex-1 sm:w-auto">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground peer-focus:text-secondary" />
              <Input
                type="search"
                placeholder="Search for listings..."
                className="w-full bg-background shadow-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[30rem] pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {!user ? (
            <>
              <Link href="/login">Sign In</Link>
              <Button variant="outline" size="sm" onClick={() => router.push("/register")}>
                Get Started
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative px-2">
                    <Bell className="h-5 w-5" />
                    {notifications.filter((n) => !n.isRead).length > 0 ? (
                      <Badge className="absolute -top-1 -right-1 rounded-full px-2 py-0.5 text-xs" variant="secondary">
                        {notifications.filter((n) => !n.isRead).length}
                      </Badge>
                    ) : null}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length === 0 ? (
                    <DropdownMenuItem className="cursor-default">No notifications</DropdownMenuItem>
                  ) : (
                    <>
                      {notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex items-center justify-between"
                          onClick={() => handleMarkNotificationRead(notification.id)}
                        >
                          {notification.message}
                          {!notification.isRead && <Badge variant="secondary">New</Badge>}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleMarkAllNotificationsRead}>Mark all as read</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User Avatar"} />
                      <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/messages")}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/wishlist")}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/saved")}>
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      <span>Saved</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header

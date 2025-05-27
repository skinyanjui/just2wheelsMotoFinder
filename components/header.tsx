"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  Bike,
  Search,
  Menu,
  User,
  LogOut,
  Heart,
  MessageSquare,
  Bell,
  Plus,
  Settings,
  ChevronDown,
  ListFilter,
  Moon,
  Sun,
  Bookmark,
  Home,
  Info,
  HelpCircle,
  ShieldCheck,
  FileText,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getUnreadNotificationsCount, mockNotifications } from "@/lib/mock-data/messages"
import NotificationDropdown from "@/components/notification-dropdown"
import { MegaMenu } from "@/components/mega-menu"
import { SearchDialog } from "@/components/search-dialog"

export default function Header() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Get unread notifications count
  useEffect(() => {
    setUnreadCount(getUnreadNotificationsCount())
  }, [])

  const mainNavItems = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "Categories", href: "/categories", hasMegaMenu: true },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Safety Tips", href: "/safety-tips" },
  ]

  const userNavItems = user
    ? [
        { name: "My Listings", href: "/listings/my-listings", icon: <Bike className="h-4 w-4" /> },
        { name: "Messages", href: "/messages", icon: <MessageSquare className="h-4 w-4" /> },
        { name: "Favorites", href: "/favorites", icon: <Heart className="h-4 w-4" /> },
        { name: "Saved Searches", href: "/saved-searches", icon: <Bookmark className="h-4 w-4" /> },
        { name: "Profile Settings", href: "/profile", icon: <Settings className="h-4 w-4" /> },
      ]
    : []

  const secondaryNavItems = [
    { name: "About Us", href: "/about", icon: <Info className="h-4 w-4" /> },
    { name: "FAQ", href: "/faq", icon: <HelpCircle className="h-4 w-4" /> },
    { name: "Safety Tips", href: "/safety-tips", icon: <ShieldCheck className="h-4 w-4" /> },
    { name: "Terms of Service", href: "/terms-of-service", icon: <FileText className="h-4 w-4" /> },
    { name: "Contact Us", href: "/contact", icon: <Mail className="h-4 w-4" /> },
  ]

  const handleMarkAllAsRead = () => {
    // In a real app, this would call an API
    setUnreadCount(0)
  }

  const handleMarkAsRead = (id: string) => {
    // In a real app, this would call an API
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "border-b bg-background/80 backdrop-blur-md" : "bg-background/0 backdrop-blur-none",
      )}
      style={{ "--header-height": "72px" } as React.CSSProperties}
    >
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bike className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Just2Wheels</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                {item.hasMegaMenu ? (
                  <MegaMenu
                    trigger={
                      <button
                        className={cn(
                          "flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-muted",
                          pathname === item.href ? "bg-muted font-semibold text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    }
                  />
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === item.href ? "bg-muted font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Search Dialog */}
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              {/* Notifications */}
              <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-0 w-80 md:w-96">
                  <NotificationDropdown
                    notifications={mockNotifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onClose={() => setNotificationsOpen(false)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Messages */}
              <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex">
                <Link href="/messages">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>

              {/* Create Listing Button */}
              <Button asChild className="hidden sm:flex">
                <Link href="/listings/create">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Post Listing</span>
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full p-0 sm:ml-2"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userNavItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex w-full cursor-pointer items-center">
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Login/Register Buttons */}
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild className="hidden sm:flex">
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {user ? (
                <div className="mb-6 flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6 flex flex-col gap-2">
                  <Button asChild>
                    <Link href="/auth/login">
                      <User className="mr-2 h-4 w-4" />
                      Log in
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/register">Sign up</Link>
                  </Button>
                </div>
              )}

              {user && (
                <>
                  <div className="mb-2">
                    <Button asChild className="w-full">
                      <Link href="/listings/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Post Listing
                      </Link>
                    </Button>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2">
                    <Button variant="outline" size="icon" asChild className="flex flex-col h-auto py-2">
                      <Link href="/messages">
                        <MessageSquare className="h-5 w-5 mb-1" />
                        <span className="text-xs">Messages</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="flex flex-col h-auto py-2">
                      <Link href="/favorites">
                        <Heart className="h-5 w-5 mb-1" />
                        <span className="text-xs">Favorites</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="flex flex-col h-auto py-2">
                      <Link href="/saved-searches">
                        <Bookmark className="h-5 w-5 mb-1" />
                        <span className="text-xs">Saved</span>
                      </Link>
                    </Button>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigation</p>
                {mainNavItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted",
                        pathname === item.href && "bg-muted",
                      )}
                    >
                      {item.name === "Home" && <Home className="mr-2 h-4 w-4" />}
                      {item.name === "Listings" && <ListFilter className="mr-2 h-4 w-4" />}
                      {item.name === "Categories" && <Bike className="mr-2 h-4 w-4" />}
                      {item.name === "How It Works" && <HelpCircle className="mr-2 h-4 w-4" />}
                      {item.name === "Safety Tips" && <ShieldCheck className="mr-2 h-4 w-4" />}
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {user && (
                <div className="mt-4 space-y-1">
                  <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Account</p>
                  {userNavItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted",
                          pathname === item.href && "bg-muted",
                        )}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-1">
                <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">More</p>
                {secondaryNavItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted",
                        pathname === item.href && "bg-muted",
                      )}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-md px-2 py-1.5">
                <span className="text-sm font-medium">Theme</span>
                <div className="flex gap-1">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="sr-only">Light theme</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="sr-only">Dark theme</span>
                  </Button>
                </div>
              </div>

              {user && (
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="mt-auto justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </SheetClose>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

import type React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header" // Changed from named import to default import
import Footer from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { StickyCTA } from "@/components/sticky-cta"
import { Toaster } from "@/components/ui/toaster"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
})

export const metadata: Metadata = {
  title: "Just2Wheels - Motorcycle Marketplace",
  description: "Buy and sell motorcycles, parts, and gear on the premier two-wheeled vehicle marketplace.",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <StickyCTA />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

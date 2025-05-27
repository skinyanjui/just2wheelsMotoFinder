import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  try {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  } catch (error) {
    console.error("Layout error:", error)
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="container flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p>Please try refreshing the page</p>
          </div>
        </body>
      </html>
    )
  }
}

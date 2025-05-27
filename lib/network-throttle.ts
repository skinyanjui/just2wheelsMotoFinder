/**
 * Utility to simulate slow network connections for testing loading states
 *
 * Usage:
 * 1. Import in your component: import { enableNetworkThrottle, disableNetworkThrottle } from "@/lib/network-throttle"
 * 2. Enable throttling: enableNetworkThrottle(2000) // 2 second delay
 * 3. Disable when done: disableNetworkThrottle()
 *
 * Note: This should only be used in development mode
 */

const originalFetch = global.fetch

export function enableNetworkThrottle(delay = 1500) {
  if (process.env.NODE_ENV !== "development") {
    console.warn("Network throttling should only be used in development mode")
    return
  }

  console.log(`🐢 Network throttling enabled with ${delay}ms delay`)

  // Override the global fetch function
  global.fetch = async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, delay))
    return originalFetch(...args)
  }

  // Add visual indicator to the page
  if (typeof document !== "undefined") {
    const indicator = document.createElement("div")
    indicator.id = "network-throttle-indicator"
    indicator.style.position = "fixed"
    indicator.style.bottom = "20px"
    indicator.style.right = "20px"
    indicator.style.backgroundColor = "rgba(255, 0, 0, 0.8)"
    indicator.style.color = "white"
    indicator.style.padding = "8px 12px"
    indicator.style.borderRadius = "4px"
    indicator.style.zIndex = "9999"
    indicator.style.fontSize = "14px"
    indicator.textContent = `🐢 Network Throttled (${delay}ms)`
    document.body.appendChild(indicator)
  }
}

export function disableNetworkThrottle() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  console.log("🚀 Network throttling disabled")

  // Restore the original fetch function
  global.fetch = originalFetch

  // Remove the visual indicator
  if (typeof document !== "undefined") {
    const indicator = document.getElementById("network-throttle-indicator")
    if (indicator) {
      indicator.remove()
    }
  }
}

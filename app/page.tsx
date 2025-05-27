export default function Home() {
  try {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* Your existing content */}
      </main>
    )
  } catch (error) {
    console.error("Home page error:", error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Error loading home page</h1>
        <p>Please try refreshing the page</p>
      </div>
    )
  }
}

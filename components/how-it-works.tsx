import { Search, FileText, MessageSquare, CreditCard } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Find What You Need",
      description:
        "Browse thousands of listings for motorcycles, parts, and gear. Use our advanced search to filter by make, model, price, and location.",
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Create a Listing",
      description:
        "Selling something? Create a detailed listing with photos, specifications, and your asking price. It costs just $25 to post a listing.",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Connect with Buyers/Sellers",
      description:
        "Use our secure messaging system to ask questions, negotiate prices, and arrange meetings with other users.",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Complete the Transaction",
      description:
        "Finalize the deal safely. We provide tips and best practices for secure transactions and transfers of ownership.",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={index} className="glassmorphic-card flex flex-col items-center p-6 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{step.icon}</div>
          <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}

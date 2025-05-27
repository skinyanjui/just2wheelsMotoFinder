// app/safety-tips/page.tsx
"use client"; // For consistency, though likely not needed for static content

import { ShieldCheck, Users, MapPin, FileText, MessageCircle, CreditCard, Camera } from "lucide-react"; // Icons

const safetySections = [
  {
    title: "Meeting in Person",
    icon: <Users className="h-6 w-6 text-primary" />,
    tips: [
      "Always arrange to meet in a public, well-lit place. Police stations often have designated 'safe exchange zones'.",
      "Bring a friend or family member with you if possible.",
      "Inform someone you trust about where you are going, who you are meeting, and when you expect to be back.",
      "Trust your instincts. If a situation feels unsafe or uncomfortable, leave immediately.",
      "Avoid meeting at your home or the other person's home, especially for initial meetings.",
    ],
  },
  {
    title: "Verifying Motorcycle & Documents",
    icon: <FileText className="h-6 w-6 text-primary" />,
    tips: [
      "Ask to see the motorcycle's title (logbook/V5C in some regions) and registration documents. Ensure the seller's name matches the documents.",
      "Verify the Vehicle Identification Number (VIN) on the motorcycle matches the VIN on the documents.",
      "Check for any liens on the motorcycle. A vehicle history report can be helpful.",
      "Inspect the motorcycle thoroughly in daylight. If you're not mechanically inclined, consider bringing a knowledgeable friend or arranging a pre-purchase inspection by a qualified mechanic.",
      "Ask about the motorcycle's service history and request records if available.",
    ],
  },
  {
    title: "Test Rides (For Buyers & Sellers)",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    tips: [
      "**For Buyers:** Never test ride without appropriate insurance. Discuss liability beforehand. The seller may ask for the full cash amount as a security deposit before a test ride.",
      "**For Sellers:** Verify the potential buyer has a valid motorcycle license and insurance. It's reasonable to hold the full agreed-upon cash price as a deposit during a test ride. Accompany the buyer if possible (e.g., in another vehicle).",
      "Agree on the test ride route and duration beforehand.",
    ],
  },
  {
    title: "Secure Payments",
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    tips: [
      "Use secure payment methods. Cash in person (after verifying authenticity of bills) is common, but can carry risks.",
      "Bank transfers or certified cashier's checks are generally safer than personal checks, which can bounce.",
      "Be extremely wary of requests for wire transfers (e.g., Western Union, MoneyGram), especially to overseas accounts, as these are often associated with scams.",
      "Never send payment for a motorcycle you haven't seen in person or had inspected, unless using a highly reputable escrow service (be cautious of fake escrow sites).",
      "Ensure funds are cleared before handing over the motorcycle and title.",
    ],
  },
  {
    title: "Communicating Safely",
    icon: <MessageCircle className="h-6 w-6 text-primary" />,
    tips: [
      "Keep communications within the Just2Wheels messaging system initially. This creates a record and avoids sharing personal contact details too early.",
      "Be cautious of users who immediately try to move the conversation off-platform (e.g., to personal email or text, especially if they seem rushed or suspicious).",
      "Do not share unnecessary personal information like your home address, bank account details, or social security number.",
    ],
  },
  {
    title: "Spotting Scams",
    icon: <Camera className="h-6 w-6 text-primary" />, // Using Camera as a metaphor for "inspecting/spotting"
    tips: [
      "Be wary of listings that seem 'too good to be true' (e.g., exceptionally low price for a popular model).",
      "Watch out for sellers who are currently 'out of the country', 'on a military deployment', or have elaborate stories requiring you to pay upfront for shipping.",
      "Be suspicious of buyers offering significantly more than your asking price, especially if they involve complicated payment schemes or third-party 'shipping agents'.",
      "If a seller or buyer pressures you to make a quick decision or send money immediately, be cautious.",
      "Check photos carefully. Scammers sometimes use stock photos or images from other listings. You can try a reverse image search.",
    ],
  },
];

export default function SafetyTipsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <header className="mb-12 text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Safety Tips for Buyers & Sellers</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your safety is important to us. Follow these tips for a secure experience on Just2Wheels.
        </p>
      </header>

      <div className="space-y-10">
        {safetySections.map((section, index) => (
          <section key={index} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 p-2">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            </div>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {section.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>{tip}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      
      <footer className="mt-16 border-t pt-8 text-center">
        <h3 className="text-xl font-semibold">Be Smart, Be Safe!</h3>
        <p className="mt-2 text-muted-foreground">
          While Just2Wheels facilitates connections, transactions are between users. Always use your best judgment. 
          If you encounter suspicious activity, please <a href="/contact" className="text-primary hover:underline">report it to us</a>.
        </p>
      </footer>
    </div>
  );
}

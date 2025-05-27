// app/faq/page.tsx
"use client"; // Accordion component likely uses client-side features

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming path is correct
import { Button } from "@/components/ui/button"; // Import Button

const faqData = [
  {
    question: "How do I create a listing for my motorcycle?",
    answer:
      "To create a listing, first ensure you are registered and logged in. Then, navigate to the 'Create Listing' page (usually found in your user profile menu or a prominent button on the site). Fill out all the required details about your motorcycle, including make, model, year, price, description, and upload clear photos. Once submitted, your listing may go through a quick review or payment step before becoming live.",
  },
  {
    question: "Are there any fees for listing an item?",
    answer:
      "Yes, there is a standard fee of $10.00 to publish a listing on Just2Wheels. This helps us maintain the platform and provide support. Occasionally, we may offer promotional discounts or different listing packages with varying features and fees.",
  },
  {
    question: "How can I contact a seller about a listing?",
    answer:
      "On each listing page, you should find a 'Contact Seller' or 'Send Message' button. Clicking this will allow you to send a message directly to the seller through our secure messaging system. Ensure you are logged in to use this feature. Your conversation will then be available in your 'Messages' inbox.",
  },
  {
    question: "What are some tips for a safe transaction?",
    answer:
      "Safety is paramount. We recommend: \n - Meeting in a public, well-lit place. \n - Bringing a friend if possible. \n - Verifying all documentation (title, registration) thoroughly. \n - Being cautious of unusually high or low offers. \n - Using secure payment methods; avoid wire transfers to unknown parties. \n - For test rides, ensure you have appropriate insurance and agree on terms beforehand. \n Visit our 'Safety Tips' page for more detailed advice.",
  },
  {
    question: "What kind of items can I sell on Just2Wheels?",
    answer:
      "Just2Wheels is primarily for motorcycles of all types (sport bikes, cruisers, dirt bikes, touring, vintage, etc.). You can also list motorcycle parts, accessories (helmets, gear, etc.), and related services. Prohibited items generally include anything illegal, firearms, or items not related to the motorcycle community. Please check our Terms of Service for a detailed list of allowed and prohibited items.",
  },
  {
    question: "How do I edit or delete my listing?",
    answer:
      "You can manage your listings from your 'My Listings' page, accessible from your user profile. There, you should find options to edit details, update photos, mark your item as sold, or delete the listing entirely.",
  },
  {
    question: "What if I suspect a fraudulent listing or user?",
    answer:
      "Please report any suspicious activity to us immediately. On each listing, there should be a 'Report Listing' option. You can also contact our support team through the 'Contact Us' page with details of your concern. We take these reports very seriously and will investigate accordingly.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about using Just2Wheels.
        </p>
      </header>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} className="rounded-lg border bg-card px-4 shadow-sm hover:bg-muted/50 transition-colors">
            <AccordionTrigger className="py-4 text-left text-lg font-medium hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm max-w-none pb-4 text-muted-foreground">
              {/* Using a div with whitespace-pre-line to respect newlines in answer string */}
              <div style={{ whiteSpace: "pre-line" }}>{item.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold">Still have questions?</h2>
        <p className="mt-2 text-muted-foreground">
          If you can't find the answer you're looking for, feel free to reach out to our support team.
        </p>
        <Button asChild className="mt-6">
          <a href="/contact">Contact Support</a>
        </Button>
      </section>
    </div>
  );
}

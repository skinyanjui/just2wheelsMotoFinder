// app/terms-of-service/page.tsx
"use client"; // If any interactive elements were to be added, though unlikely for ToS

import { Fragment } from "react"; // For organizing JSX if needed

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "Welcome to Just2Wheels! By accessing or using our website and services, you agree to be bound by these Terms of Service ('Terms') and our Privacy Policy. If you do not agree to these Terms, please do not use our services. These Terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
    },
    {
      title: "2. Description of Service",
      content:
        "Just2Wheels is an online platform that connects buyers and sellers of motorcycles, motorcycle parts, accessories, and related services ('Service'). We are not a party to any transaction between buyers and sellers. We do not own, inspect, or have possession of any items listed on the site.",
    },
    {
      title: "3. User Accounts and Responsibilities",
      content:
        "To access certain features, you may need to register for an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete information and to update it as necessary. You must be at least 18 years old to use our Service or have the permission of a legal guardian.",
    },
    {
      title: "4. Listings and Content",
      content:
        "As a seller, you are responsible for the accuracy, legality, and content of your listings. All listings must be for items or services directly related to motorcycles. Prohibited content includes, but is not limited to: illegal items, firearms, stolen goods, misleading information, and content that infringes on third-party intellectual property rights. We reserve the right to remove any listing or content that violates these Terms or is otherwise deemed inappropriate, without notice.",
    },
    {
      title: "5. Prohibited Conduct",
      content:
        "You agree not to use the Service for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service. Prohibited conduct includes: harassment of other users, spamming, data mining, attempting to gain unauthorized access to our systems, and interfering with the security features of the site.",
    },
    {
      title: "6. Fees and Payments",
      content:
        "Creating an account and browsing listings is free. We charge a fee for publishing a listing (e.g., $10.00 per standard listing). Any applicable fees will be clearly disclosed to you prior to you incurring them. All fees are non-refundable unless otherwise stated by us in writing. You are responsible for paying all fees and applicable taxes associated with your use of the Service.",
    },
    {
      title: "7. Disclaimers and Limitation of Liability",
      content:
        "Our Service is provided 'as is' and 'as available' without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or listings. We are not liable for any damages arising from your use of the Service, including disputes between users, or issues with items purchased or sold. Our liability to you for any cause whatsoever will at all times be limited to the amount paid, if any, by you to us for the Service during the term of membership.",
    },
    {
      title: "8. Intellectual Property",
      content:
        "The Just2Wheels name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Just2Wheels or its affiliates or licensors. You must not use such marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on this Website are the trademarks of their respective owners.",
    },
    {
      title: "9. Indemnification",
      content:
        "You agree to indemnify, defend, and hold harmless Just2Wheels, its officers, directors, employees, agents, and licensors from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these Terms or any activity related to your account (including negligent or wrongful conduct) by you or any other person accessing the Service using your account.",
    },
    {
      title: "10. Governing Law and Dispute Resolution",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of [Your State/Country, e.g., 'the State of California'], without regard to its conflict of law provisions. Any dispute arising from these Terms or your use of the Service shall be resolved through binding arbitration in [Your City, e.g., 'San Francisco, CA'], rather than in court, except that you may assert claims in small claims court if your claims qualify.",
    },
    {
      title: "11. Changes to Terms",
      content:
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.",
    },
    {
      title: "12. Contact Information",
      content:
        "If you have any questions about these Terms, please contact us via the information provided on our 'Contact Us' page.",
    },
    {
      title: "Disclaimer (Important)",
      content:
        "The content provided in these Terms of Service is for informational and illustrative purposes only, as Just2Wheels is a fictional platform. This is not legal advice. If you are creating a real online platform, you should consult with a qualified legal professional to draft comprehensive and legally binding Terms of Service tailored to your specific business model, jurisdiction, and applicable laws.",
    }
  ];

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <div className="prose prose-slate mx-auto max-w-none dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-p:leading-relaxed">
        <p className="lead text-lg text-muted-foreground">
          Please read these Terms of Service carefully before using the Just2Wheels platform. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms.
        </p>
        
        {sections.map((section, index) => (
          <Fragment key={index}>
            <h2 className={section.title.startsWith("Disclaimer") ? "text-destructive" : ""}>{section.title}</h2>
            <p>{section.content}</p>
          </Fragment>
        ))}
      </div>
      
      <footer className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Just2Wheels. All rights reserved.</p>
        <p>This is a fictional platform. Please consult legal counsel for actual Terms of Service.</p>
      </footer>
    </div>
  );
}

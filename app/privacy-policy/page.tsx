// app/privacy-policy/page.tsx
"use client"; // If any interactive elements were to be added

import { Fragment } from "react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Introduction",
      content:
        "Welcome to Just2Wheels ('we', 'us', 'our'). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. This policy applies to all information collected through our website and services.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as posting listings or messages), or otherwise when you contact us. \nThe personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following: \n - Name and Contact Data (email address, phone number) \n - Account Credentials (username, password) \n - User-Generated Content (listings, messages, photos, reviews) \n - Usage Data (how you use our site, IP address, browser type - collected automatically)",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "We use personal information collected via our website for a variety of business purposes described below: \n - To facilitate account creation and logon process. \n - To send administrative information to you (e.g., information about your account, changes to our terms, conditions, and policies). \n - To manage user listings and facilitate communication between users. \n - To respond to user inquiries and offer support. \n - To personalize and improve your experience on our platform. \n - For data analysis, identifying usage trends, and to improve our website and services. \n - To send you marketing and promotional communications if you have opted in (you can opt-out at any time).",
    },
    {
      title: "4. Will Your Information Be Shared With Anyone?",
      content:
        "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. \n We may share your information with: \n - Other Users: When you create a listing or send a message, other users will be able to see your listing details and messages as intended by the platform's functionality. \n - Service Providers: We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., hosting, data analytics, customer service). \n - Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.",
    },
    {
      title: "5. How Long Do We Keep Your Information?",
      content:
        "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.",
    },
    {
      title: "6. How Do We Keep Your Information Safe?",
      content:
        "We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.",
    },
    {
      title: "7. Your Privacy Rights",
      content:
        "Depending on your location, you may have certain rights regarding your personal information under applicable data protection laws. These may include the right to: \n - Access a copy of your personal data. \n - Request correction or deletion of your personal data. \n - Object to or restrict processing of your personal data. \n - Data portability. \n - Withdraw consent at any time (if processing is based on consent). \n You can typically review and manage your personal information within your account settings or by contacting us.",
    },
    {
      title: "8. Policy for Children",
      content:
        "We do not knowingly solicit data from or market to children under 18 years of age. By using the Service, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Service. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.",
    },
    {
      title: "9. Cookies and Tracking Technologies",
      content:
        "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our (future) Cookie Policy. For now, assume standard essential cookies are used for site functionality.",
    },
    {
      title: "10. Changes to This Privacy Policy",
      content:
        "We may update this privacy policy from time to time. The updated version will be indicated by an updated 'Last Updated' date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.",
    },
    {
      title: "11. Contact Us",
      content:
        "If you have questions or comments about this policy, you may contact us through the details provided on our 'Contact Us' page.",
    },
    {
      title: "Disclaimer (Important)",
      content:
        "This Privacy Policy is a template and for informational purposes only, as Just2Wheels is a fictional platform. It is not legal advice. For any real online platform, you must consult with a legal professional to create a Privacy Policy that complies with all applicable laws and regulations in your specific jurisdiction(s) (e.g., GDPR, CCPA).",
    }
  ];

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <div className="prose prose-slate mx-auto max-w-none dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-p:leading-relaxed">
        <p className="lead text-lg text-muted-foreground">
          Your privacy is important to us. This Privacy Policy outlines how Just2Wheels collects, uses, discloses, and safeguards your information when you use our platform.
        </p>
        
        {sections.map((section, index) => (
          // Using div with whiteSpace for answers that have intentional newlines
          <div key={index} className="mb-6">
            <h2 className={section.title.startsWith("Disclaimer") ? "text-destructive" : ""}>{section.title}</h2>
            <div style={{ whiteSpace: "pre-line" }} className="text-muted-foreground">{section.content}</div>
          </div>
        ))}
      </div>
      
      <footer className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Just2Wheels. All rights reserved.</p>
        <p>This is a fictional platform. Please consult legal counsel for an actual Privacy Policy.</p>
      </footer>
    </div>
  );
}

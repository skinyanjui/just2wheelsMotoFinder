import GeneralContactForm from "@/components/general-contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Have a question or feedback? Fill out the form below to get in touch with the Just2Wheels team.
        </p>
      </div>
      <GeneralContactForm />
    </div>
  );
}

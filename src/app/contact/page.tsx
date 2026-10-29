import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Contact & Hire — Remote Collaboration",
  description:
    "Hire Subrata Mohajan for brand identity, LED billboard campaigns, packaging and social creatives. WhatsApp +880 1601 168996, email, or send a project brief directly through the form.",
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${"Subrata Mohajan"}`, url: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="pt-[72px]">
      <div
        className="absolute inset-x-0 top-[72px] -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(40rem 24rem at 70% 10%, rgba(3,181,231,0.12), transparent 62%), radial-gradient(32rem 20rem at 20% 60%, rgba(1,92,177,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <ContactSection />
    </section>
  );
}

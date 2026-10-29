import { Hero } from "@/components/home/hero";
import { Marquee, Work, Principles, Testimonials, Guides } from "@/components/home/sections";
import { DesignLab } from "@/components/home/design-lab";
import { Faq } from "@/components/home/faq";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <DesignLab />
      <Principles />
      <Testimonials />
      <Guides />
      <Faq />
      <ContactSection />
    </>
  );
}

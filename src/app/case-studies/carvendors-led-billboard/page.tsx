import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { CaseStudy } from "@/components/case-study";

const project = projects.find((p) => p.slug === "carvendors-led-billboard")!;

export const metadata: Metadata = {
  title: "CarVendors.co.uk LED Billboard — Case Study",
  description:
    "How a UK automotive marketplace billboard was engineered for 100% legibility within a 3.0-second viewing window at 50 mph. Brand visual direction, typographic architecture and production assets by Subrata Mohajan.",
  alternates: { canonical: "/case-studies/carvendors-led-billboard" },
  openGraph: {
    title: "CarVendors.co.uk LED Billboard — Case Study",
    images: [{ url: "/images/carvendors-1800.webp", width: 1800, height: 1012 }],
  },
};

export default function CarVendorsCaseStudy() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}

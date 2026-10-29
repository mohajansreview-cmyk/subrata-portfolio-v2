import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { CaseStudy } from "@/components/case-study";

const project = projects.find((p) => p.slug === "biqolpo-brand-identity")!;

export const metadata: Metadata = {
  title: "Biqolpo Brand Identity & Social Campaign — Case Study",
  description:
    "A complete visual identity and social communication rollout for an organic honey brand — packaging system, 12+ social creatives, and a 35% higher social engagement rate. By Subrata Mohajan.",
  alternates: { canonical: "/case-studies/biqolpo-brand-identity" },
  openGraph: {
    title: "Biqolpo Brand Identity & Social Campaign — Case Study",
    images: [{ url: "/images/biqolpo-1800.webp", width: 1800, height: 1012 }],
  },
};

export default function BiqolpoCaseStudy() {
  if (!project) notFound();
  return <CaseStudy project={project} />;
}

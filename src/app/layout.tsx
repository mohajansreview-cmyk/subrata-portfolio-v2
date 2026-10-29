import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/nav";
import { Footer, WhatsAppFab } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { site, socials, faqs } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Official portfolio of Subrata Mohajan, Graphic Designer & Brand Visualizer based in Chattogram, Bangladesh. Specializing in brand identity systems, large-format outdoor LED billboards, packaging, and commercial visual direction.",
  keywords: [
    "Subrata Mohajan", "graphic designer", "brand visualizer", "brand identity",
    "LED billboard design", "outdoor advertising design", "packaging design",
    "Chattogram designer", "Bangladesh graphic designer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} — ${site.title}`,
    description:
      "Brand identity systems, large-format outdoor LED billboards, packaging and commercial visual direction. Chattogram, Bangladesh — working worldwide.",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: `${site.name} — ${site.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description:
      "Brand identity systems, large-format outdoor LED billboards, packaging and commercial visual direction.",
    images: ["/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#030816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: ["Subrata Mohajan Niloy", "Subrata Designer"],
    jobTitle: "Graphic Designer & Brand Visualizer",
    description: `${site.title} based in ${site.location}, working remotely worldwide.`,
    email: `mailto:${site.email}`,
    telephone: site.whatsappNumber,
    url: site.url,
    image: `${site.url}/images/portrait-square.webp`,
    worksFor: { "@type": "Organization", name: "B & F Corporate", address: "Northampton, United Kingdom" },
    address: { "@type": "PostalAddress", addressLocality: "Chattogram", addressCountry: "BD" },
    sameAs: socials.map((s) => s.href),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    author: { "@type": "Person", name: site.name },
    inLanguage: "en",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website, faqSchema]) }}
    />
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body id="top">
        <div className="ambient" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-ink-950"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <JsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

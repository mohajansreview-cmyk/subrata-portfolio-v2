import Link from "next/link";
import { site, socials, whatsappLink } from "@/lib/content";
import { brandIcon, IconArrowUpRight } from "@/components/icons";

const serviceLinks = [
  "Brand Identity Systems",
  "LED Billboards & Advertising",
  "Social Media Ad Creatives",
  "Photo Manipulation & Compositing",
  "Packaging & Print Production",
  "Infographic Architecture",
  "Web Graphics & UI Assets",
  "Presentation & Pitch Decks",
];

const legacyLinks = [
  { label: "Digital Products Directory", href: "https://subrata.fedardokan.com/digital-products/" },
  { label: "Design Knowledge Hub", href: "https://subrata.fedardokan.com/learn/" },
  { label: "Privacy Policy", href: "https://subrata.fedardokan.com/privacy-policy/" },
  { label: "Terms & Conditions", href: "https://subrata.fedardokan.com/terms-and-conditions/" },
  { label: "Refund & Replacement Policy", href: "https://subrata.fedardokan.com/refund-policy/" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline">
      <div className="shell grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-24">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-mist">{site.name}</p>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-dim">
            Graphic Designer · Visual Designer · Visualizer
          </p>
          <p className="mt-6 text-sm leading-relaxed text-mute">
            {site.location}<br />
            Remote & Worldwide Collaboration
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => {
              const Icon = brandIcon[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass grid size-10 place-items-center rounded-full text-mute transition-colors hover:text-cyan-soft"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Site">
          <p className="hud mb-5">The Entity</p>
          <ul className="space-y-3">
            <li><Link href="/about" className="footer-link">About Subrata Mohajan</Link></li>
            <li><Link href="/case-studies/carvendors-led-billboard" className="footer-link">Case Study — CarVendors</Link></li>
            <li><Link href="/case-studies/biqolpo-brand-identity" className="footer-link">Case Study — Biqolpo</Link></li>
            <li><Link href="/contact" className="footer-link">Remote Collaboration & Hire</Link></li>
            {legacyLinks.slice(0, 2).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="footer-link inline-flex items-center gap-1.5">
                  {l.label} <IconArrowUpRight size={12} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <p className="hud mb-5">Legal & Legacy</p>
          <ul className="space-y-3">
            {legacyLinks.slice(2).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="footer-link inline-flex items-center gap-1.5">
                  {l.label} <IconArrowUpRight size={12} />
                </a>
              </li>
            ))}
            <li>
              <a href="https://gravatar.com/subratamohajan" target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-1.5">
                Verified Gravatar <IconArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Core services">
          <p className="hud mb-5">Core Services</p>
          <ul className="space-y-3">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link href={`/contact?topic=${encodeURIComponent(s)}`} className="footer-link">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-hairline">
        <div className="shell flex flex-col gap-3 py-7 text-[13px] text-dim md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-display font-semibold tracking-wide text-mute">Designed with intention, typography & restraint.</p>
          <a href="#top" className="footer-link inline-flex items-center gap-1.5 md:order-first">
            Back to Top ↑
          </a>
        </div>
        <div className="shell pb-8">
          <p className="max-w-3xl text-[12px] leading-relaxed text-dim/80">
            Unauthorized reproduction, distribution, scraping, or commercial reuse of this portfolio&apos;s
            source code, typography system, or visual case studies is strictly prohibited under
            international copyright law.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat on WhatsApp — fast reply typically within one hour"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#052e1a] opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-[#052e1a]" />
      </span>
      <span className="hidden sm:inline">Direct WhatsApp ↗ — Fast reply typically in &lt; 1 hour</span>
      <span className="sm:hidden">Fast reply &lt; 1h</span>
    </a>
  );
}

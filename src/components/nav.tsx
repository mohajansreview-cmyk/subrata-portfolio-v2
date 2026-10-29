"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/content";
import { IconMenu, IconWhatsApp, IconX } from "@/components/icons";
import { Magnetic } from "@/components/motion";

const links = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/case-studies/carvendors-led-billboard", label: "Case Study 01" },
  { href: "/case-studies/biqolpo-brand-identity", label: "Case Study 02" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="nav-shell" data-scrolled={scrolled}>
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Subrata Mohajan — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/favicon.svg" alt="" width={30} height={30} className="rounded-[8px]" />
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold tracking-tight text-mist">Subrata Mohajan</span>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-dim">
              Graphic Designer & Visualizer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="glass hidden items-center gap-2 rounded-full px-3.5 py-1.5 md:inline-flex" title={`${site.location} · ${site.timezone}`}>
            <span className="pulse-dot" />
            <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-status">ONLINE · {site.timezone}</span>
          </span>
          <Magnetic className="hidden md:inline-flex">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2.5 !px-5 text-[13.5px]">
              <IconWhatsApp size={15} /> Let&apos;s Talk
            </a>
          </Magnetic>
          <button
            className="glass grid size-10 place-items-center rounded-full text-mist lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <IconX size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-[72px] z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`glass-strong absolute inset-x-4 top-4 rounded-[20px] p-6 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
          aria-label="Mobile"
        >
          <p className="hud mb-4">Navigation — Chattogram · Remote</p>
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-hairline last:border-0">
                <Link
                  href={l.href}
                  className="flex items-center justify-between py-4 font-display text-lg font-semibold text-mist"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {l.label}
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-dim">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6 w-full justify-center">
            <IconWhatsApp size={16} /> Chat on WhatsApp ({site.whatsappNumber})
          </a>
        </nav>
      </div>
    </header>
  );
}

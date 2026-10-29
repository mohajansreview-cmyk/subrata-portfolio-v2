import { faqs, projects, services, site } from "@/lib/content";

/** GET /llms.txt — machine-readable site summary for AI crawlers. */
export function GET() {
  const body = `# ${site.name}

> ${site.title} based in ${site.location}, working remotely worldwide. ${site.experience} specializing in brand identity systems, large-format outdoor LED billboards (DOOH), packaging, and commercial visual direction.

## Contact
- WhatsApp: ${site.whatsappNumber} (fast replies, typically < 1 hour)
- Email: ${site.email}
- Location: ${site.location} (${site.timezone})

## Services
${services.map((s) => `- **${s.name}** — ${s.desc}`).join("\n")}

## Selected Work
${projects
  .map(
    (p) => `### ${p.title}
- ${p.summary}
- Outcome: ${p.outcome}
- Case study: ${site.url}/case-studies/${p.slug}
- Behance: ${p.behance}`
  )
  .join("\n\n")}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Pages
- ${site.url} (home)
- ${site.url}/about
- ${site.url}/contact
- ${site.url}/case-studies/carvendors-led-billboard
- ${site.url}/case-studies/biqolpo-brand-identity
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

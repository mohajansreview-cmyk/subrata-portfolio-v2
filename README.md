# Subrata Mohajan — Portfolio V2

The second generation of [subrata.fedardokan.com](https://subrata.fedardokan.com): a full-stack
portfolio for Subrata Mohajan, Graphic Designer & Brand Visualizer (Chattogram, Bangladesh ·
remote worldwide), rebuilt on Next.js 16 and deployed on Vercel.

## Stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router, React 19, TypeScript) |
| Styling    | Tailwind CSS v4 + hand-tuned design tokens (`src/app/globals.css`) |
| Fonts      | Space Grotesk (display) + Plus Jakarta Sans (body), self-hosted via `next/font` |
| Backend    | Vercel serverless routes: `POST /api/contact`, `GET /api/health` |
| Analytics  | Vercel Web Analytics + Speed Insights (zero-config) |
| Deployment | Vercel (free `*.vercel.app` domain) ← GitHub `mohajansreview-cmyk/subrata-portfolio-v2` |

## Pages

- `/` — hero with aurora canvas, services marquee, selected work (CarVendors LED billboard,
  Biqolpo brand identity), interactive design lab, design principles, testimonials, guides, FAQ, contact
- `/about` — bio, 4 pillars of the Mohajan Visual System, toolchain
- `/contact` — project brief form + direct channels
- `/case-studies/carvendors-led-billboard`, `/case-studies/biqolpo-brand-identity`
- `/llms.txt`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — SEO/AI/PWA surface

## Automations (all environment-driven — nothing hardcoded)

1. **Project brief delivery** — the contact form validates, rate-limits (5/hour/IP), honeypot +
   time-trap checks, then delivers to Telegram via `sendMessage`. Fail-closed: unconfigured
   deployments return `503` instead of silently dropping messages.
2. **Uptime probe** — `GET /api/health` returns JSON status for UptimeRobot-style monitors.
3. **Web analytics + speed insights** — enabled by `@vercel/analytics` and `@vercel/speed-insights`
   the moment the project runs on Vercel.

## Environment variables

Set in Vercel → Project → Settings → Environment Variables (see `.env.example` for the list):

| Variable | Required | Purpose |
|----------|----------|---------|
| `TELEGRAM_BOT_TOKEN` | for the form | Bot that receives project briefs |
| `TELEGRAM_CHAT_ID` | for the form | Chat that receives project briefs |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL used by metadata, sitemap, robots |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (optional locally)
npm run dev                  # http://localhost:3000
npm run build                # production build check
```

## Design system

Deep navy `#030816` base, electric cyan accent, satin-gold reserved for verified-outcome badges.
4px spacing grid, 1280px column, `clamp()` display type, WCAG AA contrast, film-grain texture,
aurora hero canvas with reduced-motion fallback, magnetic CTAs, 3D-tilt work cards, custom
desktop cursor with VIEW mode. All motion respects `prefers-reduced-motion`.

## Security notes

- All secrets live in environment variables — never in the repo.
- Security headers (`next.config.ts`): HSTS, `X-Frame-Options: DENY`, nosniff, strict referrer,
  permissions policy, CSP in report-only mode (flip to enforcing after reviewing reports).
- `/api/*` routes set `Cache-Control: no-store` and are excluded from `robots.txt`.

© Subrata Mohajan. Proprietary code & design system.

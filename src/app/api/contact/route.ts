import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendBriefToTelegram, telegramConfigured } from "@/lib/telegram";
import { contactTopics } from "@/lib/content";

export const runtime = "nodejs";

/**
 * POST /api/contact — receives a project brief and delivers it to Subrata
 * via Telegram. Fail-closed: if the notification channel is not configured
 * the API says so instead of silently swallowing the message.
 *
 * Defenses: strict field validation, honeypot field, time-trap (submitting
 * faster than a human can read the form is rejected), per-IP rate limit.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_SUBMIT_MS = 2500;
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 2000;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  // Rate limit: 5 briefs per hour per IP
  const ip = clientIp(request.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts — please try again shortly or reach me on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: false, error: "Submission rejected." }, { status: 400 });
  }

  // Time-trap: form must have been on screen for at least a couple of seconds
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsedMs < MIN_SUBMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "That was too fast — take a moment and try again." },
      { status: 400 }
    );
  }

  const name = str(body.name, MAX_NAME);
  const email = str(body.email, MAX_EMAIL);
  const message = str(body.message, MAX_MESSAGE);
  const topic = str(body.topic, 60);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Name is required.";
  if (!EMAIL_RE.test(email)) errors.email = "A valid email is required.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (!contactTopics.includes(topic as (typeof contactTopics)[number])) errors.topic = "Pick a topic.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Validation failed.", errors }, { status: 422 });
  }

  if (!telegramConfigured()) {
    return NextResponse.json(
      { ok: false, code: "not_configured", error: "Contact delivery is not configured on this deployment." },
      { status: 503 }
    );
  }

  const result = await sendBriefToTelegram(
    { name, email, topic, message },
    {
      ip,
      userAgent: request.headers.get("user-agent") ?? "unknown",
      referrer: request.headers.get("referer") ?? "",
    }
  );

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Your message couldn't be delivered. WhatsApp or email will reach me instantly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

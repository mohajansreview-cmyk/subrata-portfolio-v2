/**
 * In-memory sliding-window rate limiter.
 *
 * Honest limitation: Vercel functions are per-instance, so this caps abuse
 * per warm instance rather than globally. It stops casual spam and burst
 * abuse; for a hard global cap, add Upstash Redis (single env var swap).
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

// Periodic sweep so the map never grows unbounded on long-lived instances.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 10 * 60 * 1000) return;
  lastSweep = now;
  for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
}

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);
  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

export function clientIp(headers: Headers): string {
  // On Vercel, x-forwarded-for is set by the edge and cannot be spoofed.
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

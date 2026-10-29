/**
 * Telegram notification — the delivery channel for contact-form briefs.
 * Credentials come exclusively from environment variables
 * (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) — never hardcoded.
 * Tokens are truncated in any value returned to the client.
 */

const API_BASE = "https://api.telegram.org";

export function telegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export type Brief = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export async function sendBriefToTelegram(
  brief: Brief,
  meta: { ip: string; userAgent: string; referrer: string }
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: "not_configured" };

  const now = new Date();
  const text = [
    `📮 <b>New Project Brief — Portfolio V2</b>`,
    ``,
    `<b>Topic:</b> ${escapeHtml(brief.topic)}`,
    `<b>Name:</b> ${escapeHtml(brief.name)}`,
    `<b>Email:</b> ${escapeHtml(brief.email)}`,
    ``,
    `<b>Brief:</b>`,
    escapeHtml(brief.message),
    ``,
    `<i>— ${now.toISOString()} · ${escapeHtml(meta.ip)} · ${escapeHtml(meta.referrer || "direct")}</i>`,
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[contact] telegram sendMessage failed: ${res.status} ${body.slice(0, 300)}`);
      return { ok: false, error: "delivery_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] telegram sendMessage error:", err instanceof Error ? err.message : err);
    return { ok: false, error: "delivery_failed" };
  } finally {
    clearTimeout(timeout);
  }
}

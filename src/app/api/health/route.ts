import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/health — uptime probe endpoint (for UptimeRobot / cron checks). */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "subrata-portfolio-v2",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

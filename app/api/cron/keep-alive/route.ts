import { prisma } from "@/lib/db";

// Never cache — the point is to actually hit Postgres every run.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

/* =========================================
   GET → daily keep-alive ping

   Vercel Cron calls this once a day so the
   Supabase free-tier project never hits the
   7-day inactivity pause.
========================================= */
export async function GET(request: Request) {
  // Vercel Cron sends: Authorization: Bearer <CRON_SECRET>
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  }

  try {
    const [skills, projects] = await Promise.all([
      prisma.skills.count(),
      prisma.project.count(),
    ]);

    return new Response(
      JSON.stringify({
        ok: true,
        skills,
        projects,
        pingedAt: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/cron/keep-alive error:", error);
    return new Response(
      JSON.stringify({ ok: false, message: "Keep-alive query failed" }),
      { status: 500 }
    );
  }
}

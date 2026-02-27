import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const views = await prisma.page_views.findMany({
      orderBy: { created_at: "desc" },
    });

    const serialized = views.map(v => ({
      id: v.id.toString(),
      path: v.path,
      ip: v.ip,
      created_at: v.created_at?.toISOString(),
    }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/page-views error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch page views" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // 1. Get the latest CV info from the database
    // (In a real app, replace BigInt(1) with session logic)
    const user = await prisma.user.findUnique({
      where: { id: BigInt(1) },
      select: { cv_url: true, cv_name: true },
    });

    if (!user || !user.cv_url) {
      return new Response(JSON.stringify({ error: "No CV found" }), { status: 404 });
    }

    // 2. Fetch the file from the Supabase public URL
    const response = await fetch(user.cv_url);
    if (!response.ok) throw new Error("Failed to fetch file from storage");

    const fileBuffer = await response.arrayBuffer();
    const fileName = user.cv_name || "portfolio-cv.pdf";

    // 3. Return the file with download headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // 'attachment' forces the browser to download the file
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error("CV Download error:", err);
    return new Response(JSON.stringify({ error: "Failed to download CV" }), {
      status: 500,
    });
  }
}
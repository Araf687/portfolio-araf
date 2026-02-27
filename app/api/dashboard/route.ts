import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Execute all count queries in parallel
    const [
      projectCount,
      skillsCount,
      messageCount,
      recentMessages,
      featuredProjects,
      totalViews
    ] = await prisma.$transaction([
      prisma.project.count(),
      prisma.skills.count(),
      prisma.contact_msg.count(),
      prisma.contact_msg.findMany({
        take: 5,
        orderBy: { created_at: "desc" },
      }),
      prisma.project.findMany({
        where: { is_featured: true },
        select: { id: true, title: true, thumbnail: true },
        take: 3
      }),
      prisma.page_views.count()
    ]);

    // Construct the dashboard data object
    const dashboardData = {
      stats: [
        { label: "Total Projects", value: projectCount, color: "blue" },
        { label: "Tech Skills", value: skillsCount, color: "green" },
        { label: "Inquiries", value: messageCount, color: "purple" },
        { label: "Total Page Views", value: totalViews, color: "orange" },
      ],
      recentMessages: recentMessages.map(msg => ({
        ...msg,
        id: msg.id.toString(), // Convert BigInt to String
      })),
      featuredProjects: featuredProjects.map(p => ({
        ...p,
        id: p.id.toString(),
      })),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
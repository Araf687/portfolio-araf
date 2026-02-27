import { prisma } from "@/lib/db";

interface ContactMsgBody {
  name: string;
  email: string;
  message?: string;
}

export async function GET() {
  try {
    const messages = await prisma.contact_msg.findMany({
      orderBy: { created_at: "desc" },
    });

    // Serialize BigInt & Date
    const serialized = messages.map(msg => ({
      id: msg.id.toString(),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      created_at: msg.created_at.toISOString(),
    }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/contact error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch contact messages" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: ContactMsgBody = await request.json();

    if (!body.name || !body.email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newMsg = await prisma.contact_msg.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message || null,
      },
    });

    return new Response(
      JSON.stringify({
        id: newMsg.id.toString(),
        name: newMsg.name,
        email: newMsg.email,
        message: newMsg.message,
        created_at: newMsg.created_at.toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create contact message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

import { prisma } from "@/lib/db";
import { uploadFileToSupabase } from "@/utils/fileupload";


export async function GET() {
  try {
    // normally userId session / token থেকে আসবে
    const userId = BigInt(1); // demo

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        cv_url: true,
        cv_name: true,
        cv_updated_at: true,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch CV" }), {
      status: 500,
    });
  }
}


export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "CV file is required" }), {
        status: 400,
      });
    }

    // 🔐 normally session / token থেকে আসবে
    const userId = BigInt(1);

    // 📤 upload (NO folder, same cvs bucket)
    const cvUrl = await uploadFileToSupabase(
      file,
      null,   // 🔥 no folder
      "cvs"
    );

    // 📝 update user CV info
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        cv_url: cvUrl,
        cv_name: file.name,
        cv_updated_at: new Date(),
      },
      select: {
        id: true,
        cv_url: true,
        cv_name: true,
        cv_updated_at: true,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PUT /api/cv error:", err);
    return new Response(JSON.stringify({ error: "Failed to upload CV" }), {
      status: 500,
    });
  }
}


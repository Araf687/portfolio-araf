import { prisma } from "@/lib/db";
import { supabase } from "@/lib/superbas-client";
import { uploadFileToSupabase } from "@/utils/fileupload";


/* ===========================
   Serialization
=========================== */
function serializeSkill(skill: any) {
  return {
    id: skill.id.toString(),
    created_at: skill.created_at.toISOString(),
    name: skill.name,
    category: skill.category,
    image_url: skill.image_url,
  };
}

/* ===========================
   Helper: extract storage path
=========================== */
function extractPathFromUrl(url: string) {
  const marker = "/object/public/skill-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

/* =========================
   GET → fetch all skills
========================= */
export async function GET() {
  try {
    const skills = await prisma.skills.findMany({
      orderBy: { created_at: "desc" },
    });

    return new Response(JSON.stringify(skills.map(serializeSkill)), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch skills" }),
      { status: 500 }
    );
  }
}

/* =========================
   POST → create skill
   (with image upload)
========================= */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    console.log(imageFile)

    if (imageFile) {
      imageUrl = await uploadFileToSupabase(
        imageFile,
        "",
        "skill-images"
      );
    }


    const skill = await prisma.skills.create({
      data: {
        name,
        category,
        image_url: imageUrl,
      },
    });

    return new Response(JSON.stringify(serializeSkill(skill)), {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create skill" }),
      { status: 500 }
    );
  }
}

/* =========================
   PUT → update skill
   (replace image if given)
========================= */
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Skill id is required" }),
        { status: 400 }
      );
    }

    const skillId = BigInt(id);

    const existingSkill = await prisma.skills.findUnique({
      where: { id: skillId },
    });

    if (!existingSkill) {
      return new Response(
        JSON.stringify({ message: "Skill not found" }),
        { status: 404 }
      );
    }

    let imageUrl = existingSkill.image_url;

    // replace image
    if (imageFile) {
      // delete old image
      if (existingSkill.image_url) {
        const oldPath = extractPathFromUrl(existingSkill.image_url);
        if (oldPath) {
          await supabase.storage
            .from("skill-images")
            .remove([oldPath]);
        }
      }

      imageUrl = await uploadFileToSupabase(
        imageFile,
        "",
        "skill-images"
      );
    }

    const updatedSkill = await prisma.skills.update({
      where: { id: skillId },
      data: {
        name,
        category,
        image_url: imageUrl,
      },
    });

    return new Response(JSON.stringify(serializeSkill(updatedSkill)), {
      status: 200,
    });
  } catch (error) {
    console.error("PUT /api/skills error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update skill" }),
      { status: 500 }
    );
  }
}

/* =========================
   DELETE → delete skill
   (DB + Storage safe)
========================= */
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Skill id is required" }),
        { status: 400 }
      );
    }

    const skillId = BigInt(id);

    const skill = await prisma.skills.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      return new Response(
        JSON.stringify({ message: "Skill not found" }),
        { status: 404 }
      );
    }

    /* 1️⃣ Delete image from storage */
    if (skill.image_url) {
      const path = extractPathFromUrl(skill.image_url);
      if (path) {
        await supabase.storage
          .from("skill-images")
          .remove([path]);
      }
    }

    /* 2️⃣ Delete relations + skill */
    await prisma.$transaction(async (tx) => {
      await tx.projectSkill.deleteMany({
        where: { skillId },
      });

      await tx.skills.delete({
        where: { id: skillId },
      });
    });

    return new Response(
      JSON.stringify({ success: true, deletedSkillId: id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/skills error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete skill" }),
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/db";

import crypto from "crypto";
import { uploadFileToSupabase } from "@/utils/fileupload";
import { supabase } from "@/lib/superbas-client";

/* ===========================
   Serialization
=========================== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeProject(project: any) {
  return {
    id: project.id.toString(),
    created_at: project.created_at.toISOString(),
    title: project.title,
    description: project.description,
    github_url: project.github_url,
    live_url: project.live_url,
    is_featured: project.is_featured,
    thumbnail: project.thumbnail,
    category: project.category,
    // Serialize images
    images: project.images
      ? project.images.map((img: { id: number; url: string }) => ({
          id: img.id.toString(),
          url: img.url,
        }))
      : [],
    // Serialize skills
    skills: project.skills
      ? project.skills.map(
          (ps: {
            projectId: number;
            skillId: number;
            skill: {
              id: number;
              name: string;
              category: string;
              image_url: string;
            };
          }) => ({
            projectId: ps.projectId.toString(),
            skillId: ps.skillId.toString(),
            skill: {
              id: ps.skill.id.toString(),
              name: ps.skill.name,
              category: ps.skill.category,
              image_url: ps.skill.image_url,
            },
          }),
        )
      : [],
  };
}

/* ===========================
   GET: Fetch all projects
=========================== */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        skills: { include: { skill: true } },
        images: true,
      },
    });

    const serializedProjects = projects.map(serializeProject);

    return new Response(JSON.stringify(serializedProjects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/project error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* ===========================
   POST: Create new project
=========================== */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const github_url = (formData.get("github_url") as string) || null;
    const live_url = (formData.get("live_url") as string) || null;
    const is_featured = formData.get("is_featured") === "true";
    const category = formData.get("category") as "web" | "app";
    const skills = formData.getAll("skills") as string[];

    const thumbnailFile = formData.get("thumbnail") as File | null;
    const imageFiles = formData.getAll("images") as File[];

    const firstWord = title.split(" ")[0].toLowerCase();
    const uid = crypto.randomBytes(2).toString("hex");
    const folderName = `${firstWord}-${uid}`;

    // 1️⃣ Upload thumbnail
    let thumbnailUrl: string | null = null;
    if (thumbnailFile) {
      thumbnailUrl = await uploadFileToSupabase(
        thumbnailFile,
        folderName,
        "project-images",
      );
    }

    // 2️⃣ Create project in DB
    const project = await prisma.project.create({
      data: {
        title,
        description,
        github_url,
        live_url,
        is_featured,
        category,
        thumbnail: thumbnailUrl,
        skills: skills.length
          ? {
              create: skills.map((skillId) => ({
                skill: { connect: { id: BigInt(skillId) } },
              })),
            }
          : undefined,
      },
    });

    console.log("uploadFileToSupabase", imageFiles);
    // 3️⃣ Upload gallery images
    if (imageFiles.length > 0) {
      const imageRecords: { projectId: bigint; url: string }[] = [];
      for (const imgFile of imageFiles) {
        const url = await uploadFileToSupabase(
          imgFile,
          folderName,
          "project-images",
        );
        console.log("url", url);
        imageRecords.push({ projectId: project.id, url });
      }
      console.log(imageRecords, "imageRecords");
      await prisma.images.createMany({ data: imageRecords });
    }

    // 4️⃣ Fetch project with skills & images
    const createdProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: { skills: { include: { skill: true } }, images: true },
    });

    return new Response(JSON.stringify(serializeProject(createdProject)), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/project error:", err);
    return new Response(JSON.stringify({ error: "Failed to create project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* ===========================
   PUT: Update project
=========================== */
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = BigInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    
    // 1. Handle Thumbnail Update
    const newThumbnailFile = formData.get("thumbnail") as File | null;
    let thumbnailUrl: string | undefined;

    if (newThumbnailFile) {
      const currentProject = await prisma.project.findUnique({ where: { id } });
      if (currentProject?.thumbnail) {
        const oldThumbPath = extractPathFromUrl(currentProject.thumbnail);
        if (oldThumbPath) await supabase.storage.from("project-images").remove([oldThumbPath]);
      }
      const folder = `${title.split(" ")[0].toLowerCase()}-${id}`;
      thumbnailUrl = await uploadFileToSupabase(newThumbnailFile, folder, "project-images");
    }

    // 2. Handle Image Deletions
    const deletedImagesRaw = formData.get("deletedImages") as string | null;
    if (deletedImagesRaw) {
      const deletedImages = JSON.parse(deletedImagesRaw);
      const paths = deletedImages.map((img: {url: string}) => extractPathFromUrl(img.url)).filter(Boolean);
      
      if (paths.length > 0) {
        await supabase.storage.from("project-images").remove(paths);
      }
      
      await prisma.images.deleteMany({
        where: { id: { in: deletedImages.map((img: {id: string}) => BigInt(img.id)) } }
      });
    }

    // 3. Handle New Image Uploads
    const newFiles = formData.getAll("images") as File[];
    if (newFiles.length > 0) {
      const folder = `${title.split(" ")[0].toLowerCase()}-${id}`;
      const imageRecords = [];
      for (const file of newFiles) {
        const url = await uploadFileToSupabase(file, folder, "project-images");
        imageRecords.push({ projectId: id, url });
      }
      await prisma.images.createMany({ data: imageRecords });
    }

    // 4. Update Main Project Data & Skills
    const skills = formData.getAll("skills");
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        description: formData.get("description") as string,
        github_url: formData.get("github_url") as string,
        live_url: formData.get("live_url") as string,
        is_featured: formData.get("is_featured") === "true",
        category: formData.get("category") as string,
        ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
        skills: {
          deleteMany: {}, // Wipe existing relationships
          create: skills.map((skillId) => ({
            skill: { connect: { id: BigInt(skillId as string) } },
          })),
        },
      },
      include: { skills: { include: { skill: true } }, images: true },
    });

    return new Response(JSON.stringify(serializeProject(updated)), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}

export async function GET_SINGLE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return new Response(JSON.stringify({ error: "Project ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: BigInt(idParam) },
      include: {
        skills: { include: { skill: true } },
        images: true,
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(serializeProject(project)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET_SINGLE /api/project error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch project" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* ===========================
   Helper: extract storage path
=========================== */
function extractPathFromUrl(url: string) {
  const marker = "/object/public/project-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

/* ===========================
   DELETE: Delete project
=========================== */
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "Project ID is required" }), {
        status: 400,
      });
    }

    const projectId = BigInt(id);

    /* 1️⃣ Fetch project with images BEFORE deleting */
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    /* 2️⃣ Collect storage paths */
    const pathsToDelete: string[] = [];

    // gallery images
    for (const img of project.images) {
      if (!img.url) continue; // 🔑 guard
      const path = extractPathFromUrl(img.url);
      if (path) pathsToDelete.push(path);
    }

    // thumbnail
    if (project.thumbnail) {
      const thumbPath = extractPathFromUrl(project.thumbnail);
      if (thumbPath) pathsToDelete.push(thumbPath);
    }

    /* 3️⃣ Delete from Supabase Storage */
    if (pathsToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("project-images")
        .remove(pathsToDelete);

      if (storageError) {
        console.error("Storage delete error:", storageError);
        throw new Error("Failed to delete images from storage");
      }
    }

    /* 4️⃣ Delete from DB (transaction) */
    const deletedProject = await prisma.$transaction(async (tx) => {
      await tx.images.deleteMany({
        where: { projectId },
      });

      await tx.projectSkill.deleteMany({
        where: { projectId },
      });

      return tx.project.delete({
        where: { id: projectId },
      });
    });

    return new Response(
      JSON.stringify({
        success: true,
        deletedProjectId: deletedProject.id.toString(),
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("DELETE /api/project error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete project" }), {
      status: 500,
    });
  }
}

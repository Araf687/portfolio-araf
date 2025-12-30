import { prisma } from "@/lib/db";

function serializeProject(project: any) {
  return {
    ...project,
    id: project.id.toString(), // BigInt → string
  };
}

export async function GET() {
  const projects = await prisma.project.findMany();
  const serializedProjects = projects.map(serializeProject);
  return Response.json(serializedProjects, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  const project = await prisma.project.create({ data });
  return Response.json(serializeProject(project), { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...rest } = await request.json();
  const project = await prisma.project.update({
    where: { id: BigInt(id) }, // ensure id is BigInt
    data: rest,
  });
  return Response.json(serializeProject(project));
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const deleted = await prisma.project.delete({
    where: { id: BigInt(id) }, // ensure id is BigInt
  });
  return Response.json(serializeProject(deleted));
}

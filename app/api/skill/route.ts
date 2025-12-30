import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function serializeSkill(skill: any) {
  return {
    ...skill,
    id: skill.id.toString(), // BigInt → string
  };
}

// GET → fetch all skills
export async function GET() {
      console.log("skill");
  const skills = await prisma.skills.findMany();

  return NextResponse.json(skills.map(serializeSkill));
}

// POST → create skill
export async function POST(request: Request) {
  const data = await request.json();
  const skill = await prisma.skills.create({ data });
  return NextResponse.json(serializeSkill(skill), { status: 201 });
}

// PUT → update skill
export async function PUT(request: Request) {
  const { id, ...rest } = await request.json();
  const skill = await prisma.skills.update({
    where: { id: BigInt(id) },
    data: rest,
  });
  return NextResponse.json(serializeSkill(skill));
}

// DELETE → delete skill
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const deleted = await prisma.skills.delete({ where: { id: BigInt(id) } });
  return NextResponse.json(serializeSkill(deleted));
}

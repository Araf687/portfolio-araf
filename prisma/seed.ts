import { prisma } from "@/lib/db";



const skillsData = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
];

const projectsData = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with Next.js, Prisma & Supabase",
    github_url: "https://github.com/araf/portfolio-araf",
    live_url: "https://portfolio-araf.vercel.app",
    is_featured: true,
    thumbnail: "/images/portfolio-thumb.png",
    images: "/images/portfolio-1.png,/images/portfolio-2.png",
  },
];

const contactMessageData = {
  name: "Test User",
  email: "test@example.com",
  message: "Hello! This is a seeded contact message.",
};

/* -------------------------------------------------------------------------- */
/*                               Seed Logic                                   */
/* -------------------------------------------------------------------------- */

async function seedSkills() {
  console.log("🔹 Seeding skills...");
  await prisma.skills.createMany({
    data: skillsData,
    skipDuplicates: true,
  });
}

async function seedProjects() {
  console.log("🔹 Seeding projects...");
  // for (const project of projectsData) {
  //   await prisma.project.create({
    
  //     data: project,
  //   });
  // }
}

async function seedContactMessage() {
  console.log("🔹 Seeding contact messages...");
  await prisma.contact_msg.create({
    data: contactMessageData,
  });
}

async function seedPageView() {
  console.log("🔹 Seeding page views...");
  await prisma.page_views.create({
    data: {
      ip: "127.0.0.1",
      path: "/",
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Main                                     */
/* -------------------------------------------------------------------------- */

async function main() {
  console.log("🌱 Starting database seed...\n");

  await seedSkills();
  await seedProjects();
  await seedContactMessage();
  await seedPageView();

  console.log("\n✅ Database seeding completed successfully!");
}

/* -------------------------------------------------------------------------- */
/*                                Execution                                   */
/* -------------------------------------------------------------------------- */

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

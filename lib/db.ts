import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prisma =
  global.__prisma__ ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV === "production") {
  global.__prisma__ = prisma;
}

export { prisma };

// -------------------
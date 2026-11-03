
import { defineConfig ,env} from "prisma/config";

// Prisma 7 no longer reads .env itself; hosts like Vercel inject env vars and have no .env file
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env('DATABASE_URL'),
    shadowDatabaseUrl: env('DIRECT_URL'),
  },
});

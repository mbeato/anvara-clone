import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env.local for Prisma CLI tooling (Next.js loads this automatically at runtime)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});

import "dotenv/config";
import { defineConfig } from "prisma/config";

const localDatabaseUrl = "postgresql://pickem:pickem@localhost:5432/pickem_engine";
const migrationDatabaseUrl =
  process.env["DIRECT_URL"] || process.env["DATABASE_URL"] || localDatabaseUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: migrationDatabaseUrl,
  },
});

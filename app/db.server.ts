import { PrismaNeon } from "@prisma/adapter-neon";
import { z } from "zod";
import { PrismaClient } from "../generated/prisma/client";

type DatabaseEnv = Record<string, string | undefined>;

const databaseEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .trim()
    .min(1)
    .refine(
      (value) => value.startsWith("postgres://") || value.startsWith("postgresql://"),
      "DATABASE_URL must be a Postgres connection string",
    ),
});

export function getDatabaseUrl(env: DatabaseEnv) {
  const result = databaseEnvSchema.safeParse(env);

  if (!result.success) {
    throw new Error("Database configuration is missing or invalid. Check DATABASE_URL.");
  }

  return result.data.DATABASE_URL;
}

export function createPrismaClient(env: DatabaseEnv) {
  const adapter = new PrismaNeon({
    connectionString: getDatabaseUrl(env),
  });

  return new PrismaClient({ adapter });
}

export type DbClient = ReturnType<typeof createPrismaClient>;

export function countMatchesForTournament(db: DbClient, tournamentId: string) {
  return db.match.count({
    where: {
      tournamentId,
    },
  });
}

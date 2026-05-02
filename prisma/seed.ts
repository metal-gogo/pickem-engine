import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { z } from "zod";
import { Prisma, PrismaClient } from "../generated/prisma-node/client";
import {
  buildWorldCup2026DatabaseSeed,
  summarizeWorldCup2026DatabaseSeed,
} from "../src/data/seeds/databaseSeed";

const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().trim().min(1).optional(),
  DIRECT_URL: z.string().trim().min(1).optional(),
});

function getSeedDatabaseUrl() {
  const result = databaseEnvSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error("Seed database configuration is invalid.");
  }

  const databaseUrl = result.data.DATABASE_URL || result.data.DIRECT_URL;

  if (!databaseUrl) {
    throw new Error("Set DATABASE_URL or DIRECT_URL before running the database seed.");
  }

  if (!databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("postgresql://")) {
    throw new Error("Seed database URL must be a Postgres connection string.");
  }

  return databaseUrl;
}

function createSeedClient() {
  const adapter = new PrismaNeon({
    connectionString: getSeedDatabaseUrl(),
  });

  return new PrismaClient({ adapter });
}

async function seedStaticTournamentData(db: PrismaClient) {
  const seed = buildWorldCup2026DatabaseSeed();

  await db.$transaction(async (tx) => {
    await tx.tournament.upsert({
      where: { id: seed.tournament.id },
      create: seed.tournament,
      update: {
        slug: seed.tournament.slug,
        name: seed.tournament.name,
        officialName: seed.tournament.officialName,
        startsOn: seed.tournament.startsOn,
        endsOn: seed.tournament.endsOn,
        pickLockAt: seed.tournament.pickLockAt,
        hostCountries: seed.tournament.hostCountries,
      },
    });

    for (const venue of seed.venues) {
      await tx.venue.upsert({
        where: { id: venue.id },
        create: venue,
        update: {
          city: venue.city,
          stadium: venue.stadium,
          country: venue.country,
          groundAliases: venue.groundAliases,
        },
      });
    }

    for (const team of seed.teams) {
      await tx.team.upsert({
        where: { id: team.id },
        create: team,
        update: {
          fifaCode: team.fifaCode,
          name: team.name,
          normalizedName: team.normalizedName,
          confederation: team.confederation,
          continent: team.continent,
          flagEmoji: team.flagEmoji,
          accentColors: team.accentColors,
        },
      });
    }

    for (const group of seed.groups) {
      await tx.tournamentGroup.upsert({
        where: { id: group.id },
        create: group,
        update: {
          tournamentId: group.tournamentId,
          code: group.code,
          name: group.name,
        },
      });
    }

    for (const tournamentTeam of seed.tournamentTeams) {
      await tx.tournamentTeam.upsert({
        where: {
          tournamentId_teamId: {
            tournamentId: tournamentTeam.tournamentId,
            teamId: tournamentTeam.teamId,
          },
        },
        create: tournamentTeam,
        update: {
          groupId: tournamentTeam.groupId,
          groupSeedOrder: tournamentTeam.groupSeedOrder,
          isHost: tournamentTeam.isHost,
          fifaRanking: tournamentTeam.fifaRanking,
          qualificationDate: tournamentTeam.qualificationDate,
          totalQualifications: tournamentTeam.totalQualifications,
          lastQualifiedYear: tournamentTeam.lastQualifiedYear,
          currentConsecutiveAppearances: tournamentTeam.currentConsecutiveAppearances,
          bestFinish: tournamentTeam.bestFinish,
          bestFinishYears: tournamentTeam.bestFinishYears,
        },
      });
    }

    for (const match of seed.matches) {
      await tx.match.upsert({
        where: { id: match.id },
        create: {
          id: match.id,
          tournamentId: match.tournamentId,
          matchNumber: match.matchNumber,
          stage: match.stage,
          roundLabel: match.roundLabel,
          kickoffAt: match.kickoffAt,
          venueId: match.venueId,
          groupId: match.groupId,
          homeTeamId: match.homeTeamId,
          awayTeamId: match.awayTeamId,
          homeParticipantSlot: match.homeParticipantSlot ?? Prisma.DbNull,
          awayParticipantSlot: match.awayParticipantSlot ?? Prisma.DbNull,
        },
        update: {
          tournamentId: match.tournamentId,
          matchNumber: match.matchNumber,
          stage: match.stage,
          roundLabel: match.roundLabel,
          kickoffAt: match.kickoffAt,
          venueId: match.venueId,
          groupId: match.groupId,
          homeTeamId: match.homeTeamId,
          awayTeamId: match.awayTeamId,
          homeParticipantSlot: match.homeParticipantSlot ?? Prisma.DbNull,
          awayParticipantSlot: match.awayParticipantSlot ?? Prisma.DbNull,
        },
      });
    }
  });

  return summarizeWorldCup2026DatabaseSeed(seed);
}

async function main() {
  const seed = buildWorldCup2026DatabaseSeed();
  const summary = summarizeWorldCup2026DatabaseSeed(seed);

  if (process.argv.includes("--dry-run")) {
    console.log("World Cup 2026 seed is valid.");
    console.table(summary);
    return;
  }

  const db = createSeedClient();

  try {
    const seededSummary = await seedStaticTournamentData(db);
    console.log("Seeded static World Cup 2026 tournament data.");
    console.table(seededSummary);
  } finally {
    await db.$disconnect();
  }
}

await main();

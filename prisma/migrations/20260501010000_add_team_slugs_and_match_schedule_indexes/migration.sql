-- AlterTable
ALTER TABLE "teams" ADD COLUMN "slug" TEXT;

UPDATE "teams" SET "slug" = "id" WHERE "slug" IS NULL;

ALTER TABLE "teams" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");

-- CreateIndex
CREATE INDEX "matches_kickoffAt_idx" ON "matches"("kickoffAt");

-- CreateIndex
CREATE INDEX "matches_venueId_idx" ON "matches"("venueId");

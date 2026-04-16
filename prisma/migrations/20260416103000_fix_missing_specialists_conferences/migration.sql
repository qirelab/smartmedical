-- Fix drift: some environments miss specialists.conferences
-- Make sure the column exists and matches Prisma schema (TEXT[] DEFAULT {}).

ALTER TABLE "specialists"
ADD COLUMN IF NOT EXISTS "conferences" TEXT[] DEFAULT ARRAY[]::TEXT[];


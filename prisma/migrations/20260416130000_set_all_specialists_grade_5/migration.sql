-- Set default rating for all specialists
UPDATE "specialists"
SET "grade" = 5
WHERE "grade" IS DISTINCT FROM 5;


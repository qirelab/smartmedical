-- Backfill specialists.service_category_id for rows inserted earlier when service categories might not exist yet.
-- Idempotent: only fills NULL values.

-- Dentistry
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Андрейчик Наталья Дмитриевна',
    'Малевич Ольга Владимировна',
    'Яцыно Андрей Васильевич',
    'Димитриев Александр Васильевич',
    'Наталевич Татьяна Вячеславовна',
    'Гончарова Анна Игоревна'
  );

-- Gynecology
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'gynecology' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Васильева Ирина Александровна',
    'Колик Анна Сергеевна',
    'Петкевич Оксана Петровна',
    'Прокопович Инесса Леонидовна'
  );

-- Ultrasound
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'ultrasound' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Баранов Сергей Всеволодович'
  );

-- Urology
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'urology' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Прокопович Александр Иванович'
  );

-- Neurology
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'neurology' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Ольха Инга Валерьевна',
    'Сосновик Светлана Николаевна'
  );

-- Dermatology
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dermatology' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Стариков Александр Александрович'
  );

-- Cardiology
UPDATE "specialists"
SET "service_category_id" = (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'cardiology' LIMIT 1)
WHERE "service_category_id" IS NULL
  AND "name" IN (
    'Черкасова Виктория Александровна'
  );


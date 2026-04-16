-- Add specialists from "Information we need from the client" (pages 40-58)
-- Idempotent inserts (skip if a row with same name+specialization exists).

-- Dentistry (dentistry)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Андрейчик Наталья Дмитриевна',
  'Врач-стоматолог-терапевт',
  'Высшая квалификационная категория',
  15,
  5,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Ранняя диагностика и малоинвазивное лечение поражений твердых тканей зуба», 2021',
    'ПК «Альтернативные методы лечения заболеваний зубов», 2022'
  ]::TEXT[],
  ARRAY[
    'Терапевтическая стоматология',
    'Диагностика и составление плана лечения',
    'Лечение кариеса',
    'Профессиональная гигиена полости рта и профилактика кариеса',
    'Эстетическая реставрация зубов',
    'Эндодонтическое лечение (в т.ч. с микроскопом)'
  ]::TEXT[],
  ARRAY[
    'Белорусский государственный медицинский университет, 2010'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Андрейчик Наталья Дмитриевна'
    AND s."specialization" = 'Врач-стоматолог-терапевт'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Малевич Ольга Владимировна',
  'Врач-стоматолог-терапевт',
  '1-я квалификационная категория',
  29,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Актуальные вопросы терапевтической стоматологии», 2001',
    'ПК «Технологии и материалы в эндодонтическом лечении», 2013'
  ]::TEXT[],
  ARRAY[
    'Консультация',
    'Лечение кариеса и его осложнений',
    'Эстетическая реставрация',
    'Профессиональная гигиена полости рта',
    'Лечение травм зуба с динамическим наблюдением'
  ]::TEXT[],
  ARRAY[
    'Минский государственный медицинский институт, 1996'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Малевич Ольга Владимировна'
    AND s."specialization" = 'Врач-стоматолог-терапевт'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Яцыно Андрей Васильевич',
  'Врач-стоматолог-ортопед',
  '1-я квалификационная категория',
  30,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Адгезивная фиксация эстетических конструкций», 2018',
    'ПК «Реабилитация пациентов с использованием дентальной имплантации», 2022'
  ]::TEXT[],
  ARRAY[
    'Протезирование',
    'Временные коронки',
    'Цифровое протезирование',
    'Виниры',
    'Коронки из диоксида циркония',
    'Протезирование на имплантах'
  ]::TEXT[],
  ARRAY[
    'Минский государственный медицинский институт, 1995'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Яцыно Андрей Васильевич'
    AND s."specialization" = 'Врач-стоматолог-ортопед'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Димитриев Александр Васильевич',
  'Врач-стоматолог-ортопед',
  '1-я квалификационная категория',
  15,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Ортопедические, ортодонтические и хирургические мероприятия в комплексном лечении болезней периодонта», 2023',
    'ПК «Лечение пациентов с применением дентальных имплантов», 2024'
  ]::TEXT[],
  ARRAY[
    'Протезирование',
    'Цифровое протезирование',
    'Виниры',
    'Коронки из диоксида циркония',
    'Протезирование на имплантах'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 2010'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Димитриев Александр Васильевич'
    AND s."specialization" = 'Врач-стоматолог-ортопед'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Наталевич Татьяна Вячеславовна',
  'Врач-стоматолог-ортодонт',
  '1-я квалификационная категория',
  10,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'Клиническая ординатура по специальности «Ортодонтия», 2023',
    'ПК «Ортодонтическое лечение пациентов с зубочелюстными аномалиями…», 2025'
  ]::TEXT[],
  ARRAY[
    'Ортодонтическое лечение детей и взрослых',
    'Лечение на съемных и несъемных аппаратах',
    'Самолигирующие и лигатурные брекет-системы',
    'Элайнеры',
    'Минивинты (скелетная опора)'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 2015'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Наталевич Татьяна Вячеславовна'
    AND s."specialization" = 'Врач-стоматолог-ортодонт'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dentistry' LIMIT 1),
  'Гончарова Анна Игоревна',
  'Стоматолог-хирург',
  '1-я квалификационная категория',
  14,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Хирургический этап дентальной имплантации…», 2014',
    'ПК «Основы дентальной имплантации», 2017'
  ]::TEXT[],
  ARRAY[
    'Имплантация',
    'Одномоментная дентальная имплантация',
    'All-on-4/6',
    'Синус-лифтинг',
    'Удаление зубов различной сложности',
    'Удаление зубов мудрости',
    'Пластика десны'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 2011'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Гончарова Анна Игоревна'
    AND s."specialization" = 'Стоматолог-хирург'
);

-- Gynecology (gynecology)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'gynecology' LIMIT 1),
  'Васильева Ирина Александровна',
  'Врач-акушер-гинеколог',
  'Высшая квалификационная категория',
  29,
  5,
  '',
  NULL,
  NULL,
  ARRAY[
    'Переподготовка по специальности «Ультразвуковая диагностика», 2023',
    'ПК «Основы УЗ-диагностики и кольпоскопии в гинекологической практике», 2018'
  ]::TEXT[],
  ARRAY[
    'Профилактические осмотры и консультации',
    'Планирование семьи и подготовка к беременности',
    'Кольпоскопия, биопсия шейки матки, эксцизионные процедуры',
    'Введение/извлечение ВМС',
    'Полипэктомия цервикального канала',
    'УЗИ органов малого таза и молочных желез'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1996'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Васильева Ирина Александровна'
    AND s."specialization" = 'Врач-акушер-гинеколог'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'gynecology' LIMIT 1),
  'Колик Анна Сергеевна',
  'Врач-акушер-гинеколог',
  '2-я квалификационная категория',
  6,
  3,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Диагностика, лечение и профилактика воспалительных заболеваний… с курсом кольпоскопии», 2021',
    'ПК «Ультразвуковая диагностика в акушерстве и гинекологии», 2022'
  ]::TEXT[],
  ARRAY[
    'Профилактические осмотры',
    'Планирование семьи',
    'Кольпоскопия',
    'Введение/извлечение ВМС',
    'Эстетическая (инъекционная) гинекология'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 2019'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Колик Анна Сергеевна'
    AND s."specialization" = 'Врач-акушер-гинеколог'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'gynecology' LIMIT 1),
  'Петкевич Оксана Петровна',
  'Врач-акушер-гинеколог',
  '1-я квалификационная категория',
  27,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Патология шейки матки… Основы кольпоскопии», 2007',
    'Переподготовка по специальности «Ультразвуковая диагностика», 2017'
  ]::TEXT[],
  ARRAY[
    'Профилактические осмотры',
    'Кольпоскопия и лечение патологии шейки матки',
    'Контрацепция, ВМС',
    'УЗИ малого таза и молочных желез'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 1999'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Петкевич Оксана Петровна'
    AND s."specialization" = 'Врач-акушер-гинеколог'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'gynecology' LIMIT 1),
  'Прокопович Инесса Леонидовна',
  'Врач-акушер-гинеколог',
  '1-я квалификационная категория',
  37,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Ультразвуковое исследование в гинекологии и маммологии», 2007',
    'Переподготовка по специальности «Ультразвуковая диагностика», 2018'
  ]::TEXT[],
  ARRAY[
    'Профилактические осмотры',
    'Кольпоскопия',
    'Контрацепция, ВМС',
    'УЗИ малого таза и молочных желез'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1988'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Прокопович Инесса Леонидовна'
    AND s."specialization" = 'Врач-акушер-гинеколог'
);

-- Ultrasound (ultrasound)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'ultrasound' LIMIT 1),
  'Баранов Сергей Всеволодович',
  'Врач ультразвуковой диагностики',
  '1-я квалификационная категория',
  40,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'Переподготовка по специальности «Ультразвуковая диагностика», 2021'
  ]::TEXT[],
  ARRAY[
    'Прием взрослых и детей 0+',
    'УЗИ щитовидной железы',
    'УЗИ органов брюшной полости',
    'УЗИ молочных желез',
    'УЗИ сердца и сосудов (по показаниям)'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1984'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Баранов Сергей Всеволодович'
    AND s."specialization" = 'Врач ультразвуковой диагностики'
);

-- Urology (urology)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'urology' LIMIT 1),
  'Прокопович Александр Иванович',
  'Врач-уролог',
  'Высшая квалификационная категория',
  40,
  5,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Андрология», 2007',
    'ПК «Поликлиническая урология с основами ультразвуковой диагностики», 2016'
  ]::TEXT[],
  ARRAY[
    'Прием врача-уролога',
    'Диагностические манипуляции (в т.ч. массаж простаты, получение секрета)',
    'Урологические операции (пункция гидроцеле, электрорезекция полипа уретры и др.)',
    'УЗИ в урологии (почки, мочевой пузырь, простата, мошонка, трансректальное УЗИ)'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1982'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Прокопович Александр Иванович'
    AND s."specialization" = 'Врач-уролог'
);

-- Neurology (neurology)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'neurology' LIMIT 1),
  'Ольха Инга Валерьевна',
  'Врач-невролог',
  '1-я квалификационная категория',
  30,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Актуальные вопросы соматоневрологии», 2020',
    'ПК «УЗ-диагностика патологии брахиоцефальных сосудов», 2024'
  ]::TEXT[],
  ARRAY[
    'Консультация пациентов с неврологическими заболеваниями',
    'УЗИ брахиоцефальных сосудов (по показаниям)'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1995'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Ольха Инга Валерьевна'
    AND s."specialization" = 'Врач-невролог'
);

INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'neurology' LIMIT 1),
  'Сосновик Светлана Николаевна',
  'Врач-невролог',
  '1-я квалификационная категория',
  24,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Клинико-нейровизуализационная диагностика неврологических заболеваний», 2023',
    'ПК «Диагностика и лечение аутоиммунных заболеваний нервной системы», 2023'
  ]::TEXT[],
  ARRAY[
    'Прием пациентов с неврологическими заболеваниями',
    'Лечение неврологических заболеваний',
    'Выполнение лечебных блокад'
  ]::TEXT[],
  ARRAY[
    'Витебский государственный медицинский университет, 2001'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Сосновик Светлана Николаевна'
    AND s."specialization" = 'Врач-невролог'
);

-- Dermatology (dermatology)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'dermatology' LIMIT 1),
  'Стариков Александр Александрович',
  'Врач-дерматовенеролог',
  '1-я квалификационная категория',
  40,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Дерматовенерология», 2011',
    'ПК «Дерматоскопия и трихоскопия», 2022'
  ]::TEXT[],
  ARRAY[
    'Диагностика и лечение заболеваний кожи',
    'Дерматоскопия кожи',
    'Прием взрослых и детей 0+',
    'Профилактика и лечение ИППП'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1985'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Стариков Александр Александрович'
    AND s."specialization" = 'Врач-дерматовенеролог'
);

-- Cardiology (cardiology)
INSERT INTO "specialists" (
  "categori_id",
  "service_category_id",
  "name",
  "specialization",
  "qualification",
  "experience",
  "grade",
  "image_url",
  "activity_area",
  "education_details",
  "conferences",
  "specializations",
  "education",
  "work_examples"
)
SELECT
  NULL,
  (SELECT "service_category_id" FROM "service_categories" WHERE "slug" = 'cardiology' LIMIT 1),
  'Черкасова Виктория Александровна',
  'Врач-кардиолог',
  '1-я квалификационная категория',
  28,
  4,
  '',
  NULL,
  NULL,
  ARRAY[
    'ПК «Неотложные состояния и реанимация в кардиологии», 2018',
    'ПК «Эхокардиография», 2024'
  ]::TEXT[],
  ARRAY[
    'Диагностика сердечно-сосудистых заболеваний (ЭКГ, ЭхоКГ)',
    'Разработка плана лечения и наблюдение пациентов',
    'Рекомендации по образу жизни и профилактике'
  ]::TEXT[],
  ARRAY[
    'Витебский медицинский институт, 1997'
  ]::TEXT[],
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM "specialists" s
  WHERE s."name" = 'Черкасова Виктория Александровна'
    AND s."specialization" = 'Врач-кардиолог'
);


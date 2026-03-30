import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Полная структура категорий из SMServicesMenuData.json
const serviceCategories = [
  {
    name: 'Детская стоматология',
    slug: 'pediatric-dentistry',
    icon: 'Baby',
    order: 0,
    children: [
      { name: 'Детский хирург-стоматолог', slug: 'pediatric-surgeon', order: 0 },
      { name: 'Лечение молочных зубов', slug: 'milk-teeth-treatment', order: 1 },
      { name: 'Детский ортодонт', slug: 'pediatric-orthodontist', order: 2 },
      { name: 'Лечение молочных зубов под наркозом в Минске', slug: 'milk-teeth-anesthesia', order: 3 },
    ],
  },
  {
    name: 'Стоматология',
    slug: 'dentistry',
    icon: 'Smile',
    order: 1,
    children: [
      {
        name: 'Терапевтическая стоматология',
        slug: 'therapeutic-dentistry',
        order: 0,
        children: [
          { name: 'Отбеливание зубов Beyond Polus', slug: 'teeth-whitening', order: 0 },
          { name: 'Профессиональная чистка зубов Air Flow', slug: 'professional-cleaning', order: 1 },
          { name: 'Чистка зубов в Минске — ультразвуковая и профессиональная', slug: 'ultrasonic-cleaning', order: 2 },
          { name: 'Лечение пульпита в Минске — стоимость', slug: 'pulpitis-treatment', order: 3 },
          { name: 'Профессиональная гигиена полости рта', slug: 'oral-hygiene', order: 4 },
          { name: 'Лечение кариеса в Минске', slug: 'caries-treatment', order: 5 },
        ],
      },
      {
        name: 'Имплантация',
        slug: 'implantation',
        order: 1,
        children: [
          { name: 'Имплантация зубов Straumann в Минске', slug: 'straumann-implants', order: 0 },
          { name: 'Тотальная (полная) имплантация зубов в Минске', slug: 'total-implantation', order: 1 },
          { name: 'Одномоментная имплантация зубов в Минске', slug: 'immediate-implantation', order: 2 },
          { name: 'Имплантация зубов Osstem в Минске', slug: 'osstem-implants', order: 3 },
          { name: 'Имплантация зубов All-on-4 и All-on-6 в Минске', slug: 'all-on-4-6', order: 4 },
          { name: 'Двухэтапная имплантация зубов в Минске', slug: 'two-stage-implantation', order: 5 },
          { name: 'Имплантация зубов в Минске — цены и виды', slug: 'implantation-prices', order: 6 },
        ],
      },
      {
        name: 'Ортопедия',
        slug: 'orthopedics',
        order: 2,
        children: [
          { name: 'Виниры в Минске — цены и установка', slug: 'veneers', order: 0 },
          { name: 'Коронки на зубы в Минске — цены и виды', slug: 'crowns', order: 1 },
        ],
      },
      {
        name: 'Ортодонтия',
        slug: 'orthodontics',
        order: 3,
        children: [
          { name: 'Установка брекетов в Минске', slug: 'braces-installation', order: 0 },
          { name: 'Ортодонт в Минске — консультация врача и лечение прикуса', slug: 'orthodontist-consultation', order: 1 },
          { name: 'Элайнеры в Минске — цены на выравнивание зубов без брекетов', slug: 'aligners', order: 2 },
        ],
      },
      {
        name: 'Хирургия',
        slug: 'surgery',
        order: 4,
        children: [
          { name: 'Удаление зубов в Минске — удаление зуба мудрости и другие сложные случаи', slug: 'tooth-extraction', order: 0 },
          { name: 'Синус-лифтинг в Минске — цены и виды операции', slug: 'sinus-lift', order: 1 },
        ],
      },
      { name: 'Лечение зубов под наркозом в Минске', slug: 'anesthesia-treatment', order: 5 },
      { name: 'Лечение зубов под микроскопом в Минске', slug: 'microscope-treatment', order: 6 },
    ],
  },
  {
    name: 'Гинекология',
    slug: 'gynecology',
    icon: 'Heart',
    order: 2,
    children: [
      { name: 'Приём гинеколога', slug: 'gynecologist-appointment', order: 0 },
      { name: 'Диагностические исследования', slug: 'diagnostic-studies', order: 1 },
      { name: 'Внутриматочная спираль', slug: 'intrauterine-device', order: 2 },
      { name: 'Конизация шейки матки', slug: 'cervical-conization', order: 3 },
      { name: 'Кольпоскопия шейки матки', slug: 'colposcopy', order: 4 },
      { name: 'Проверка проходимости маточных труб (соногистероскопия) с помощью ExEm-геля', slug: 'tube-patency-check', order: 5 },
      { name: 'Удаление полипов | Полипэктомия', slug: 'polyp-removal', order: 6 },
      { name: 'Раздельное диагностическое выскабливание', slug: 'diagnostic-curettage', order: 7 },
      { name: 'Кульдоцентез', slug: 'culdocentesis', order: 8 },
    ],
  },
  {
    name: 'Детская гинекология',
    slug: 'pediatric-gynecology',
    icon: 'Baby',
    order: 3,
    children: [
      { name: 'УЗИ органов малого таза для девочек', slug: 'pelvic-ultrasound-girls', order: 0 },
      { name: 'Подростковый гинеколог', slug: 'adolescent-gynecologist', order: 1 },
      { name: 'Детский гинеколог', slug: 'pediatric-gynecologist', order: 2 },
    ],
  },
  {
    name: 'Детская урология',
    slug: 'pediatric-urology',
    icon: 'Stethoscope',
    order: 4,
    children: [
      { name: 'Лечение варикоцеле', slug: 'varicocele-treatment', order: 0 },
      { name: 'Приём детского уролога', slug: 'pediatric-urologist-appointment', order: 1 },
    ],
  },
  {
    name: 'Эндокринология',
    slug: 'endocrinology',
    icon: 'Activity',
    order: 5,
    children: [
      { name: 'Консультация врача-эндокринолога', slug: 'endocrinologist-consultation', order: 0 },
    ],
  },
  {
    name: 'Онкология',
    slug: 'oncology',
    icon: 'Stethoscope',
    order: 6,
    children: [
      { name: 'Приём врача онколога', slug: 'oncologist-appointment', order: 0 },
    ],
  },
  {
    name: 'УЗИ',
    slug: 'ultrasound',
    icon: 'Eye',
    order: 7,
    children: [
      { name: 'УЗИ органов малого таза', slug: 'pelvic-ultrasound', order: 0 },
      { name: 'УЗИ молочных желез', slug: 'breast-ultrasound', order: 1 },
      { name: 'УЗИ щитовидной железы', slug: 'thyroid-ultrasound', order: 2 },
      { name: 'УЗИ брюшной полости', slug: 'abdominal-ultrasound', order: 3 },
      { name: 'УЗИ плода', slug: 'fetal-ultrasound', order: 4 },
      { name: 'Гендер пати', slug: 'gender-party', order: 5 },
    ],
  },
  {
    name: 'Кардиология',
    slug: 'cardiology',
    icon: 'Heart',
    order: 8,
    children: [
      { name: 'ЭХО-КГ (УЗИ сердца)', slug: 'echo-kg', order: 0 },
      { name: 'ЭКГ (электрокардиография)', slug: 'ecg', order: 1 },
      { name: 'Холтеровское мониторирование', slug: 'holter-monitoring', order: 2 },
      { name: 'Приём кардиолога', slug: 'cardiologist-appointment', order: 3 },
    ],
  },
  {
    name: 'Диагностика',
    slug: 'diagnostics',
    icon: 'Search',
    order: 9,
    children: [
      { name: 'Экспертное УЗИ', slug: 'expert-ultrasound', order: 0 },
      { name: 'Анализы', slug: 'analyses', order: 1 },
      { name: 'Снимок зуба', slug: 'tooth-xray', order: 2 },
      { name: '3D снимок зубов', slug: '3d-dental-scan', order: 3 },
      { name: 'Панорамный снимок зубок', slug: 'panoramic-dental-scan', order: 4 },
    ],
  },
  {
    name: 'Дневной стационар',
    slug: 'day-hospital',
    icon: 'Building2',
    order: 10,
    children: [
      { name: 'Процедурный кабинет', slug: 'procedure-room', order: 0 },
    ],
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Очистка существующих категорий услуг
  await prisma.serviceCategory.deleteMany({});
  console.log('✅ Cleared existing service categories');

  let totalCreated = 0;

  // Создаем категории с подкатегориями
  for (const category of serviceCategories) {
    // Создаем корневую категорию
    const rootCategory = await prisma.serviceCategory.create({
      data: {
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        order: category.order,
        is_active: true,
      },
    });
    totalCreated++;
    console.log(`  ✓ Created: ${category.name}`);

    // Создаем подкатегории первого уровня
    if (category.children && category.children.length > 0) {
      for (const child of category.children) {
        const childCategory = await prisma.serviceCategory.create({
          data: {
            name: child.name,
            slug: child.slug,
            icon: child.icon || null,
            order: child.order,
            parent_id: rootCategory.id,
            is_active: true,
          },
        });
        totalCreated++;
        console.log(`    ✓ Created: ${child.name}`);

        // Создаем подкатегории второго уровня (если есть)
        if (child.children && child.children.length > 0) {
          for (const grandChild of child.children) {
            await prisma.serviceCategory.create({
              data: {
                name: grandChild.name,
                slug: grandChild.slug,
                icon: grandChild.icon || null,
                order: grandChild.order,
                parent_id: childCategory.id,
                is_active: true,
              },
            });
            totalCreated++;
            console.log(`      ✓ Created: ${grandChild.name}`);
          }
        }
      }
    }
  }

  console.log('\n✅ Service categories seeded successfully');
  console.log(`📊 Total categories created: ${totalCreated}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('\n✨ Seed completed successfully!');
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

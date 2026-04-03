import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Полная структура категорий из SMServicesMenuData.json
const serviceCategories = [
  {
    name: 'Стоматология',
    slug: 'dentistry',
    icon: 'Smile',
    order: 0,
    children: [
      {
        name: 'Терапевтическая стоматология',
        slug: 'therapeutic-dentistry',
        order: 0,
        children: [
          { name: 'Консультация стоматолога-терапевта', slug: 'dental-therapist-consultation', order: 0 },
          { name: 'Лечение кариеса', slug: 'caries-treatment', order: 1 },
          { name: 'Профессиональная чистка зубов', slug: 'professional-cleaning', order: 2 },
          { name: 'Реставрация зубов', slug: 'tooth-restoration', order: 3 },
          { name: 'Лечение зубов под микроскопом', slug: 'teeth-treatment-microscope', order: 4 },
          { name: 'Лечение пульпита', slug: 'pulpitis-treatment', order: 5 },
        ],
      },
      {
        name: 'Имплантация',
        slug: 'implantation',
        order: 1,
        children: [
          { name: 'Имплантация', slug: 'implantation-general', order: 0 },
          { name: 'Одномоментная дентальная имплантация', slug: 'immediate-dental-implantation', order: 1 },
          { name: 'Имплантация по протоколу All-on-4/6', slug: 'all-on-4-6', order: 2 },
          { name: 'Синус-лифтинг', slug: 'sinus-lift-implantation', order: 3 },
          { name: 'Имплантация зубов системой Straumann', slug: 'straumann-implants', order: 4 },
          { name: 'Имплантация зубов системой Neodent', slug: 'neodent-implants', order: 5 },
          { name: 'Имплантация зубов системой Osstem Implant', slug: 'osstem-implants', order: 6 },
          { name: 'Имплантация зубов системой MegaGen AnyOne', slug: 'megagen-anyone-implants', order: 7 },
          { name: 'Имплантация зубов системой MegaGen AnyRidge', slug: 'megagen-implants', order: 8 },
        ],
      },
      {
        name: 'Ортопедия',
        slug: 'orthopedics',
        order: 2,
        children: [
          { name: 'Протезирование', slug: 'prosthetics-general', order: 0 },
          { name: 'Временные коронки', slug: 'temporary-crowns', order: 1 },
          { name: 'Цифровое протезирование', slug: 'digital-prosthetics', order: 2 },
          { name: 'Металлокерамические коронки', slug: 'metal-ceramic-crowns', order: 3 },
          { name: 'Виниры', slug: 'veneers', order: 4 },
          { name: 'Коронки из диоксида циркония', slug: 'zirconia-crowns', order: 5 },
          { name: 'Мостовидные протезы', slug: 'dental-bridges', order: 6 },
          { name: 'Накладки', slug: 'dental-onlays', order: 7 },
          { name: 'Протезирование на имплантах', slug: 'implant-supported-prosthetics', order: 8 },
        ],
      },
      {
        name: 'Ортодонтия',
        slug: 'orthodontics',
        order: 3,
        children: [
          { name: 'Консультация стоматолога-ортодонта', slug: 'orthodontist-consultation', order: 0 },
          { name: 'Ортодонтическая диагностика', slug: 'orthodontic-diagnostics', order: 1 },
          { name: 'Установка брекетов', slug: 'braces-installation', order: 2 },
          { name: 'Ретенционный период', slug: 'orthodontic-retention-period', order: 3 },
          { name: 'Детская ортодонтия', slug: 'pediatric-orthodontics', order: 4 },
        ],
      },
      {
        name: 'Хирургия',
        slug: 'surgery',
        order: 4,
        children: [
          { name: 'Хирургия', slug: 'oral-surgery-general', order: 0 },
          { name: 'Удаление зуба', slug: 'single-tooth-extraction', order: 1 },
          { name: 'Удаление зуба мудрости', slug: 'wisdom-tooth-extraction', order: 2 },
          { name: 'Пластика десны', slug: 'gingival-plasty', order: 3 },
          { name: 'Периостотомия, перикоронаротомия', slug: 'periostotomy-pericoronotomy', order: 4 },
        ],
      },
    ],
  },
  {
    name: 'Гинекология',
    slug: 'gynecology',
    icon: 'Heart',
    order: 1,
    children: [
      { name: 'Приём врача-гинеколога', slug: 'gynecologist-appointment', order: 0 },
      { name: 'Кольпоскопия шейки матки', slug: 'colposcopy', order: 1 },
      { name: 'Вульвоскопия', slug: 'vulvoscopy', order: 2 },
      { name: 'Диагностические исследования', slug: 'diagnostic-studies', order: 3 },
      { name: 'Плазмотерапия или PRP-терапия', slug: 'prp-plasma-therapy', order: 4 },
      { name: 'Интимная контурная пластика', slug: 'intimate-contouring', order: 5 },
      { name: 'Радиоволновая конизация шейки матки', slug: 'radiofrequency-cervical-conization', order: 6 },
      { name: 'Радиоволновая коагуляция шейки матки', slug: 'radiofrequency-cervical-coagulation', order: 7 },
      { name: 'Полипэктомия цервикального канала', slug: 'cervical-canal-polypectomy', order: 8 },
      { name: 'Внутриматочная спираль', slug: 'intrauterine-device', order: 9 },
      { name: 'Аспирационная биопсия шейки матки', slug: 'aspiration-cervical-biopsy', order: 10 },
      { name: 'Прицельная биопсия шейки матки', slug: 'targeted-cervical-biopsy', order: 11 },
      { name: 'УЗИ органов малого таза', slug: 'gynecology-pelvic-ultrasound', order: 12 },
      { name: 'УЗИ молочных желез', slug: 'gynecology-breast-ultrasound', order: 13 },
      { name: 'Детская гинекология', slug: 'pediatric-gynecology', order: 14 },
    ],
  },
  {
    name: 'Дерматология',
    slug: 'dermatology',
    icon: 'Sparkles',
    order: 2,
    children: [
      { name: 'Приём врача-дерматовенеролога', slug: 'dermatovenerologist-appointment', order: 0 },
      { name: 'Дермоскопия кожи', slug: 'skin-dermoscopy', order: 1 },
    ],
  },
  {
    name: 'УЗИ',
    slug: 'ultrasound',
    icon: 'Eye',
    order: 3,
    children: [
      { name: 'УЗИ щитовидной железы', slug: 'thyroid-ultrasound', order: 0 },
      { name: 'УЗИ органов брюшной полости', slug: 'abdominal-ultrasound', order: 1 },
      { name: 'УЗИ молочных желез', slug: 'breast-ultrasound', order: 2 },
      { name: 'УЗИ органов малого таза', slug: 'pelvic-ultrasound', order: 3 },
      { name: 'УЗИ сердца', slug: 'ultrasound-heart', order: 4 },
      { name: 'УЗИ БЦА', slug: 'ultrasound-bc-arteries', order: 5 },
      {
        name: 'УЗИ почек, надпочечников, мочевого пузыря',
        slug: 'ultrasound-kidneys-adrenals-bladder',
        order: 6,
      },
      { name: 'УЗИ предстательной железы', slug: 'ultrasound-prostate', order: 7 },
      {
        name: 'УЗИ мошонки, полового члена',
        slug: 'ultrasound-scrotum-penis',
        order: 8,
      },
      { name: 'Трансректальное УЗИ', slug: 'ultrasound-transrectal', order: 9 },
    ],
  },
  {
    name: 'Кардиология',
    slug: 'cardiology',
    icon: 'Heart',
    order: 4,
    children: [
      { name: 'Приём врача-кардиолога', slug: 'cardiologist-appointment', order: 0 },
      { name: 'Электрокардиография (ЭКГ)', slug: 'ecg', order: 1 },
      { name: 'Эхокардиография (УЗИ сердца)', slug: 'echo-kg', order: 2 },
    ],
  },
  {
    name: 'Неврология',
    slug: 'neurology',
    icon: 'Brain',
    order: 5,
    children: [
      { name: 'Приём врача-невролога', slug: 'neurologist-appointment', order: 0 },
      { name: 'Лечебные блокады', slug: 'therapeutic-nerve-blocks', order: 1 },
      { name: 'УЗИ БЦА', slug: 'brachiocephalic-artery-ultrasound', order: 2 },
    ],
  },
  {
    name: 'Урология',
    slug: 'urology',
    icon: 'Droplet',
    order: 6,
    children: [
      { name: 'Приём врача-уролога', slug: 'urologist-appointment', order: 0 },
      {
        name: 'Манипуляции и исследования для диагностики и лечения урологических заболеваний',
        slug: 'urology-diagnostic-manipulations',
        order: 1,
        children: [
          { name: 'Ректальный осмотр простаты', slug: 'prostate-rectal-examination', order: 0 },
          { name: 'Массаж предстательной железы', slug: 'prostate-massage', order: 1 },
          { name: 'Получение секрета', slug: 'prostatic-secretion-collection', order: 2 },
          { name: 'Лечебный массаж предстательной железы', slug: 'therapeutic-prostate-massage', order: 3 },
        ],
      },
      {
        name: 'Урологические операции',
        slug: 'urological-surgery',
        order: 2,
        children: [
          { name: 'Пункция гидроцеле', slug: 'hydrocele-puncture', order: 0 },
          { name: 'Электрорезекция полипа уретры', slug: 'urethral-polyp-electroresection', order: 1 },
          { name: 'Электрорезекция остроконечных кондилом', slug: 'condyloma-electroresection', order: 2 },
          { name: 'Рассечение короткой уздечки', slug: 'frenulotomy', order: 3 },
        ],
      },
      {
        name: 'УЗИ',
        slug: 'urology-ultrasound',
        order: 3,
        children: [
          { name: 'Почки, надпочечники', slug: 'urology-us-kidneys-adrenals', order: 0 },
          {
            name: 'Мочевой пузырь (в т.ч. с определением остаточной мочи)',
            slug: 'urology-us-bladder-residual',
            order: 1,
          },
          {
            name: 'Предстательная железа с мочевым пузырем и остаточной мочью (трансабдоминально)',
            slug: 'urology-us-prostate-bladder-transabdominal',
            order: 2,
          },
          { name: 'Мошонка', slug: 'urology-us-scrotum', order: 3 },
          { name: 'Половой член', slug: 'urology-us-penis', order: 4 },
          { name: 'Трансректальное УЗИ', slug: 'urology-us-transrectal', order: 5 },
        ],
      },
    ],
  },
  {
    name: 'Диагностика',
    slug: 'diagnostics',
    icon: 'Search',
    order: 7,
    children: [
      { name: 'Экспертное УЗИ', slug: 'expert-ultrasound', order: 0 },
      { name: 'Анализы', slug: 'analyses', order: 1 },
      { name: 'Снимок зуба', slug: 'tooth-xray', order: 2 },
      { name: '3D снимок зубов', slug: '3d-dental-scan', order: 3 },
      { name: 'Панорамный снимок зубок', slug: 'panoramic-dental-scan', order: 4 },
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

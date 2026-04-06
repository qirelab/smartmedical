import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding partner categories...');

  const categories = [
    { name: 'Медицинские лаборатории', slug: 'medical-labs' },
    { name: 'Страховые компании', slug: 'insurance' },
    { name: 'Зуботехнические лаборатории', slug: 'dental-labs' },
    { name: 'Медицинские учреждения', slug: 'medical-institutions' },
  ];

  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existing) {
      await prisma.category.create({
        data: category,
      });
      console.log(`✅ Created category: ${category.name} (${category.slug})`);
    } else {
      await prisma.category.update({
        where: { slug: category.slug },
        data: { name: category.name },
      });
      console.log(`⏭️  Category exists (name synced): ${category.name} (${category.slug})`);
    }
  }

  const medicalInst = await prisma.category.findUnique({
    where: { slug: 'medical-institutions' },
  });

  if (medicalInst) {
    const smartMedicalDesc =
      '«Смарт Медикал» – медицинский центр Европейского уровня по качеству оказания медицинских услуг. Тщательное обследование, точная диагностика и эффективное лечение. «Смарт Медикал» готов предоставить дружелюбное и комфортное пребывание в центре каждому человеку в любом возрасте.\n\nТелефон: +375 29 161 01 01';
    const smartMedicalUrl = 'https://smartmedical.by/';

    const smartMedicalRows = await prisma.partner.findMany({
      where: {
        category_id: medicalInst.id,
        OR: [
          { website_url: { contains: 'smartmedical.by', mode: 'insensitive' } },
          { name: { contains: 'Смарт Медикал' } },
        ],
      },
    });

    const unsplashPlaceholders = smartMedicalRows.filter((p) =>
      p.image_url.includes('unsplash.com')
    );
    const hasNonPlaceholder = smartMedicalRows.some((p) => !p.image_url.includes('unsplash.com'));

    if (smartMedicalRows.length > 1 && hasNonPlaceholder && unsplashPlaceholders.length > 0) {
      for (const p of unsplashPlaceholders) {
        await prisma.partner.delete({ where: { id: p.id } });
        console.log(`🗑️ Удалён дубликат-плейсхолдер Smart Medical (id=${p.id}, Unsplash)`);
      }
    }

    const stillHasSmartMedical = await prisma.partner.findFirst({
      where: {
        category_id: medicalInst.id,
        website_url: { contains: 'smartmedical.by', mode: 'insensitive' },
      },
    });

    if (!stillHasSmartMedical) {
      await prisma.partner.create({
        data: {
          category_id: medicalInst.id,
          name: 'Медицинский центр «Смарт Медикал», г. Минск',
          description: smartMedicalDesc,
          number: 1,
          website_url: smartMedicalUrl,
          image_url:
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
        },
      });
      console.log('✅ Created partner: Медицинский центр «Смарт Медикал», г. Минск');
    } else {
      console.log('⏭️  Partner Smart Medical уже есть в medical-institutions');
    }
  }

  console.log('✨ Partner categories seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding partner categories:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

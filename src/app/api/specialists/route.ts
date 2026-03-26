import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const serviceCategorySlug = searchParams.get('serviceCategorySlug');

    let specialists;

    if (serviceCategorySlug) {
      console.log('Filtering by service category slug:', serviceCategorySlug);

      // Новый способ - фильтрация по категории услуг
      // Сначала находим категорию услуг и все её подкатегории
      // @ts-ignore
      const serviceCategory = await prisma.serviceCategory.findUnique({
        where: { slug: serviceCategorySlug },
        include: {
          children: {
            include: {
              children: true, // До 3 уровней вложенности
            },
          },
        },
      });

      if (!serviceCategory) {
        console.log('Service category not found:', serviceCategorySlug);
        return NextResponse.json([]);
      }

      console.log('Found service category:', serviceCategory.name, 'ID:', serviceCategory.id);

      // Собираем все ID категорий (текущая + все подкатегории)
      const categoryIds = [serviceCategory.id];

      // Добавляем ID подкатегорий первого уровня
      if (serviceCategory.children) {
        for (const child of serviceCategory.children) {
          categoryIds.push(child.id);
          // Добавляем ID подкатегорий второго уровня
          if (child.children) {
            for (const grandchild of child.children) {
              categoryIds.push(grandchild.id);
            }
          }
        }
      }

      console.log('Searching specialists with category IDs:', categoryIds);

      // Находим специалистов, у которых:
      // 1. service_category_id совпадает с категорией
      // 2. ИЛИ есть услуги в этих категориях
      specialists = await prisma.specialist.findMany({
        where: {
          OR: [
            {
              service_category_id: {
                in: categoryIds,
              },
            },
            {
              services: {
                some: {
                  service: {
                    service_category_id: {
                      in: categoryIds,
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          category: true,
          serviceCategory: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      console.log('Found specialists:', specialists.length, specialists.map(s => ({ name: s.name, service_category_id: s.service_category_id })));
    } else if (categoryId) {
      // Старый способ - фильтрация по старой таблице категорий
      specialists = await prisma.specialist.findMany({
        where: {
          category_id: parseInt(categoryId),
        },
        include: {
          category: true,
          serviceCategory: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    } else {
      // Без фильтрации - все специалисты
      specialists = await prisma.specialist.findMany({
        include: {
          category: true,
          serviceCategory: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    }

    return NextResponse.json(specialists);
  } catch (error) {
    console.error('Error fetching specialists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialists' },
      { status: 500 }
    );
  }
}


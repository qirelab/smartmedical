interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  parent_id: number | null;
  order: number;
  services?: Service[];
}

interface Service {
  id: number;
  title: string;
  subtitle: string;
  service_category_id: number | null;
}

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  children?: MenuItem[];
}

// Функция для построения меню с услугами как подпунктами
function buildMenuWithServices(categories: ServiceCategory[]): MenuItem[] {
  return categories.map((category) => {
    const menuItem: MenuItem = {
      id: category.slug,
      title: category.name,
    };

    // Добавляем иконку для категории
    if (category.icon) {
      menuItem.icon = category.icon;
    }

    // Добавляем услуги как подпункты категории
    if (category.services && category.services.length > 0) {
      menuItem.children = category.services.map((service) => ({
        id: `${category.slug}/${service.id}`,
        title: service.title,
      }));
    }

    return menuItem;
  });
}

// Получение меню услуг из БД (для использования на сервере)
export async function getServicesMenuFromDB(): Promise<MenuItem[]> {
  try {
    // Lazy import prevents hard crash on module load
    // when Prisma client is not generated yet.
    const { prisma } = await import('./prisma');

    // @ts-ignore - ServiceCategory будет доступна после npx prisma generate
    const categories = await prisma.serviceCategory.findMany({
      where: {
        is_active: true,
        parent_id: null, // Только корневые категории (без подкатегорий)
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
      include: {
        services: {
          orderBy: [
            { title: 'asc' },
          ],
          select: {
            id: true,
            title: true,
            subtitle: true,
            service_category_id: true,
          },
        },
      },
    });

    return buildMenuWithServices(categories as ServiceCategory[]);
  } catch (error) {
    console.error('Error fetching services menu from DB:', error);
    return [];
  }
}

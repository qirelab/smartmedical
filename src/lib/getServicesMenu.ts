import { prisma } from './prisma';

interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  parent_id: number | null;
  order: number;
  services?: Service[];
  children?: ServiceCategory[];
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

// Функция для построения меню с подкатегориями и услугами
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

    const children: MenuItem[] = [];

    // Сначала добавляем услуги, привязанные напрямую к категории
    if (category.services && category.services.length > 0) {
      const serviceItems = category.services.map((service) => ({
        id: `${category.slug}/${service.id}`,
        title: service.title,
      }));
      children.push(...serviceItems);
    }

    // Затем добавляем подкатегории (рекурсивно)
    if (category.children && category.children.length > 0) {
      const subcategoryItems = buildMenuWithServices(category.children);
      children.push(...subcategoryItems);
    }

    // Добавляем children только если они есть
    if (children.length > 0) {
      menuItem.children = children;
    }

    return menuItem;
  });
}

// Рекурсивная функция для загрузки подкатегорий с услугами
async function loadCategoryTreeWithServices(parentId: number | null): Promise<ServiceCategory[]> {
  // @ts-ignore - ServiceCategory будет доступна после npx prisma generate
  const categories = await prisma.serviceCategory.findMany({
    where: {
      parent_id: parentId,
      is_active: true,
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

  // Загружаем подкатегории для каждой категории
  const categoriesWithChildren = await Promise.all(
    categories.map(async (cat: any) => {
      const children = await loadCategoryTreeWithServices(cat.id);
      return {
        ...cat,
        children: children.length > 0 ? children : undefined,
      };
    })
  );

  return categoriesWithChildren;
}

// Получение меню услуг из БД (для использования на сервере)
export async function getServicesMenuFromDB(): Promise<MenuItem[]> {
  try {
    // Загружаем корневые категории с их подкатегориями и услугами
    const categories = await loadCategoryTreeWithServices(null);

    return buildMenuWithServices(categories as ServiceCategory[]);
  } catch (error) {
    console.error('Error fetching services menu from DB:', error);
    return [];
  }
}

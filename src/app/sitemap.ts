import type { MetadataRoute } from "next";

const SITE_URL = (process.env.SITE_URL || "https://doctorfamily.by").replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/doctors",
    "/clinic",
    "/clinic/questions",
    "/contacts",
    "/patient",
  ];

  const baseEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  try {
    const { prisma } = await import("@/lib/prisma");

    const [services, specialists, questionCategories] = await Promise.all([
      prisma.service.findMany({
        select: {
          id: true,
          serviceCategory: {
            select: {
              slug: true,
            },
          },
          category: {
            select: {
              slug: true,
            },
          },
        },
      }),
      prisma.specialist.findMany({
        select: {
          id: true,
          category: {
            select: {
              slug: true,
            },
          },
        },
      }),
      prisma.questionCategory.findMany({
        where: {
          is_active: true,
        },
        select: {
          slug: true,
        },
      }),
    ]);

    const dynamicRoutes = new Set<string>();

    services.forEach((service) => {
      const categorySlug = service.serviceCategory?.slug || service.category?.slug;
      if (!categorySlug) return;
      dynamicRoutes.add(`/services/${categorySlug}/${service.id}`);
    });

    specialists.forEach((specialist) => {
      const categorySlug = specialist.category?.slug;
      if (!categorySlug) return;
      dynamicRoutes.add(`/doctors/${categorySlug}/${specialist.id}`);
    });

    questionCategories.forEach((category) => {
      if (!category.slug) return;
      dynamicRoutes.add(`/clinic/questions/${category.slug}`);
    });

    const dynamicEntries: MetadataRoute.Sitemap = Array.from(dynamicRoutes).map(
      (route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    );

    return [...baseEntries, ...dynamicEntries];
  } catch (error) {
    console.error("Failed to build dynamic sitemap, using static routes only", error);
    return baseEntries;
  }
}

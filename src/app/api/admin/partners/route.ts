import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

async function checkAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token || !token.id) {
    return { isAdmin: false, error: "Не авторизован" };
  }

  const userId = parseInt(token.id as string);
  const user = await prisma.patient.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "CHIEF_DOCTOR")) {
    return { isAdmin: false, error: "Нет прав доступа" };
  }

  return { isAdmin: true };
}

// GET - Получить всех партнёров
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const partners = await prisma.partner.findMany({
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { number: "asc" },
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error("Get partners error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении партнёров" },
      { status: 500 }
    );
  }
}

// Захардкоженный slug категории для партнёров
const PARTNERS_CATEGORY_SLUG = 'partners';

// POST - Создать нового партнёра
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const data = await request.json();

    // Получаем или создаём категорию партнёров
    let category = await prisma.category.findUnique({
      where: { slug: PARTNERS_CATEGORY_SLUG },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: 'Партнёры',
          slug: PARTNERS_CATEGORY_SLUG,
        },
      });
    }

    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        description: data.description,
        image_url: data.image_url || '',
        website_url: data.website_url || '',
        number: parseInt(data.number) || 1,
        category_id: category.id,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("Create partner error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании партнёра" },
      { status: 500 }
    );
  }
}

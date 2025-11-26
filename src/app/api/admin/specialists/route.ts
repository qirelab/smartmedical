import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// Middleware для проверки админа
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

// GET - Получить всех специалистов
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const specialists = await prisma.specialist.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(specialists);
  } catch (error) {
    console.error("Get specialists error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении специалистов" },
      { status: 500 }
    );
  }
}

// POST - Создать нового специалиста
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const data = await request.json();

    const specialist = await prisma.specialist.create({
      data: {
        name: data.name,
        specialization: data.specialization,
        qualification: data.qualification,
        experience: parseInt(data.experience),
        grade: parseInt(data.grade),
        image_url: data.image_url || "/images/default-doctor.jpg",
        activity_area: data.activity_area || null,
        education_details: data.education_details || null,
        conferences: data.conferences || [],
        specializations: data.specializations || [],
        education: data.education || [],
        work_examples: data.work_examples || null,
        category_id: parseInt(data.category_id),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(specialist, { status: 201 });
  } catch (error) {
    console.error("Create specialist error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании специалиста" },
      { status: 500 }
    );
  }
}

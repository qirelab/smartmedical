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

// GET - Получить все вакансии
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const vacancies = await prisma.vacancy.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(vacancies);
  } catch (error) {
    console.error("Get vacancies error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении вакансий" },
      { status: 500 }
    );
  }
}

// POST - Создать новую вакансию
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const data = await request.json();

    const vacancy = await prisma.vacancy.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        payment: parseInt(data.payment),
        experience: parseInt(data.experience),
        requirements: data.requirements,
      },
    });

    return NextResponse.json(vacancy, { status: 201 });
  } catch (error) {
    console.error("Create vacancy error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании вакансии" },
      { status: 500 }
    );
  }
}

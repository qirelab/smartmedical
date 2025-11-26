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

// GET - Получить все вопросы
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const questions = await prisma.question.findMany({
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Get questions error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении вопросов" },
      { status: 500 }
    );
  }
}

// POST - Создать новый вопрос
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const data = await request.json();

    const question = await prisma.question.create({
      data: {
        question: data.question,
        answer: data.answer || null,
        category: data.category || null,
        service_id: data.service_id ? parseInt(data.service_id) : null,
      },
      include: {
        service: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Create question error:", error);
    return NextResponse.json(
      { error: "Ошибка при создании вопроса" },
      { status: 500 }
    );
  }
}

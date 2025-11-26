import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// GET - Получить все письма (только для главного врача)
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token || !token.id) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    const userId = parseInt(token.id as string);

    // Проверяем роль пользователя
    const user = await prisma.patient.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "CHIEF_DOCTOR") {
      return NextResponse.json(
        { error: "Нет доступа" },
        { status: 403 }
      );
    }

    const letters = await prisma.letter.findMany({
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar_url: true,
            is_messages_blocked: true,
          },
        },
        messages: {
          orderBy: { created_at: 'asc' },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(letters);
  } catch (error) {
    console.error("Error fetching letters:", error);
    return NextResponse.json(
      { error: "Ошибка при получении писем" },
      { status: 500 }
    );
  }
}

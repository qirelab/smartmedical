import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

const ADMIN_PASSWORD = "adminsmartmedical";

// POST - Проверка пароля для входа в админ-панель (только для существующих админов)
export async function POST(request: NextRequest) {
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

    // Проверяем, что пользователь уже имеет роль ADMIN
    const user = await prisma.patient.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user || !["ADMIN", "CHIEF_DOCTOR", "OPERATOR"].includes(user.role)) {
      return NextResponse.json(
        { error: "Нет прав доступа" },
        { status: 403 }
      );
    }

    // Операторы не требуют проверки пароля - у них доступ только к чату
    if (user.role === "OPERATOR") {
      return NextResponse.json({
        success: true,
        user,
        message: "Вход выполнен успешно"
      });
    }

    // Для ADMIN и CHIEF_DOCTOR требуется пароль
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Неверный пароль" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
      message: "Вход выполнен успешно"
    });
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { error: "Ошибка при авторизации" },
      { status: 500 }
    );
  }
}

// GET - Проверка роли текущего пользователя
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token || !token.id) {
      return NextResponse.json(
        { isAdmin: false, error: "Не авторизован" },
        { status: 401 }
      );
    }

    const userId = parseInt(token.id as string);

    const user = await prisma.patient.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { isAdmin: false, error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      isAdmin: ["ADMIN", "CHIEF_DOCTOR", "OPERATOR"].includes(user.role),
      isChiefDoctor: user.role === "CHIEF_DOCTOR",
      isOperator: user.role === "OPERATOR",
      role: user.role
    });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { isAdmin: false, error: "Ошибка при проверке роли" },
      { status: 500 }
    );
  }
}

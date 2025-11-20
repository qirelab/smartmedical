import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lastName,
      firstName,
      middleName,
      email,
      phone,
      password,
      confirmPassword,
      login,
    } = body;

    // Валидация обязательных полей
    if (!login || !email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: "Все обязательные поля должны быть заполнены" },
        { status: 400 }
      );
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Пароли не совпадают" },
        { status: 400 }
      );
    }

    // Проверка минимальной длины пароля
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль должен содержать минимум 6 символов" },
        { status: 400 }
      );
    }

    // Проверка минимальной длины логина
    if (login.length < 3) {
      return NextResponse.json(
        { error: "Логин должен содержать минимум 3 символа" },
        { status: 400 }
      );
    }

    // Валидация формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный формат email" },
        { status: 400 }
      );
    }

    // Валидация формата белорусского телефона: +375(XX)XXX-XX-XX
    const phoneRegex = /^\+375\((25|29|33|44|17)\)\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Некорректный формат телефона. Используйте формат: +375(29)123-45-67" },
        { status: 400 }
      );
    }

    // Проверка уникальности email
    const existingUserByEmail = await prisma.patient.findFirst({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 409 }
      );
    }

    // Проверка уникальности логина
    const existingUserByLogin = await prisma.patient.findFirst({
      where: { login },
    });

    if (existingUserByLogin) {
      return NextResponse.json(
        { error: "Пользователь с таким логином уже существует" },
        { status: 409 }
      );
    }

    // Проверка уникальности телефона
    const existingUserByPhone = await prisma.patient.findFirst({
      where: { phone },
    });

    if (existingUserByPhone) {
      return NextResponse.json(
        { error: "Пользователь с таким телефоном уже существует" },
        { status: 409 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Формирование полного имени
    const fullName = `${lastName} ${firstName}${middleName ? ` ${middleName}` : ""}`.trim();

    // Создание пользователя
    const user = await prisma.patient.create({
      data: {
        login,
        email,
        password: hashedPassword,
        name: fullName,
        phone,
        registration_date: new Date(),
      },
    });

    // Возвращаем успешный ответ без пароля
    return NextResponse.json(
      {
        message: "Регистрация успешна",
        user: {
          id: user.id,
          login: user.login,
          email: user.email,
          name: user.name,
          phone: user.phone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Ошибка при регистрации. Попробуйте позже." },
      { status: 500 }
    );
  }
}


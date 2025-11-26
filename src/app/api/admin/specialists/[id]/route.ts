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

// GET - Получить специалиста по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const { id } = await params;
    const specialistId = parseInt(id);

    const specialist = await prisma.specialist.findUnique({
      where: { id: specialistId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!specialist) {
      return NextResponse.json(
        { error: "Специалист не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(specialist);
  } catch (error) {
    console.error("Get specialist error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении специалиста" },
      { status: 500 }
    );
  }
}

// PUT - Обновить специалиста
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const { id } = await params;
    const specialistId = parseInt(id);
    const data = await request.json();

    const specialist = await prisma.specialist.update({
      where: { id: specialistId },
      data: {
        name: data.name,
        specialization: data.specialization,
        qualification: data.qualification,
        experience: parseInt(data.experience),
        grade: parseInt(data.grade),
        image_url: data.image_url,
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

    return NextResponse.json(specialist);
  } catch (error) {
    console.error("Update specialist error:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении специалиста" },
      { status: 500 }
    );
  }
}

// DELETE - Удалить специалиста
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 403 });
    }

    const { id } = await params;
    const specialistId = parseInt(id);

    await prisma.specialist.delete({
      where: { id: specialistId },
    });

    return NextResponse.json({ success: true, message: "Специалист удален" });
  } catch (error) {
    console.error("Delete specialist error:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении специалиста" },
      { status: 500 }
    );
  }
}

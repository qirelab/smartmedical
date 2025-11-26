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

// PUT - Обновить вопрос
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
    const questionId = parseInt(id);
    const data = await request.json();

    const question = await prisma.question.update({
      where: { id: questionId },
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

    return NextResponse.json(question);
  } catch (error) {
    console.error("Update question error:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении вопроса" },
      { status: 500 }
    );
  }
}

// DELETE - Удалить вопрос
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
    const questionId = parseInt(id);

    await prisma.question.delete({
      where: { id: questionId },
    });

    return NextResponse.json({ success: true, message: "Вопрос удален" });
  } catch (error) {
    console.error("Delete question error:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении вопроса" },
      { status: 500 }
    );
  }
}

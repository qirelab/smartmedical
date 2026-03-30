import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - получить категорию по slug с вопросами
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const category = await prisma.questionCategory.findUnique({
      where: {
        slug,
        is_active: true
      },
      include: {
        questions: {
          where: {
            answer: { not: null } // Показываем только вопросы с ответами
          },
          orderBy: {
            id: 'asc'
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Категория не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching question category:", error);
    return NextResponse.json(
      { error: "Failed to fetch question category" },
      { status: 500 }
    );
  }
}

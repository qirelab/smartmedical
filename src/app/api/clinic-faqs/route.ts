import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let faqs;
    if (category) {
      // Получаем FAQ по старой категории (для обратной совместимости)
      // Используется на старых страницах клиники с хардкодеными категориями
      faqs = await prisma.question.findMany({
        where: {
          service_id: null,
          category: category,
          answer: { not: null } // Показываем только вопросы с ответами
        },
        orderBy: {
          id: 'asc'
        }
      });
    } else {
      // Получаем все общие FAQ клиники (service_id = null)
      // Поддерживаем как старую систему (category), так и новую (question_category_id)
      faqs = await prisma.question.findMany({
        where: {
          service_id: null,
          answer: { not: null } // Показываем только вопросы с ответами
        },
        include: {
          questionCategory: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: {
          id: 'asc'
        }
      });
    }

    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.error("Error fetching clinic FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic FAQs" },
      { status: 500 }
    );
  }
}

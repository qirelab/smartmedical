import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let faqs;
    if (category) {
      // Получаем FAQ по категории
      faqs = await prisma.question.findMany({
        where: {
          service_id: null,
          category: category
        },
        orderBy: {
          id: 'asc'
        }
      });
    } else {
      // Получаем все общие FAQ клиники (service_id = null)
      faqs = await prisma.question.findMany({
        where: {
          service_id: null
        },
        orderBy: {
          category: 'asc'
        }
      });
    }

    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.error('Error fetching clinic FAQs:', error);
    return NextResponse.json(
      { error: "Failed to fetch clinic FAQs" },
      { status: 500 }
    );
  }
}

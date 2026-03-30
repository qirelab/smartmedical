import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - получить все активные категории вопросов (публичный endpoint)
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.questionCategory.findMany({
      where: {
        is_active: true
      },
      orderBy: {
        order: 'asc'
      },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching question categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch question categories" },
      { status: 500 }
    );
  }
}

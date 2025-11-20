import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Получаем только общие отзывы клиники (service_id = null)
    const reviews = await prisma.feedback.findMany({
      where: {
        service_id: null
      },
      orderBy: {
        date: 'desc'
      },
      skip,
      take: limit
    });

    // Получаем общее количество отзывов
    const total = await prisma.feedback.count({
      where: {
        service_id: null
      }
    });

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clinic reviews:', error);
    return NextResponse.json(
      { error: "Failed to fetch clinic reviews" },
      { status: 500 }
    );
  }
}

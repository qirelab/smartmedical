import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let vacancies;

    if (category) {
      // Get vacancies by category
      vacancies = await prisma.vacancy.findMany({
        where: {
          category: category
        },
        orderBy: {
          id: 'desc'
        }
      });
    } else {
      // Get all vacancies
      vacancies = await prisma.vacancy.findMany({
        orderBy: {
          id: 'desc'
        }
      });
    }

    return NextResponse.json(vacancies, { status: 200 });
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return NextResponse.json(
      { error: "Failed to fetch vacancies" },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const where = categoryId ? { category_id: parseInt(categoryId) } : {};

    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
        specialist: {
          include: {
            category: true,
          },
        },
        questions: true,
        feedbacks: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}


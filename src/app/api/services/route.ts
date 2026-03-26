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
        specialists: {
          include: {
            specialist: {
              include: {
                category: true,
              },
            },
          },
        },
        questions: true,
        feedbacks: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    // Transform data to match expected format
    const transformedServices = services.map(service => ({
      ...service,
      specialists: service.specialists.map(ss => ss.specialist),
    }));

    return NextResponse.json(transformedServices);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}


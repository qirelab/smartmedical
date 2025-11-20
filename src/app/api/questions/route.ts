import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface QuestionResponse {
  services: Array<{
    id: number;
    title: string;
    subtitle: string;
    category: {
      id: number;
      name: string;
      slug: string;
    };
    questionCount: number;
    questions: Array<{
      id: number;
      question: string;
      answer: string | null;
    }>;
  }>;
  total: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceIdParam = searchParams.get('serviceId');
    const categorySlug = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const search = searchParams.get('q') ?? searchParams.get('search');

    let serviceId: number | undefined;
    if (serviceIdParam) {
      const parsedServiceId = Number(serviceIdParam);
      if (Number.isNaN(parsedServiceId) || parsedServiceId <= 0) {
      return NextResponse.json(
        { error: 'Invalid serviceId parameter' },
        { status: 400 }
      );
    }
      serviceId = parsedServiceId;
    }

    let limit: number | undefined;
    if (limitParam) {
      const parsedLimit = Number(limitParam);
      if (Number.isNaN(parsedLimit) || parsedLimit <= 0) {
      return NextResponse.json(
        { error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }
      limit = parsedLimit;
    }

    const services = await prisma.service.findMany({
      where: {
        ...(serviceId ? { id: serviceId } : {}),
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { subtitle: { contains: search, mode: 'insensitive' } },
                {
                  questions: {
                    some: {
                      OR: [
                        { question: { contains: search, mode: 'insensitive' } },
                        { answer: { contains: search, mode: 'insensitive' } },
                      ],
                    },
                  },
                },
              ],
            }
          : {}),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        questions: {
          orderBy: { id: 'asc' },
          where: search
            ? {
                OR: [
                  { question: { contains: search, mode: 'insensitive' } },
                  { answer: { contains: search, mode: 'insensitive' } },
                ],
              }
            : undefined,
        },
      },
      orderBy: [
        { category_id: 'asc' },
        { title: 'asc' },
      ],
    });

    const payload: QuestionResponse['services'] = services
      .map((service) => ({
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        category: service.category,
        questionCount: service.questions.length,
        questions: service.questions.map((question) => ({
          id: question.id,
          question: question.question,
          answer: question.answer,
        })),
      }))
      .filter((service) => service.questionCount > 0);

    const servicesToReturn =
      typeof limit === 'number' && limit < payload.length
        ? payload.slice(0, limit)
        : payload;

    const response: QuestionResponse = {
      total: payload.length,
      services: servicesToReturn,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}



import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

// Middleware для проверки админа
async function checkAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token || !token.id) {
    return { isAdmin: false, error: 'Не авторизован' };
  }

  const userId = parseInt(token.id as string);
  const user = await prisma.patient.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || (user.role !== 'ADMIN' && user.role !== 'CHIEF_DOCTOR')) {
    return { isAdmin: false, error: 'Нет доступа' };
  }

  return { isAdmin: true };
}

// GET - получить все услуги
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 401 });
    }

    const services = await prisma.service.findMany({
      include: {
        category: true,
        specialists: {
          include: {
            specialist: true,
          },
        },
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
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST - создать услугу
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await checkAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      price,
      video_url,
      description,
      specialist_ids, // Changed from specialists_id to specialist_ids (array)
      image_url,
      image_url_1,
      image_url_2,
      image_url_3,
      image_url_4,
      category_id,
    } = body;

    // Валидация обязательных полей
    if (!title || !subtitle || !price || !category_id || !specialist_ids || specialist_ids.length === 0) {
      return NextResponse.json(
        { error: 'Название, подзаголовок, цена, категория и хотя бы один специалист обязательны' },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        title,
        subtitle,
        price: parseInt(price),
        video_url: video_url || '',
        description: description || '',
        image_url: image_url || '',
        image_url_1: image_url_1 || '',
        image_url_2: image_url_2 || '',
        image_url_3: image_url_3 || '',
        image_url_4: image_url_4 || null,
        questions_id: 1,
        reviews_id: 1,
        category_id: parseInt(category_id),
        specialists: {
          create: specialist_ids.map((id: string) => ({
            specialist_id: parseInt(id),
          })),
        },
      },
      include: {
        category: true,
        specialists: {
          include: {
            specialist: true,
          },
        },
      },
    });

    // Transform data to match expected format
    const transformedService = {
      ...service,
      specialists: service.specialists.map(ss => ss.specialist),
    };

    return NextResponse.json(transformedService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

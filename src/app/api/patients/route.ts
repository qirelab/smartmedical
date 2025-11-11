import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prismaClient';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        login: true,
        email: true,
        name: true,
        phone: true,
        registration_date: true,
        // Не возвращаем password по соображениям безопасности
      },
      orderBy: {
        registration_date: 'desc',
      },
    });

    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}


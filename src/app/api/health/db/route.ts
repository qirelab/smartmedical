import { NextResponse } from "next/server";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;
  const nextAuthUrl = process.env.NEXTAUTH_URL;

  const env = {
    DATABASE_URL: Boolean(databaseUrl),
    NEXTAUTH_URL: Boolean(nextAuthUrl),
    NODE_ENV: process.env.NODE_ENV ?? null,
  };

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        ok: true,
        env,
        message: "Database connection is working",
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return NextResponse.json(
      {
        ok: false,
        env,
        message,
      },
      { status: 500 }
    );
  }
}

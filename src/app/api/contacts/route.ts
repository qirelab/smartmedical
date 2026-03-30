import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get the first (and likely only) contact record
    const contacts = await prisma.contacts.findFirst();

    if (!contacts) {
      return NextResponse.json(
        { error: "Contacts not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

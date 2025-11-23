import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const therapistId = searchParams.get("therapistId");

    if (!therapistId) {
      return new NextResponse("Therapist ID is required", { status: 400 });
    }

    const slots = await prisma.slot.findMany({
      where: {
        userId: therapistId
      }
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error("[SLOTS_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, timing } = body;

    if (!userId || !timing) {
      return new NextResponse("User ID and timing are required", { status: 400 });
    }

    const slot = await prisma.slot.create({
      data: {
        userId,
        timing
      }
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error("[SLOTS_CREATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

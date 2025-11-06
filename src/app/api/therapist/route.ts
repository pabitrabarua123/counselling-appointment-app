import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (userId) {
        const therapist = await prisma.therapist.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        return NextResponse.json(therapist);
    }

    const therapists = await prisma.therapist.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return NextResponse.json(therapists);
  } catch (error) {
    console.error("[THERAPIST_API_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
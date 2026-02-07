import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");
    console.log("[THERAPIST_API] GET request received", { url: request.url, userId });

    if (userId) {
        console.log("[THERAPIST_API] Fetching therapist by userId", userId);
        const therapist = await prisma.therapist.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        })
        return NextResponse.json(therapist);
    }

    console.log("[THERAPIST_API] Fetching all therapists");
    const therapists = await prisma.therapist.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
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
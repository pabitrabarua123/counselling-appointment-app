import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
            
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    const page = Number(searchParams.get("page") || null);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    // filters
    const area = searchParams.get("area");
    const rating = searchParams.get("rating");
    const gender = searchParams.get("gender");
    const languages = searchParams.get("languages");

    const where: Prisma.TherapistWhereInput = {
     ...(area && { area: { has: area } }),
     ...(rating && { rating: Number(rating) }),
     ...(gender && { gender }),
     ...(languages && { languages: { has: languages } }),
    };

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
                        avatar: true,
                        orders: {
                            select: {
                                id: true,
                                customerName: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(therapist);
    }

    if (page) {
        console.log("[THERAPIST_API] Fetching therapists with pagination", { page, limit, skip, where });
        const [therapists, total] = await Promise.all([
            prisma.therapist.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            orders: {
                                select: {
                                    id: true,
                                    customerName: true
                                }
                            }
                        }
                    }
                }
            }),
            prisma.therapist.count({ where })
        ]);
        return NextResponse.json({ therapists, total });
    }

    console.log("[THERAPIST_API] Fetching all therapists");
    const therapists = await prisma.therapist.findMany({
      include: {
        user: {
          select: {
            id: true,
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
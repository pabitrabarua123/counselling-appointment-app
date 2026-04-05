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
    const isVerified = searchParams.get("isVerified");

    const where: Prisma.TherapistWhereInput = {
     ...(isVerified && { isVerified: false }),
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
                        },
                        slot: {
                            select: {
                                days: true,
                                timing: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(therapist);
    }

    // for pagination and filtering
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

    // this is for fetching all therapists on session booking from
    console.log("[THERAPIST_API] Fetching therapists with where clause only: ", where);
    const therapists = await prisma.therapist.findMany({
      where,  
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });
    console.log("[THERAPIST_API] Therapists fetched: ", therapists);
    return NextResponse.json({ therapists, total: therapists.length });
  } catch (error) {
    console.error("[THERAPIST_API_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
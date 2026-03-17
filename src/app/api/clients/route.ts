import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function GET(req: NextRequest) {
  try {
            // Check session
            const session = await getServerSession(authOptions);
            if (!session || session.user.role !== 1) {
              return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
              );
            }
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const therapistId = searchParams.get("therapistId");
    const sessionType = searchParams.get("sessionType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {
      ...(therapistId && { therapistId }),
      ...(sessionType && { sessionType }),
      ...(startDate || endDate
        ? {
            sessionStart: {
              ...(startDate && { gte: new Date(startDate) }),
              ...(endDate && { lte: new Date(endDate) }),
            },
          }
        : {}),
    };

    if (userId) {
      const client = await prisma.client.findUnique({
        where: { id: userId },
        include: {
          therapist: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return NextResponse.json({data: client}, { status: 200 });
    }

    if (page) {
    console.log("Booking API - Where Clause:", where);
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          therapist: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.client.count({ where }),
    ]);

    console.log("Booking API - Clients:", clients);

    return NextResponse.json({
      data: clients,
      total,
      page,
      limit,
    }, { status: 200 });
  }

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
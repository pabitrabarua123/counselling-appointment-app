import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const therapistId = searchParams.get("therapistId");
    const serviceType = searchParams.get("serviceType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(therapistId && { therapistId }),
      ...(serviceType && { serviceType }),
      ...(startDate || endDate
        ? {
            sessionStart: {
              ...(startDate && { gte: new Date(startDate) }),
              ...(endDate && { lte: new Date(endDate) }),
            },
          }
        : {}),
    };

    console.log("Booking API - Where Clause:", where);
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          sessionStart: "desc",
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
      prisma.order.count({ where }),
    ]);

    console.log("Booking API - Orders:", orders);

    return NextResponse.json({
      data: orders,
      total,
      page,
      limit,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
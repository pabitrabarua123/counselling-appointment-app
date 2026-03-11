import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const therapistId = searchParams.get("therapistId");
    const serviceType = searchParams.get("serviceType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    const orders = await prisma.order.findMany({
      where,
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
    });

    // Convert to CSV
    const header = [
      "Client Name",
      "Client Email",
      "Therapist",
      "Session Type",
      "Session Start",
      "Session End",
    ];

    const rows = orders.map((o) => [
      o.customerName ?? "",
      o.customerEmail ?? "",
      o.therapist.name,
      o.serviceType,
      o.sessionStart,
      o.sessionEnd,
    ]);

    const csv =
      [header, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=bookings.csv",
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to export bookings" },
      { status: 500 }
    );
  }
}
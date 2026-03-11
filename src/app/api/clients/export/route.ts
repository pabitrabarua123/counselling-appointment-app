import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const therapistId = searchParams.get("therapistId");
    const sessionType = searchParams.get("sessionType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    const clients = await prisma.client.findMany({
      where,
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
    });

    // Convert to CSV
    const header = [
      "Client Name",
      "Client Email",
      "Client Phone Number",
      "Therapist",
      "Session Type",
    ];

    const rows = clients.map((o) => [
      o.name ?? "",
      o.email ?? "",
      o.phoneNumber ?? "",
      o.therapist.name,
      o.sessionType
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
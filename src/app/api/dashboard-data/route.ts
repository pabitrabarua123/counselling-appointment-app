import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    const [clients, orders, therapists, revenue] = await prisma.$transaction([
      prisma.client.count(),
      prisma.order.count(),
      prisma.therapist.count(),
      prisma.order.aggregate({
        _sum: {
          amount: true
        }
      })
    ]);

    return NextResponse.json(
      {
        data: {
          clients,
          orders,
          therapists,
          revenue
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
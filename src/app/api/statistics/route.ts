import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Check session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 1) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // dashboard card data
    const [clients, orders, therapists, totalRevenue] = await prisma.$transaction([
      prisma.client.count(),
      prisma.order.count(),
      prisma.therapist.count(),
      prisma.order.aggregate({
        _sum: {
          amount: true
        }
      })
    ]);

   const revenue = (totalRevenue._sum.amount ?? 0) / 100;

    // get individual and couple count
    const result = await prisma.order.groupBy({
        by: ["serviceType"],
        _count: {
          serviceType: true,
        },
    });

    let individual = 0;
    let couple = 0;

    result.forEach(item => {
      if (item.serviceType === "individual") {
        individual = item._count.serviceType;
      }
      if (item.serviceType === "couple") {
        couple = item._count.serviceType;
      }
    });

    const piechart = [couple, individual];

    const now = new Date();
    // Start date = 11 months ago (beginning of that month)
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );

    // Fetch only last 12 months data
    const ordersLast12Months = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Generate last 12 months structure
    const monthsMap: Record<string, { sessions: number; }> = {};

    for (let i = 0; i < 12; i++) {
      const d = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const key = `${d.getFullYear()}-${d.getMonth()}`;
      
      monthsMap[key] = {
        sessions: 0,
      };
    }

    // Fill data
    ordersLast12Months.forEach((order: {amount: number, createdAt: Date}) => {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      if (monthsMap[key]) {
        monthsMap[key].sessions += 1;
      }
    });

    // Sort chronologically
    const sortedKeys = Object.keys(monthsMap).sort((a, b) => {
      const [y1, m1] = a.split("-").map(Number);
      const [y2, m2] = b.split("-").map(Number);
      return new Date(y1, m1).getTime() - new Date(y2, m2).getTime();
    });

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const categories: string[] = [];
    const sessions: number[] = [];

    sortedKeys.forEach((key) => {
      const [year, month] = key.split("-").map(Number);
      categories.push(`${monthNames[month]} ${year}`);
      sessions.push(monthsMap[key].sessions);
    });

    return NextResponse.json({
      categories,
      sessions,
      revenue,
      piechart,
      clients, 
      orders, 
      therapists
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

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

    const therapists = await prisma.therapist.findMany({
                where,
                orderBy: {
                  createdAt: "desc",
                },
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
    });

    // Convert to CSV
    const header = [
      "Therapist Name",
      "Therapist Email",
      "Total Sessions",
      "Rating",
      "Area of Expertise",
      "Languages Spoken"
    ];

    const rows = therapists.map((o) => [
      o.user.name ?? "",
      o.user.email ?? "",
      o.user.orders.length > 0 ? o.user.orders.length : "0",
      o.rating,
      o.area.join("|"),
      o.languages.join("|"),
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
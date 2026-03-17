import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Check session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 1) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Parse body
    const body = await request.json();

    const {
      area,
      languages,
      aboutTherapist,
      phoneNumber,
      googleCalendarId,
      degree,
      yearOfExp,
      gender,
      timing,
      days,
      profilePic,
    } = body;

    // Transaction: therapist + slots
    const result = await prisma.$transaction(async (tx) => {
      const therapist = await tx.therapist.create({
        data: {
          userId,
          area,
          languages,
          aboutTherapist,
          phoneNumber,
          googleCalendarId,
          degree,
          yearOfExp,
          gender,
          profilePic,
        },
      });

      const slot = await tx.slot.create({
        data: {
          userId,
          timing,
          days,
        },
      });

      return { therapist, slot };
    });

    return NextResponse.json(
      {
        message: "Therapist added successfully",
        data: result,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("[THERAPIST_CREATE_ERROR]", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
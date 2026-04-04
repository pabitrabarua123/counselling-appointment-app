import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) { 
    try {
      const { id } = await request.json();
      // Check session
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

       const verifiedTherapist = await prisma.therapist.update({
            where: { id },
            data: { isVerified: true },
        });

        if (!verifiedTherapist) {
            return NextResponse.json(
                { message: "Therapist not found" },
                { status: 404 }
            );
        }

        if (verifiedTherapist) {
            // Send email notification to the therapist about approval
            // await prisma.emailNotification.create({
            //     data: {
            //         therapistId: id,
            //         subject: "Your Therapist Profile Has Been Approved",
            //         message: "Congratulations! Your therapist profile has been approved. You can now start accepting clients and managing your bookings on our platform.",
            //     },
            // });

            return NextResponse.json(
                { message: "Therapist approved successfully" },
                { status: 200 }
            );
        }

    }catch (error) {
        console.error("Error approving therapist:", error);
        return NextResponse.json(
          { message: "Failed to approve therapist" },
          { status: 500 }
        );
    }
}
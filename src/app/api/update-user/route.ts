import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path if different

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // user must be logged in
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { name, email, password } = body;

    let hashedPassword = undefined;

    // hash password only if provided
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    }, { status: 200 });
  } catch (error) {
    console.error("Update User Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
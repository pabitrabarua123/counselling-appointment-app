import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { BookingData } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const prisma = new PrismaClient();

interface CheckoutRequestBody {
  price: number; // amount in cents
  bookingData: BookingData,
  sessionStart: string; // ISO date string
  sessionEnd: string;   // ISO date string
}

// POST /api/checkout
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: CheckoutRequestBody = await req.json();
    const { price, bookingData, sessionStart, sessionEnd } = body;

    // Validate input
    if (!price || typeof price !== "number" || price <= 0) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid price" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a pending order in the DB
    const order = await prisma.order.create({
      data: {
        amount: price,
        serviceType: bookingData.serviceType,
        therapistId: bookingData.therapistId,
        sessionStart: sessionStart,
        sessionEnd: sessionEnd,
        status: "PENDING",
      },
    });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // fixed
            product_data: {
              name: `Session Booking - ${bookingData.serviceType} therapy` || `Order at ${new Date().toISOString()}`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/checkout/cancel`,
      metadata: {
        orderId: order.id,
        bookingData: JSON.stringify(bookingData),
      },
    });

    // ✅ Update order with the Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    // ✅ Return Checkout URL to client
    return new NextResponse(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Stripe checkout error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// 🧠 GET /api/checkout?session_id={CHECKOUT_SESSION_ID}
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing session_id" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const order_details = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: {
        therapist: {
          select: {
            name: true,
            email: true
          },
        },
      },
    });

    if (!order_details) {
      return new NextResponse(
        JSON.stringify({ error: "No booking found with this payment session" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    
    return new NextResponse(
        JSON.stringify({ order: order_details }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Stripe session retrieval error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { sendEmailCustomer, sendEmailTherapist } from "@/lib/emailService";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Stripe request body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body from request
async function buffer(readable: ReadableStream<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) chunks.push(value);
    done = doneReading;
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Missing Stripe signature or webhook secret");
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  if (!req.body) {
    return NextResponse.json({ error: "Missing request body" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req.body);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Payment succeeded
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const data = session.metadata?.bookingData;
        const bookingData = data ? JSON.parse(data) : null;
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;
        const customerPhone = session.customer_details?.phone;
        
        console.log(bookingData);
        
        // update payment status
        if (orderId && session.payment_status === "paid") {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: "paid",
              customerEmail,
              customerName,
            },
          });
          console.log(`Order ${orderId} marked as paid`);

          const order_details = await prisma.order.findUnique({
             where: { id: orderId },
             include: {
              therapist: {
                select: {
                  name: true,
                  email: true
                },
              },
             },
          });

          // add new client if not exists,
          // increament sessions by 1 if client exists
          await prisma.client.upsert({
            where: {
              email: customerEmail ?? "",
            },
            update: {
               numberOfSessions: {
               increment: 1,
              },
            },
            create: {
              name: customerName,
              gender: bookingData.genderIdentity,
              issues: bookingData.reason,
              age:
               new Date().getFullYear() -
               new Date(bookingData.dateOfBirth).getFullYear() -
                (new Date() <
                  new Date(
                   new Date().getFullYear(),
                   new Date(bookingData.dateOfBirth).getMonth(),
                   new Date(bookingData.dateOfBirth).getDate()
                  )
                ? 1
              : 0),
              languages: ["English", "Spanish"],
              phoneNumber: customerPhone ?? "",
              email: customerEmail ?? "",
              sessionType: bookingData.serviceType,
              therapistId: bookingData.therapistId,
            },
          });

          // retrieve therapist email, name
          const therapist = await prisma.user.findUnique({
            where: {
              id: bookingData.therapistId
            }
          });

          // event created in google calendar
          fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleCalendarId: order_details?.therapist.email,    
              summary: customerName ? `Session with ${customerName}` : "New Session Booked",
              description: order_details?.serviceType ? `Session Type: ${order_details.serviceType}` : "New session booked through Talkcure",
              startTime: order_details?.sessionStart.toISOString(),
              endTime: order_details?.sessionEnd.toISOString(),
            }),
          }).then(res => {
            console.log("Event created in Google Calendar:", res.status);
            // send confirmation email to client
            sendEmailCustomer({
              userEmail: order_details?.customerEmail || "",
              userName: order_details?.customerName || "",
              therapistName: order_details?.therapist.name || "",
              sessionDate: order_details?.sessionStart.toDateString() || "",
              sessionTime: order_details?.sessionStart.toTimeString().split(" ")[0] || "",
            });

            // send confirmation email to therapist
            sendEmailTherapist({
              therapistEmail: therapist?.email || '',
              therapistName: therapist?.name || '',
              clientName: customerName ? customerName : '',
              clientPhone: customerPhone ? customerPhone : '',
              clientEmail: customerEmail ? customerEmail : '',
              issues: bookingData.reason,
              age:
               new Date().getFullYear() -
               new Date(bookingData.dateOfBirth).getFullYear() -
                (new Date() <
                  new Date(
                   new Date().getFullYear(),
                   new Date(bookingData.dateOfBirth).getMonth(),
                   new Date(bookingData.dateOfBirth).getDate()
                  )
                ? 1
              : 0),
              gender: bookingData.genderIdentity,
              sessionDate: order_details?.sessionStart.toDateString() || "",
              sessionTime: order_details?.sessionStart.toTimeString().split(" ")[0] || "",
            })
          }).catch(err => {
            console.error("Error creating event in Google Calendar:", err);
          });
      }
    }
        break;

      // Payment expired or canceled
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "expired" },
          });
          console.log(`Order ${orderId} marked as expired`);
        }
        break;
      }

      // Optional: handle failed payments
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "failed" },
          });
          console.log(`Order ${orderId} marked as failed`);
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}

import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Fetch events from Google Calendar
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const therapistId = searchParams.get("therapistId");
  const date = searchParams.get("date");
  const timeMin = date ? new Date(date + "T00:00:00Z").toISOString() : new Date().toISOString();
  const timeMax = date ? new Date(date + "T23:59:59Z").toISOString() : undefined;

  console.log(timeMin, timeMax, date);

  try {
    const result = await prisma.therapist.findUnique({
      select: { googleCalendarId: true },
      where: { userId: therapistId }
    });
    const googleCalendarId = result?.googleCalendarId ?? null;
    console.log(googleCalendarId);

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"]
    });

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.events.list({
      calendarId: googleCalendarId,
      timeMin: timeMin,
      maxResults: 10,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log(response.data.items);

    return NextResponse.json(response.data.items ?? []);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { googleCalendarId, summary, description, startTime, endTime } = body;

    if (!googleCalendarId || !summary || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar.events"], // 👈 needs write access
    });

    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary,
      description,
      start: { dateTime: new Date(startTime).toISOString(), timeZone: "Asia/Kolkata" },
      end: { dateTime: new Date(endTime).toISOString(), timeZone: "Asia/Kolkata" },
    };

    const response = await calendar.events.insert({
      calendarId: googleCalendarId,
      requestBody: event,
    });

    return NextResponse.json({
      message: "Event created successfully",
      event: response.data,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

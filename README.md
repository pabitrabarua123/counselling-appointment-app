# TalkCure - bridges the gap between people and counsellors.

A modern Next.js application for booking online psychotherapy sessions with qualified therapists.

## About the Project

TalkCure is a full-stack platform that bridges the gap between people seeking mental health support and qualified therapists. The application provides a seamless booking experience with integrated payment processing, calendar management, and separate dashboards for administrators and counselors. Built with modern web technologies, TalkCure prioritizes security, user experience, and reliable payment handling.

**Core Functionality:**
- Users can browse available therapists and book sessions with flexible scheduling
- JWT based authentication with Next-Auth
- Integrated payment processing with Stripe
- Google Calendar integration for real-time slot management
- Admin dashboard for managing users, bookings, and therapists
- Counselor panel for managing client appointments and schedules

## Project Structure

```
mindvoyage-next/
├── src/
│   ├── app/                          # Next.js App Router pages & API routes
│   │   ├── api/                      # Backend API endpoints
│   │   │   ├── auth/                 # NextAuth authentication
│   │   │   ├── checkout/             # Stripe payment checkout
│   │   │   ├── webhook/              # Stripe webhook handling
│   │   │   ├── bookings/             # Booking CRUD operations
│   │   │   ├── events/               # Google Calendar integration
│   │   │   ├── clients/              # Client management
│   │   │   ├── therapist/            # Therapist data
│   │   │   ├── register/             # User registration
│   │   │   ├── slots/                # Available time slots
│   │   │   └── upload/               # File upload handling
│   │   ├── admin/                    # Admin dashboard routes
│   │   ├── counsellor-admin/         # Counselor dashboard routes
│   │   ├── auth/                     # Sign-in/Sign-up pages
│   │   ├── book/                     # Booking flow page
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # Reusable React components
│   │   ├── FormWizard/               # Multi-step booking form
│   │   ├── Admin/                    # Admin dashboard components
│   │   ├── Admin-Counsellor/         # Counselor dashboard components
│   │   ├── Home/                     # Landing page sections
│   │   ├── Navigation.tsx            # Header navigation
│   │   ├── Footer.tsx                # Footer component
│   │   └── providers/                # Context providers
│   ├── lib/                          # Utility functions
│   │   ├── auth.ts                   # Authentication helpers
│   │   ├── emailService.ts           # Email notifications
│   │   ├── cloudinary.ts             # Image storage
│   │   └── utils.ts                  # General utilities
│   └── types/                        # TypeScript type definitions
│       ├── index.ts                  # Shared types
│       └── next-auth.d.ts            # NextAuth types
├── prisma/
│   ├── schema.prisma                 # Database schema (PostgreSQL)
│   └── migrations/                   # Database migrations
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies & scripts
```

**Key Folders:**
- `src/app/api/` — All backend logic: authentication, payment, booking, calendar integration
- `src/components/FormWizard/` — Multi-step booking form logic
- `src/types/` — Centralized TypeScript type definitions for type safety
- `prisma/schema.prisma` — Database models for users, therapists, bookings, and sessions

## Environment variables

### App
NEXT_PUBLIC_APP_URL=http://localhost:3000

### Auth
AUTH_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

### Database
DATABASE_URL=""
DIRECT_URL=""

### Environment (Production/Development)
NODE_ENV=""

### Google Calendar
GOOGLE_CLIENT_EMAIL=""

### Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

### Email (Brevo SMTP)
BREVO_SMTP_LOGIN=""
BREVO_SMTP_KEY=""
BREVO_VERIFIED_SENDER=""

### cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""


## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (with Prisma ORM)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## How to get started with the project

1. **Download or Clone the repo**

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## Deployment

The application is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- You can use AWS also

## License

This project is licensed under the MIT License.
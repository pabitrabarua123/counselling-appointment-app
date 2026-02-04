# Copilot Instructions for mindvoyage-next

## Project Overview
- **Purpose:** Online psychotherapy booking platform built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Prisma ORM.
- **Key Features:** Multi-step booking form, therapist directory, Stripe payments, NextAuth authentication, calendar event integration, and responsive UI.

## Architecture & Data Flow
- **App Structure:**
  - `src/app/` — Next.js App Router pages and API routes.
  - `src/components/` — Reusable UI (e.g., Navigation, Notification, FormWizard).
  - `src/data/` — Static therapist/session data.
  - `src/lib/` — Utilities (e.g., email service, classnames).
  - `src/types/` — TypeScript types for therapists, sessions, booking, etc.
  - `prisma/` — Prisma schema and migrations for PostgreSQL.
- **Booking Flow:**
  - Multi-step form (`FormWizard.tsx`) collects user, session, and preference data.
  - On confirmation, creates a calendar event and initiates Stripe checkout via `/api/checkout`.
  - Payment and booking status are updated via Stripe webhooks (`/api/webhook/stripe`).
- **Authentication:**
  - Uses NextAuth with Prisma and credentials provider (`/api/auth/[...nextauth]/route.ts`).
  - Passwords are hashed with bcryptjs.

## Developer Workflows
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Prisma:**
  - Generate client: `npx prisma generate`
  - Run migrations: `npx prisma migrate dev`
- **Environment:**
  - Requires `.env` with `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Project-Specific Patterns
- **Type Safety:** All business logic and API routes use TypeScript types from `src/types/`.
- **API Routes:**
  - All backend logic (auth, booking, payment, events) is in `src/app/api/`.
  - Stripe and calendar integrations are handled server-side.
- **Form State:**
  - Booking data is managed in a single state object and passed between steps.
  - Use `updateBookingData` pattern for partial updates.
- **Error Handling:**
  - API routes return JSON with error keys and appropriate status codes.
  - Stripe/webhook errors are logged and surfaced in responses.
- **UI:**
  - Tailwind CSS for all styling.
  - Headless UI and Lucide React for components/icons.

## Integration Points
- **Stripe:** Payment intent creation and webhook handling (`/api/checkout`, `/api/webhook/stripe`).
- **Prisma:** All user, therapist, order, and session data is persisted via Prisma models.
- **NextAuth:** User authentication and session management.
- **Email:** Email notifications via `lib/emailService.ts` (see implementation for details).

## Examples
- See `src/components/FormWizard/` for booking flow logic and UI.
- See `src/app/api/checkout/route.ts` for payment flow.
- See `prisma/schema.prisma` for data model.
- See `src/types/index.ts` for shared types.

---

**When in doubt, reference the README and the above files for canonical patterns.**

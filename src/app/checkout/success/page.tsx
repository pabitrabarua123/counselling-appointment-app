"use client"; // 1️⃣ Mark as client component

export const dynamic = "force-dynamic"; // 2️⃣ Prevent static prerender

import { useSearchParams } from "next/navigation";
import CheckoutStatus from "@/components/CheckoutStatus/CheckoutStatus";

export default function SuccessPage() {
  const searchParams = useSearchParams(); // 3️⃣ Use hook inside client component
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return (
      <div className="bg-gray-50 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Invalid Page
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CheckoutStatus sessionId={sessionId} />
      </div>
    </div>
  );
}

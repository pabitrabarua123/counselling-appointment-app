"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import CheckoutStatus from "@/components/CheckoutStatus/CheckoutStatus";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return (
      <div className="bg-gray-50 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Invalid Page</h1>
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

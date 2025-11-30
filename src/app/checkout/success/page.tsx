import CheckoutStatus from '@/components/CheckoutStatus/CheckoutStatus';

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id || null;

  if (!sessionId) {
    return (
      <div className="bg-gray-50 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Invalid Page</h1>
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

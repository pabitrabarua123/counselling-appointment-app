import Link from "next/link";


export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        
        <h1 className="text-6xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>

        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}
import Link from "next/link";

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600 text-lg">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {message && (
        <div className="mt-4 bg-white rounded-sm shadow-sm">
          <p className="mt-2 text-gray-600 text-lg">{message}</p>
        </div>
      )}
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}

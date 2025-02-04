import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 lg:mt-12">
            <h1 className="text-5xl font-bold mb-4">Attendance Portal</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Card */}
            <Link
              href="/admin"
              className="group relative transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl border border-white/30 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-purple-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Admin Panel
                    </h2>
                    <p className="text-gray-600">
                      Manage users, settings, and reports
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* QR Generator Card */}
            <Link
              href="/qr"
              className="group relative transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl border border-white/30 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-green-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h16M4 16h16"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      QR Generator
                    </h2>
                    <p className="text-gray-600">
                      Create and manage attendance QR codes
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

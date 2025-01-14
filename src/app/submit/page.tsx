export default function SubmitPage() {
  return (
    <main className="container">
      <div className="flex flex-col justify-center items-start mx-auto bg-white px-10 py-10 rounded-lg">
        <span className="text-5xl font-semibold mb-4">
          Your response has been accepted!
        </span>
        <hr className="border border-t-2 border-gray-300 mb-8 w-full" />
        <span className="text-2xl mb-3">Record:</span>
        <div className="flex flex-col border rounded-md p-3 w-full bg-slate-50 shadow-sm">
          {/* TODO: Add real data here */}
          <span className="text-lg">Name: John Doe</span>
          <span className="text-lg">Date: 2023-06-12</span>
          <span className="text-lg">Time: 12:00:00</span>
        </div>
      </div>
    </main>
  );
}

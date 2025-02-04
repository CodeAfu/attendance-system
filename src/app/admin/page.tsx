import Link from "next/link";
import React from "react";

export default function AdminPage() {
  return (
    <section className="container h-screen">
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-purple-700">WORK IN PROGRESS</h1>
        <Link href="/" className="text-xl underline font-semibold text-purple-700">
          Back to home
        </Link>
      </div>
    </section>
  );
}

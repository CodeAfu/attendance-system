// import AttendanceForm from "@/components/AttendanceForm";

import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      {/* <AttendanceForm title="" /> */}
      <div className="md:mt-12 flex flex-col bg-white rounded-md shadow-md p-3">
        <h1 className="text-3xl font-semibold text-center mb-12">Menus</h1>
        {/* TODO: add 3 components here for each menu */}
        <ul className="grid grid-cols-2 gap-4 pb-4 text-xl font-semibold">
          <Link href="/admin">
            <li>Admin</li>
          </Link>
          <Link href="/qr">
            <li>QR Generator</li>
          </Link>
        </ul>
      </div>
    </main>
  );
}

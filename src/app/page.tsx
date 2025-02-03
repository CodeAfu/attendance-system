import AttendanceForm from "@/components/AttendanceForm";

export default function Home() {
  return (
    <main className="container">
      {/* <AttendanceForm title="" /> */}
      <div className="md:mt-12 flex flex-col bg-white rounded-md shadow-md p-3">
        <h1 className="text-3xl font-semibold text-center mb-12">Menus</h1>
        {/* TODO: add 3 components here for each menu */}
        <ul className="grid grid-cols-2 gap-4 pb-4 text-xl font-semibold">
          <li>Admin</li>
          <li>QR Generator</li>
        </ul>
      </div>
    </main>
  );
}

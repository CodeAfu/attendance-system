import Header from "@/components/header/header";
import HomeButton from "@/components/home/home-button";
import { QrCode, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-purple-50">
      <Header />
      <div className="md:mt-8" />
      <div className="container flex flex-col gap-4">
        <HomeButton
          title="Admin Portal"
          description="Admin Portal"
          href="/admin"
          icon={User}
          iconColor="rgb(85, 51, 136)"
        />
        <HomeButton
          title="QR Code Generator"
          description="Generate QR code for selected course"
          href="/qr"
          icon={QrCode}
          iconColor="rgb(85, 51, 136)"
        />
      </div>
    </main>
  );
}

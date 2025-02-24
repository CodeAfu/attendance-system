import Header from "@/components/header/header";
import HomepageCard from "@/components/home/homepage-card";
import { QrCode, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-purple-50">
      <Header />
      <div className="md:mt-8" />
      <div className="container flex flex-col gap-4">
        <HomepageCard
          title="Admin Portal"
          description="Admin Portal"
          href="/admin"
          icon={User}
          iconColor="rgb(85, 51, 136)"
        />
        <HomepageCard
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

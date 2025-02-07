import React from "react";
import QRSection from "@/sections/QRSection";

export default async function QRPage() {
  // TODO: Add validation for venue via backend calls
  // const course = (await params).slug;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container flex-1 flex flex-col">
        <QRSection />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import QRCanvas from "@/components/qr/QRCanvas";
import QRMenus from "@/components/qr/QRMenus";
import { QRDataProvider } from "@/context/QRDataContext";

export default function QRSection() {
  return (
    <QRDataProvider>
      <div className="w-full flex flex-col flex-1">
        <div className="border bg-white shadow-sm p-3">
          <QRMenus />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <QRCanvas />
        </div>
      </div>
    </QRDataProvider>
  );
}

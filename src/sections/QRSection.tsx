"use client";
import React from "react";
import QRCanvasComponent from "@/components/QR/QRCanvas";
import QRMenus from "@/components/QR/QRMenus";
import { QRDataProvider } from "@/context/QRDataContext";

export default function QRSection() {
  return (
    <QRDataProvider>
      <div className="w-full flex flex-col flex-1">
        <div className="border bg-white shadow-sm p-3">
          <QRMenus />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <QRCanvasComponent />
        </div>
      </div>
    </QRDataProvider>
  );
}
  
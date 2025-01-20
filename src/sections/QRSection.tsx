"use client";
import React, { useState } from "react";
import QRCanvasComponent from "@/components/QRCanvas";
import QRMenus from "@/components/QRMenus";
import { QRDataProvider } from "@/context/QRDataContext";

export default function QRSection() {
  const [generateTrigger, setGenerateTrigger] = useState(false);

  const handleGenerate = () => {
    setGenerateTrigger(true);
  };

  return (
    <QRDataProvider>
      <div className="w-full flex flex-col flex-1">
        <div className="border p-3">
          <QRMenus />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <QRCanvasComponent />
        </div>
      </div>
    </QRDataProvider>
  );
}

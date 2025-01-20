"use client";
import QRCanvasComponent from "@/components/QRCanvas";
import QRMenus from "@/components/QRMenus";
import { QRDataProvider } from "@/context/QRDataContext";
import React from "react";

interface QRSectionProps {
  course: string;
}

export default function QRSection({ course }: QRSectionProps) {
  return (
    <QRDataProvider>
      <div className="w-full flex flex-col flex-1">
        <div className="border p-3">
          <QRMenus />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <QRCanvasComponent courseProp={course} />
        </div>
      </div>
    </QRDataProvider>
  );
}

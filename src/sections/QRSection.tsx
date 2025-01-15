import QRCanvasComponent from "@/components/QRCanvas";
import QRMenus from "@/components/QRMenus";
import React from "react";

interface QRSectionProps {
  venue: string;
}

export default function QRSection({ venue }: QRSectionProps) {
  return (
    <div className="w-full flex flex-col flex-1">
      <div>
        <QRMenus />
        <hr className="border border-t-2 border-gray-500 mb-3" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <QRCanvasComponent venueProp={venue} />
      </div>
    </div>
  );
}
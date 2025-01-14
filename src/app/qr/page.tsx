import QRCanvasComponent from "@/components/QRCanvas";
import React from "react";

export default function QRPage() {

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <QRCanvasComponent />
      </div>
    </div>
  );
}

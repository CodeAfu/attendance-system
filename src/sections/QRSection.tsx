"use client";
import React from "react";
import QRCanvas from "@/components/qr/QRCanvas";
import QRMenus from "@/components/qr/QRMenus";
import { QRDataProvider } from "@/context/qrdata-context";

export default function QRSection() {
  return (
    <QRDataProvider>
      <QRMenus />
      <QRCanvas />
    </QRDataProvider>
  );
}

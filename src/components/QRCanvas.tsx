"use client";
import React, { useState, useEffect, useRef } from "react";
import { useQRCode } from "next-qrcode";
import Loading from "@/components/Loading";

export default function QRCanvasComponent() {
  const { Canvas } = useQRCode();
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const { width, height } = canvas;
      const imageData = context.getImageData(0, 0, width, height).data;
      
      const hasContent = Array.from(imageData).some((pixel, index) => 
        index % 4 === 3 && pixel !== 0
      );

      if (hasContent) {
        setIsLoading(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-3">Venue: </h1>
      {isLoading && <Loading />}
      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 400,
        }}
      />
    </>
  );
}

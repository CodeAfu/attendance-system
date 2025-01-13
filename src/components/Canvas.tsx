"use client";
import React, { useRef, useEffect, useState } from "react";
// import { getPosition } from "@/utils/Drawing";

export default function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineCap = "round";

    const getPosition = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      } else if (event instanceof MouseEvent) {
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }
      return null;
    };

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      const pos = getPosition(event);
      if (!pos) return;

      setIsDrawing(true);
      context.beginPath();
      context.moveTo(pos.x, pos.y);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;

      const pos = getPosition(event);
      if (!pos) return;

      context.lineTo(pos.x, pos.y);
      context.stroke();
    };

    const stopDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false);
        context.closePath();
      }
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [isDrawing]);

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not detected.");
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas.png"; // TODO: Provide a proper name for the file later
    link.click();
  };

  const clearCanvas = () => {
    if (!isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-32 border border-gray-300 rounded-md mb-1"
      />
      <div className="w-full flex justify-end">
        <button
          onClick={clearCanvas}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          Clear
        </button>
      </div>
    </>
  );
}

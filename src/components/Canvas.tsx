"use client";
import React, { useRef, useEffect, useState } from "react";

interface CanvasComponentProps {
  name: string;
}

export default function CanvasComponent({ name }: CanvasComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not detected.");
      return;
    }

    const setCanvasDimensions = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;

      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Context not detected.");
        return;
      }

      context.scale(scale, scale);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.lineCap = "round";
      contextRef.current = context;
    };

    setCanvasDimensions();

    const handleResize = () => {
      setCanvasDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPosition = (event: MouseEvent | TouchEvent) => {
      if (!canvas) return null;
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
      if (!pos || !contextRef.current) return;

      setIsDrawing(true);
      contextRef.current.beginPath();
      contextRef.current.moveTo(pos.x, pos.y);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing || !contextRef.current) return;

      const pos = getPosition(event);
      if (!pos) return;

      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    };

    const stopDrawing = () => {
      if (isDrawing && contextRef.current) {
        setIsDrawing(false);
        contextRef.current.closePath();
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

  const clearCanvas = () => {
    if (!isDrawing && canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not detected.");
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}.png`; // TODO: Add ID to filename from DB.
    link.click();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-40 border border-gray-300 rounded-md mb-2"
      />
      <div className="w-full flex justify-end gap-2">
        <button
          type="button"
          onClick={clearCanvas}
          className="bg-white border border-blue-300 rounded-md px-2 py-1 hover:bg-gray-100 text-blue-500 font-semibold focus:outline-none active:bg-blue-500 active:text-white"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={saveCanvas}
          className="bg-white border border-blue-300 rounded-md px-2 py-1 hover:bg-gray-100 text-blue-500 font-semibold focus:outline-none active:bg-blue-500 active:text-white"
        >
          Save
        </button>
      </div>
    </>
  );
}

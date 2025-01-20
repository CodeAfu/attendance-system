"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import QrEnvVariable from "@/actions/qr-backend";

interface Response {
  success: boolean;
  data: {
    QRCode: string;
    course: string;
  };
}

interface QRCanvasComponentProps {
  courseProp: string;
}

export default function QRCanvasComponent({
  courseProp,
}: QRCanvasComponentProps) {
  const [backendUrl, setBackendUrl] = useState<string | undefined>(undefined);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<string | null>(courseProp);

  useEffect(() => {
    QrEnvVariable().then((result) => {
      setBackendUrl(result.url);
    });
  }, []);

  useEffect(() => {
    if (!backendUrl) return;
    const fetchQRCode = async (courseId: string) => {
      try {
        const response = await fetch(`${backendUrl}/api/qr/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course: courseId }),
        });

        if (!response.ok) {
          const out = await response.json();
          console.error(out);
          throw new Error(
            `Failed to fetch QR code: HTTP ${response.status} - ${response.statusText}`
          );
        }

        const output: Response = await response.json();

        if (output.success && output.data) {
          setQrCode(output.data.QRCode);
          setCourse(output.data.course);
        } else {
          throw new Error(
            `Unexpected response format: ${JSON.stringify(output)}`
          );
        }
      } catch (error) {
        console.error(
          `${backendUrl + "/api/qr/generate"} Failed to fetch QR code:`,
          error
        );
        setQrCode(null);
        setCourse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode(courseProp);
  }, [courseProp, backendUrl]);

  return (
    <>
      {isLoading ? (
        <Loading variant="spinner" size="lg" />
      ) : (
        qrCode && (
          <Image
            src={qrCode}
            alt={`QR Code for ${course}`}
            className="max-w-full h-auto"
            width="600"
            height="600"
          />
        )
      )}
    </>
  );
}

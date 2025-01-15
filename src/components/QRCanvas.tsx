"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import QrEnvVariable from "@/actions/qr-backend";

interface QRCanvasComponentProps {
  venueProp: string;
}

export default function QRCanvasComponent({
  venueProp,
}: QRCanvasComponentProps) {
  const [backendUrl, setBackendUrl] = useState<string | undefined>(undefined);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [venue, setVenue] = useState<string | null>(venueProp);

  useEffect(() => {
    QrEnvVariable().then((result) => {
      setBackendUrl(result.url);
    });
  }, []);

  useEffect(() => {
    if (!backendUrl) return;
    const fetchQRCode = async (venueId: string) => {
      try {
        const response = await fetch(`${backendUrl}/api/qr/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ venueId }),
        });

        const data = await response.json();
        setQrCode(data.QRCode);
        setVenue(data.venue);
      } catch (error) {
        console.error(
          `${backendUrl + "/api/qr/generate"} Failed to fetch QR code:`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode(venueProp);
  }, [venueProp, backendUrl]);

  return (
    <>
      {isLoading ? (
        <Loading variant="spinner" size="lg" />
      ) : (
        qrCode && (
          <Image
            src={qrCode}
            alt={`QR Code for ${venue}`}
            className="max-w-full h-auto"
            width="600"
            height="600"
          />
        )
      )}
    </>
  );
}

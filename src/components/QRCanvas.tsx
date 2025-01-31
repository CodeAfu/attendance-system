"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import QrEnvVariable from "@/actions/qr-backend";
import { APIResponse } from "@/utils/types";
import { useQRData } from "@/context/QRDataContext";

interface UserResponseData {
  QRCode: string;
  course: string;
  venue: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function QRCanvasComponent() {
  const [backendUrl, setBackendUrl] = useState<string | undefined>(undefined);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const {
    course,
    venue,
    generateTrigger,
    setCourse,
    setVenue,
    setGenerateTrigger,
  } = useQRData();

  useEffect(() => {
    QrEnvVariable().then((result) => {
      setBackendUrl(result.url);
    });
  }, []);

  useEffect(() => {
    if (!generateTrigger || !backendUrl) return;

    const fetchQRCode = async (courseId: string) => {
      setStatus("loading");
      try {
        const response = await fetch(`${backendUrl}/api/qr/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course: courseId, venue }),
        });

        if (!response.ok) {
          if (response.status === 400) {
            const output = await response.json();
            setErrorMessage(output.message);
          }
          throw new Error(
            `Failed to fetch QR code: HTTP ${response.status} - ${response.statusText}`
          );
        }

        const output: APIResponse<UserResponseData> = await response.json();

        if (output.success && output.data) {
          setQrCode(output.data.QRCode);
          setCourse(output.data.course);
          setVenue(output.data.venue);
          setStatus("success");
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
        setCourse("");
        setStatus("error");
      } finally {
        setGenerateTrigger(false);
      }
    };

    fetchQRCode(course);
  }, [
    generateTrigger,
    course,
    venue,
    backendUrl,
    setCourse,
    setVenue,
    setGenerateTrigger,
  ]);

  return (
    <>
      {status === "loading" && <Loading variant="spinner" size="lg" />}
      {status === "success" && qrCode && (
        <Image
          src={qrCode}
          alt={`QR Code for ${course}`}
          width="600"
          className="max-w-full h-auto"
          height="600"
        />
      )}
      {status === "error" && (
        <div className="text-red-600 text-center mt-4 tracking-tight">
          <span className="font-semibold">Error: </span>
          {errorMessage ? (
            <span>{errorMessage}</span>
          ) : (
            <span>Unknown error occurred.</span>
          )}
          <br />
        </div>
      )}
      {status === "idle" && !generateTrigger && (
        <div className="text-gray-600 text-center mt-4 tracking-tight">
          <span className="font-semibold">Waiting to generate QR Code.</span>
        </div>
      )}
    </>
  );
}

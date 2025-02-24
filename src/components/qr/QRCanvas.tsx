"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import { APIResponse } from "@/lib/types";
import { useQRData } from "@/context/qrdata-context";

interface UserResponseData {
  QRCode: string;
  course: string;
  venue: string;
  url: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function QRCanvas() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const { data, generateTrigger, setData, setGenerateTrigger } = useQRData();

  useEffect(() => {
    if (!generateTrigger) return;

    const fetchQRCode = async (courseId: string) => {
      setStatus("loading");
      try {
        const response = await fetch("/api/qr/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: courseId,
            venue: data.venue,
            url: data.url,
          }),
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

        const output = (await response.json()) as APIResponse<UserResponseData>;

        if (output.success && output.data) {
          setData(() => ({
            course: output.data.course,
            venue: output.data.venue,
            qrCode: output.data.QRCode,
            url: output.data.url,
          }));
          setStatus("success");
        } else {
          throw new Error(
            `Unexpected response format: ${JSON.stringify(output)}`
          );
        }
      } catch (error) {
        console.error(error);
        // setData({
        // course: "",
        // venue: "",
        // qrCode: null,
        // url: "#",
        // });
        setStatus("error");
      } finally {
        setGenerateTrigger(false);
      }
    };

    fetchQRCode(data.course);
  }, [data, generateTrigger, setData, setGenerateTrigger]);

  return (
    <>
      {status === "loading" && <Loading variant="spinner" size="lg" />}
      {status === "success" && data.qrCode && (
        <Image
          src={data.qrCode}
          alt={`QR Code for ${data.course}`}
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
        <div className="text-gray-600/50 text-center mt-4 tracking-tight select-none">
          <span className="">Waiting to generate QR Code.</span>
        </div>
      )}
    </>
  );
}

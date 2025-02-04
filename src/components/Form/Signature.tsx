"use client";
import React from "react";
import SignatureCanvasComponent from "./SignatureCanvas";

interface SignatureComponentProps {
  name: string;
}

export default function SignatureComponent({ name }: SignatureComponentProps) {
  return (
    <div className="mb-4">
      <div className="block text-gray-700 font-semibold mb-1">Signature:</div>
      <SignatureCanvasComponent name={name} />
    </div>
  );
}

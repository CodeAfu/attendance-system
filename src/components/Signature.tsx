import React from "react";
import CanvasComponent from "./Canvas";

export default function SignatureComponent() {
  return (
    <div className="mb-4">
      <div className="block text-gray-700 font-semibold mb-1">Signature:</div>
      <CanvasComponent />
    </div>
  );
}

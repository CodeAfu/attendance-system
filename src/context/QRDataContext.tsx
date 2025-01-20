import React, { createContext, ReactNode, useState, useContext } from "react";

interface QRContextType {
  venue: string;
  course: string;
  qrCode: string;
  setVenue: (value: string) => void;
  setCourse: (value: string) => void;
  setQRCode: (value: string) => void;
}

const QRDataContext = createContext<QRContextType | null>(null);

export function QRDataProvider({ children }: { children: ReactNode }) {
  const [qrCode, setQRCode] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  return (
    <QRDataContext.Provider
      value={{ venue, course, qrCode, setVenue, setCourse, setQRCode }}
    >
      {children}
    </QRDataContext.Provider>
  );
}

export function useQRData() {
  const context = useContext(QRDataContext);
  if (!context) {
    throw new Error("useQRData must be used within a QRDataProvider");
  }
  return context;
}

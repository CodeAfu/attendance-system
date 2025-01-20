import React, { createContext, ReactNode, useState, useContext } from "react";

interface QRContextType {
  venue: string;
  course: string;
  qrCode: string;
  generateTrigger: boolean;
  setVenue: (value: string) => void;
  setCourse: (value: string) => void;
  setQRCode: (value: string) => void;
  setGenerateTrigger: (value: boolean) => void;
}

const QRDataContext = createContext<QRContextType | null>(null);

export function QRDataProvider({ children }: { children: ReactNode }) {
  const [qrCode, setQRCode] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [generateTrigger, setGenerateTrigger] = useState<boolean>(false);

  return (
    <QRDataContext.Provider
      value={{
        venue,
        course,
        qrCode,
        generateTrigger,
        setVenue,
        setCourse,
        setQRCode,
        setGenerateTrigger,
      }}
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

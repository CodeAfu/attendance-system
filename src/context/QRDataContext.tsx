import React, { createContext, ReactNode, useState } from "react";

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
  const [qrCode, setQRCode] = useState("");
  const [venue, setVenue] = useState("");
  const [course, setCourse] = useState("");
  
  return (
    <QRDataContext.Provider value={{ venue, course, qrCode: qrCode, setVenue, setCourse, setQRCode }}>
      {children}
    </QRDataContext.Provider>
  );
}

export function useQRData() {
  const context = React.useContext(QRDataContext);
  if (!context) {
    throw new Error("useQRData must be used within a QRDataProvider");
  }
  return context;
}

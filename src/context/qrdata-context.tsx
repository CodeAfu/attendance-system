import React, { createContext, ReactNode, useState, useContext } from "react";
import { QRData } from "@/lib/types";

interface QRContextType {
  data: QRData;
  generateTrigger: boolean;
  setData: React.Dispatch<React.SetStateAction<QRData>>;
  setGenerateTrigger: (value: boolean) => void;
}

const QRDataContext = createContext<QRContextType | null>(null);

export function QRDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<QRData>({
    venue: "",
    course: "",
    qrCode: null,
    url: "#",
  });
  const [generateTrigger, setGenerateTrigger] = useState<boolean>(false);

  return (
    <QRDataContext.Provider
      value={{
        data,
        generateTrigger,
        setData,
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

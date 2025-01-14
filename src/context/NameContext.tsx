import React, { createContext, useContext, useState, ReactNode } from "react";

interface NameContextType {
  name: string;
  setName: (value: string) => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export function NameProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

export function useName() {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
}

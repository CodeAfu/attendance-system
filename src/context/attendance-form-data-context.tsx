import { createContext, ReactNode, useContext, useState } from "react";

interface AttendanceFormDataType {
  course: string;
  venue?: string;
  name: string;
  base64Signature: string;
  setCourse: (value: string) => void;
  setVenue: (value: string) => void;
  setName: (value: string) => void;
  setBase64Signature: (value: string) => void;
}

const AttendanceFormDataContext = createContext<AttendanceFormDataType | null>(
  null
);

export function AttendanceFormDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [course, setCourse] = useState("");
  const [venue, setVenue] = useState("");
  const [name, setName] = useState("");
  const [base64Signature, setBase64Signature] = useState("");

  return (
    <AttendanceFormDataContext.Provider
      value={{
        course,
        venue,
        name,
        base64Signature,
        setCourse,
        setVenue,
        setName,
        setBase64Signature,
      }}
    >
      {children}
    </AttendanceFormDataContext.Provider>
  );
}

export function useAttendanceFormData() {
  const context = useContext(AttendanceFormDataContext);
  if (!context) {
    throw new Error(
      "useAttendanceFormData must be used within a AttendanceFormDataProvider"
    );
  }
  return context;
}

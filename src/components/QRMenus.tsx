"use client";
import React, { useState } from "react";
import Dropdown from "@/components/Dropdown";
import { useQRData } from "@/context/QRDataContext";

interface Data {
  id: number;
  course: string;
  venue: string;
}

const data: Data[] = [
  { id: 1, course: "CourseID_1", venue: "A-05-04" },
  { id: 2, course: "CourseID_2", venue: "A-04-04" },
  { id: 3, course: "CourseID_3", venue: "A-06-04" },
];

export default function QRMenus() {
  const { setVenue, setCourse, setGenerateTrigger } = useQRData();
  const [isFetching, setIsFetching] = useState(false);
  // const [, setBackendUrl] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   QrEnvVariable().then((result) => {
  //     setBackendUrl(result.url);
  //   });
  // }, []);

  const renderField = <T,>(
    label: string,
    data: T[],
    labelProperty: (item: T) => string,
    onChange: (item: T) => void
  ) => {
    return (
      <div className="grid grid-cols-4 gap-4 max-w-[600px] items-center mb-1">
        <h1 className="text-xl font-semibold col-span-1">{label}:</h1>
        <Dropdown
          items={data}
          labelProperty={labelProperty}
          onChange={onChange}
          classArgs={"col-span-3"}
        />
      </div>
    );
  };

  const handleGenerateQRCode = async () => {
    setIsFetching(true);
    setGenerateTrigger(true);
    setIsFetching(false);
  };

  // const getForm = async () => {
  //   try {
  //     setIsFetching(true);
  //     // const url = await fetch(`${backendUrl}/api/qr/scan`);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  return (
    <div>
      {renderField(
        "Course",
        data,
        (item: Data) => item.course,
        (item: Data) => setCourse(item.course)
      )}
      {renderField(
        "Venue",
        data,
        (item: Data) => item.venue,
        (item: Data) => setVenue(item.venue)
      )}
      <button
        type="button"
        className={`mt-4 border font-semibold px-4 py-2 rounded-md transition duration-200
          ${
            isFetching
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        onClick={handleGenerateQRCode}
        disabled={isFetching}
      >
        Generate QR Code
      </button>
    </div>
  );
}

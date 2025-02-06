"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQRData } from "@/context/QRDataContext";
import { ComboBox } from "@/components/ui/combobox";

interface Data {
  id: number;
  course: string;
  venue: string;
}

interface ComboBoxItem {
  value: string;
  label: string;
}

const sampleData: Data[] = [
  { id: 1, course: "CourseID_1", venue: "A-05-04" },
  { id: 2, course: "CourseID_2", venue: "A-04-04" },
  { id: 3, course: "CourseID_3", venue: "A-06-04" },
];

export default function QRMenus() {
  const { data, setGenerateTrigger } = useQRData();
  const [isFetching, setIsFetching] = useState(false);

  const courseItems = sampleData.map((item) => ({
    value: item.course,
    label: item.course,
  })) as ComboBoxItem[];

  const venueItems = sampleData.map((item) => ({
    value: item.venue,
    label: item.venue,
  })) as ComboBoxItem[];

  // const renderField = <T,>(
  //   label: string,
  //   value: T[],
  //   labelProperty: (item: T) => string,
  //   onChange: (item: T) => void
  // ) => {
  //   return (
  //     <div className="grid grid-cols-4 gap-4 max-w-[600px] items-center mb-1">
  //       <h1 className="text-xl font-semibold col-span-1">{label}:</h1>
  //       <Dropdown
  //         items={value}
  //         labelProperty={labelProperty}
  //         onChange={onChange}
  //         classArgs={"col-span-3"}
  //       />
  //     </div>
  //   );
  // };

  const handleGenerateQRCode = async () => {
    setIsFetching(true);
    setGenerateTrigger(true);
    setIsFetching(false);
  };

  return (
    <div>
      {/* TODO: Convert to flex with a fixed size for span */}
      <div className="md:grid md:grid-cols-4 gap-2 max-w-[600px] items-center">
        <span className="col-span-1 text-xl">Course:</span>
        <div className="col-span-3">
          <ComboBox items={courseItems} fieldType={"course"} />
        </div>{" "}
        <span className="col-span-1 text-xl">Venue:</span>
        <div className="col-span-3">
          <ComboBox items={venueItems} fieldType={"venue"} />
        </div>
      </div>

      <div className="flex justify-between">
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
        {data.qrCode && (
          <div className="flex justify-end items-end text-sm font-semibold text-purple-700 underline hover:text-purple-500 transition duration-200">
            <Link href={data.url} target="_blank" rel="noopener noreferrer">
              Link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

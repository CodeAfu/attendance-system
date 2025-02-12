"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQRData } from "@/context/QRDataContext";
import { ComboBox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

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

  const handleGenerateQRCode = async () => {
    setIsFetching(true);
    setGenerateTrigger(true);
    setIsFetching(false);
  };

  return (
    <div>
      {/* TODO: Convert to flex with a fixed size for span */}
      <div className="md:grid md:grid-cols-4 md:items-center flex flex-col gap-2 max-w-[400px] ">
        <span className="col-span-1 text-md px-2">Course:</span>
        <div className="col-span-3">
          <ComboBox items={courseItems} fieldType={"course"} />
        </div>{" "}
        <span className="col-span-1 text-md px-2">Venue:</span>
        <div className="col-span-3">
          <ComboBox items={venueItems} fieldType={"venue"} />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handleGenerateQRCode}
          disabled={isFetching}
          className={`md:mt-4 mt-6 ${
            isFetching ? "opacity-50 bg-red-50 cursor-not-allowed" : ""
          }`}
        >
          Generate QR Code
        </Button>
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

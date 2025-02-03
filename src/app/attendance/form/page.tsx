import AttendanceForm from "@/components/AttendanceForm";
// import { type PageProps } from "next/app";
import React from "react";

type Data = {
  course: string;
  venue: string;
};

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const course = resolvedSearchParams.course as string;
  const venue = resolvedSearchParams.venue as string;

  // TODO: Validate the existence of the course and return not-found page if false

  const data: Data = {
    course,
    venue,
  };

  return (
    <div className="container">
      <AttendanceForm title="Attendance" data={data ? data : undefined} />
    </div>
  );
}

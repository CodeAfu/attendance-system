import NotFound from "@/app/not-found";
import AttendanceForm from "@/components/AttendanceForm";
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

  if (!course || !venue) {
    return <NotFound message="Please provide a course and venue value" />;
  }

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

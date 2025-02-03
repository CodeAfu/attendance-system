import AttendanceForm from "@/components/AttendanceForm";
import React from "react";

type Data = {
  course: string;
  venue: string;
};

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;

  const course = params["course"] as string;
  const venue = params["venue"] as string;

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

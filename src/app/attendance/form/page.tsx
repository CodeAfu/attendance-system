import NotFound from "@/app/not-found";
import AttendanceForm from "@/components/form/attendance-form";
import React from "react";
import { z } from "zod";

const searchParamsSchema = z.object({
  course: z.string().min(1),
  venue: z.string().min(1),
});

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const parsedSearchParams = searchParamsSchema.safeParse(resolvedSearchParams);

  if (!parsedSearchParams.success) {
    return <NotFound />;
  }

  return (
    <div className="container">
      <AttendanceForm title="Attendance" data={parsedSearchParams.data} />
    </div>
  );
}

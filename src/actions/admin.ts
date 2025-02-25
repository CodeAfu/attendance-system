"use server";

import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllAttendanceRecords = cache(async () => {
  const session = await verifySession();
  if (!session || session.role !== "admin") return null

  try {
    const records = await prisma.attendanceRecord.findMany();
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
})
  
/*
  Warnings:

  - You are about to drop the column `date` on the `AttendanceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `traineeRecordId` on the `AttendanceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `AttendanceRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "AttendanceRecord_traineeRecordId_fkey";

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "date",
DROP COLUMN "traineeRecordId",
DROP COLUMN "venue",
ADD COLUMN     "traineeId" TEXT;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

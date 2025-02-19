/*
  Warnings:

  - You are about to drop the column `attendanceRecordId` on the `TraineeRecord` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TraineeRecord" DROP CONSTRAINT "TraineeRecord_attendanceRecordId_fkey";

-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "traineeRecordId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "trainerName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TraineeRecord" DROP COLUMN "attendanceRecordId";

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_traineeRecordId_fkey" FOREIGN KEY ("traineeRecordId") REFERENCES "TraineeRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

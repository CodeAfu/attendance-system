/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `TraineeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TraineeRecord" ADD COLUMN     "attendanceRecordId" TEXT,
ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "lockStart" TIMESTAMP(3),
    "lockEnd" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "trainerName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "venue" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "base64Signature" TEXT NOT NULL,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemUser_email_key" ON "SystemUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- AddForeignKey
ALTER TABLE "TraineeRecord" ADD CONSTRAINT "TraineeRecord_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeRecord" ADD CONSTRAINT "TraineeRecord_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

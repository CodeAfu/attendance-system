-- DropForeignKey
ALTER TABLE "TraineeRecord" DROP CONSTRAINT "TraineeRecord_courseId_fkey";

-- AlterTable
ALTER TABLE "TraineeRecord" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TraineeRecord" ADD CONSTRAINT "TraineeRecord_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

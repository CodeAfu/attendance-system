-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lockEnd" TIMESTAMP(3),
ADD COLUMN     "lockStart" TIMESTAMP(3);

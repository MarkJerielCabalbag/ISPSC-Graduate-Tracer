/*
  Warnings:

  - You are about to drop the column `totalGraduates` on the `Responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Responses" DROP COLUMN "totalGraduates";

-- CreateTable
CREATE TABLE "TotalGraduates" (
    "id" SERIAL NOT NULL,
    "yearOfGraduation" INTEGER NOT NULL,
    "program" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "totalGraduates" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TotalGraduates_pkey" PRIMARY KEY ("id")
);

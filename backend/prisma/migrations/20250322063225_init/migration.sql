/*
  Warnings:

  - You are about to drop the `TotalGraduates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TotalGraduates";

-- CreateTable
CREATE TABLE "Total" (
    "id" SERIAL NOT NULL,
    "yearOfGraduation" INTEGER NOT NULL,
    "program" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "totalGraduates" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Total_pkey" PRIMARY KEY ("id")
);

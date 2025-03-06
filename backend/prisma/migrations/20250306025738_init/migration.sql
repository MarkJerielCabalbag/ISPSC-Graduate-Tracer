/*
  Warnings:

  - You are about to drop the column `collegeDepartment` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `graduateProgram` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `underGraduateProgram` on the `responses` table. All the data in the column will be lost.
  - Added the required column `department` to the `Responses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `Responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Major_programId_fkey` ON `major`;

-- DropIndex
DROP INDEX `Program_departmentId_fkey` ON `program`;

-- AlterTable
ALTER TABLE `responses` DROP COLUMN `collegeDepartment`,
    DROP COLUMN `graduateProgram`,
    DROP COLUMN `underGraduateProgram`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `program` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

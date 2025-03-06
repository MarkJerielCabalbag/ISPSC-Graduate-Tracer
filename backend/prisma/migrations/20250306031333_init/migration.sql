-- DropIndex
DROP INDEX `Major_programId_fkey` ON `major`;

-- DropIndex
DROP INDEX `Program_departmentId_fkey` ON `program`;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

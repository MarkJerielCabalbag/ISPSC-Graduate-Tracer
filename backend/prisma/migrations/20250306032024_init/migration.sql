-- DropIndex
DROP INDEX `Major_programId_fkey` ON `major`;

-- DropIndex
DROP INDEX `Program_departmentId_fkey` ON `program`;

-- AlterTable
ALTER TABLE `responses` MODIFY `fullName` VARCHAR(191) NULL,
    MODIFY `yearOfGraduation` INTEGER NULL,
    MODIFY `yearOfSurvey` INTEGER NULL,
    MODIFY `currentlyEmployed` VARCHAR(191) NULL,
    MODIFY `isJobAligned` VARCHAR(191) NULL,
    MODIFY `isSelfEmployed` VARCHAR(191) NULL,
    MODIFY `isFurtherStudies` VARCHAR(191) NULL,
    MODIFY `typeOfOrganization` VARCHAR(191) NULL,
    MODIFY `currentJobLocated` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `department` VARCHAR(191) NULL,
    MODIFY `program` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

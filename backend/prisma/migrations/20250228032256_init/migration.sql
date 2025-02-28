-- CreateTable
CREATE TABLE `Responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yearOfSurver` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `yearOfGraduation` INTEGER NOT NULL,
    `yearOfSurvey` INTEGER NOT NULL,
    `collegeDepartment` VARCHAR(191) NOT NULL,
    `underGraduateProgram` VARCHAR(191) NOT NULL,
    `graduateProgram` VARCHAR(191) NOT NULL,
    `currentlyEmployed` VARCHAR(191) NOT NULL,
    `isJobAligned` VARCHAR(191) NOT NULL,
    `isSelfEmployed` VARCHAR(191) NOT NULL,
    `isFurtherStudies` VARCHAR(191) NOT NULL,
    `typeOfOrganization` VARCHAR(191) NOT NULL,
    `currentJobLocated` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `program` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `departmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `major` VARCHAR(191) NOT NULL,
    `programId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

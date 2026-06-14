-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` TEXT NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `belt` ENUM('WHITE', 'YELLOW', 'ORANGE', 'GREEN', 'BLUE', 'PURPLE', 'BROWN', 'BLACK') NOT NULL,
    `style` VARCHAR(191) NOT NULL,
    `instructorName` VARCHAR(191) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `kata` BOOLEAN NOT NULL DEFAULT true,
    `kumite` BOOLEAN NOT NULL DEFAULT true,
    `declarationAccepted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Student_belt_idx`(`belt`),
    INDEX `Student_age_idx`(`age`),
    INDEX `Student_weight_idx`(`weight`),
    INDEX `Student_gender_idx`(`gender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

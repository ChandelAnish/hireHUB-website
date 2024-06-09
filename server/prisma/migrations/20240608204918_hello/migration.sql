-- CreateTable
CREATE TABLE `userinfo` (
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `usertype` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_post` (
    `id` VARCHAR(191) NOT NULL,
    `joblogo` VARCHAR(191) NOT NULL,
    `jobtitle` VARCHAR(191) NOT NULL,
    `jobtype` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `posttime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `job_post` ADD CONSTRAINT `job_post_user_fkey` FOREIGN KEY (`user`) REFERENCES `userinfo`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

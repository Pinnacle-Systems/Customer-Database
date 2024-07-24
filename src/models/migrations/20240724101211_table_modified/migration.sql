/*
  Warnings:

  - You are about to drop the column `customerId` on the `customerrelations` table. All the data in the column will be lost.
  - Added the required column `relationId` to the `customerRelations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `customerId` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customerrelations` DROP COLUMN `customerId`,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `relationId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `customerRelations` ADD CONSTRAINT `customerRelations_relationId_fkey` FOREIGN KEY (`relationId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

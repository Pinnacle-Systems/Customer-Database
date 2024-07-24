/*
  Warnings:

  - You are about to drop the column `customerId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `relationId` on the `customerrelations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customerrelations` DROP FOREIGN KEY `customerRelations_relationId_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customerId`,
    ADD COLUMN `customerDetId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customerrelations` DROP COLUMN `relationId`,
    ADD COLUMN `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `customerRelations` ADD CONSTRAINT `customerRelations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

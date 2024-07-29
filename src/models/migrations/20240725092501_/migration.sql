/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - The required column `customerId` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `customerId` on table `customerrelations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `customerrelations` DROP FOREIGN KEY `customerRelations_customerId_fkey`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `customerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customerrelations` MODIFY `customerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_customerId_key` ON `Customer`(`customerId`);

-- AddForeignKey
ALTER TABLE `customerRelations` ADD CONSTRAINT `customerRelations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

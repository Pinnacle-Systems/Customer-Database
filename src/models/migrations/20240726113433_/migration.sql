/*
  Warnings:

  - You are about to drop the column `customerId` on the `customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Customer_customerId_key` ON `customer`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customerId`;

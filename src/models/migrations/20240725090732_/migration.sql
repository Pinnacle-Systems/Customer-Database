/*
  Warnings:

  - You are about to drop the column `PurchaseDate` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseAmount` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `PurchaseDate`,
    DROP COLUMN `members`,
    DROP COLUMN `purchaseAmount`,
    DROP COLUMN `totalValue`;

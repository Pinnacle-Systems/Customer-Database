/*
  Warnings:

  - You are about to drop the column `gender` on the `customerrelations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customerrelations` DROP COLUMN `gender`,
    ADD COLUMN `type` VARCHAR(191) NULL;

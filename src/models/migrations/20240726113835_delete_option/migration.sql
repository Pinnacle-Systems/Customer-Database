-- DropForeignKey
ALTER TABLE `customerrelations` DROP FOREIGN KEY `customerRelations_customerId_fkey`;

-- AddForeignKey
ALTER TABLE `customerRelations` ADD CONSTRAINT `customerRelations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

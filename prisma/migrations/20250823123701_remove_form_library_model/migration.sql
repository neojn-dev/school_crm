/*
  Warnings:

  - You are about to drop the `FormLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FormLibrary` DROP FOREIGN KEY `FormLibrary_userId_fkey`;

-- DropTable
DROP TABLE `FormLibrary`;

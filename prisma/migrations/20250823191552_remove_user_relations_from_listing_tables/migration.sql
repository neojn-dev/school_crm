/*
  Warnings:

  - You are about to drop the column `userId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Engineer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Engineer` DROP FOREIGN KEY `Engineer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Lawyer` DROP FOREIGN KEY `Lawyer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MasterData` DROP FOREIGN KEY `MasterData_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Teacher` DROP FOREIGN KEY `Teacher_userId_fkey`;

-- DropIndex
DROP INDEX `Doctor_userId_department_isActive_idx` ON `Doctor`;

-- DropIndex
DROP INDEX `Doctor_userId_isActive_idx` ON `Doctor`;

-- DropIndex
DROP INDEX `Engineer_userId_department_isActive_idx` ON `Engineer`;

-- DropIndex
DROP INDEX `Engineer_userId_isActive_idx` ON `Engineer`;

-- DropIndex
DROP INDEX `Lawyer_userId_department_isActive_idx` ON `Lawyer`;

-- DropIndex
DROP INDEX `Lawyer_userId_isActive_idx` ON `Lawyer`;

-- DropIndex
DROP INDEX `Teacher_userId_department_isActive_idx` ON `Teacher`;

-- DropIndex
DROP INDEX `Teacher_userId_isActive_idx` ON `Teacher`;

-- AlterTable
ALTER TABLE `Doctor` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Engineer` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Lawyer` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `MasterData` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `userId`;

-- CreateIndex
CREATE INDEX `Doctor_isActive_idx` ON `Doctor`(`isActive`);

-- CreateIndex
CREATE INDEX `Doctor_department_isActive_idx` ON `Doctor`(`department`, `isActive`);

-- CreateIndex
CREATE INDEX `Engineer_isActive_idx` ON `Engineer`(`isActive`);

-- CreateIndex
CREATE INDEX `Engineer_department_isActive_idx` ON `Engineer`(`department`, `isActive`);

-- CreateIndex
CREATE INDEX `Lawyer_isActive_idx` ON `Lawyer`(`isActive`);

-- CreateIndex
CREATE INDEX `Lawyer_department_isActive_idx` ON `Lawyer`(`department`, `isActive`);

-- CreateIndex
CREATE INDEX `Teacher_isActive_idx` ON `Teacher`(`isActive`);

-- CreateIndex
CREATE INDEX `Teacher_department_isActive_idx` ON `Teacher`(`department`, `isActive`);

/*
  Warnings:

  - You are about to drop the column `autocompleteField` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `comboboxField` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `cssClass` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `dependsOn` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `documentPath` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `fieldSize` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `fieldWidth` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `helpText` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `inputMode` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `isRequired` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `maxLength` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `minLength` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `multiInputField` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `multiple` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `pattern` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `placeholder` on the `MasterData` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `MasterData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MasterData` DROP COLUMN `autocompleteField`,
    DROP COLUMN `comboboxField`,
    DROP COLUMN `condition`,
    DROP COLUMN `cssClass`,
    DROP COLUMN `dependsOn`,
    DROP COLUMN `documentPath`,
    DROP COLUMN `fieldSize`,
    DROP COLUMN `fieldWidth`,
    DROP COLUMN `filePath`,
    DROP COLUMN `helpText`,
    DROP COLUMN `imagePath`,
    DROP COLUMN `inputMode`,
    DROP COLUMN `isDisabled`,
    DROP COLUMN `isRequired`,
    DROP COLUMN `isVisible`,
    DROP COLUMN `maxLength`,
    DROP COLUMN `maxValue`,
    DROP COLUMN `minLength`,
    DROP COLUMN `minValue`,
    DROP COLUMN `multiInputField`,
    DROP COLUMN `multiple`,
    DROP COLUMN `pattern`,
    DROP COLUMN `placeholder`,
    DROP COLUMN `step`;

/*
  Warnings:

  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnnouncementAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsNavigation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsPageBlock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsSeoSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsSiteSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CmsTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenderAttachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `AnnouncementAttachment` DROP FOREIGN KEY `AnnouncementAttachment_announcementId_fkey`;

-- DropForeignKey
ALTER TABLE `BlogAttachment` DROP FOREIGN KEY `BlogAttachment_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `BlogPost` DROP FOREIGN KEY `BlogPost_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsBlock` DROP FOREIGN KEY `CmsBlock_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsBlock` DROP FOREIGN KEY `CmsBlock_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsMedia` DROP FOREIGN KEY `CmsMedia_uploadedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsNavigation` DROP FOREIGN KEY `CmsNavigation_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsNavigation` DROP FOREIGN KEY `CmsNavigation_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsNavigation` DROP FOREIGN KEY `CmsNavigation_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsNavigation` DROP FOREIGN KEY `CmsNavigation_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPage` DROP FOREIGN KEY `CmsPage_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPage` DROP FOREIGN KEY `CmsPage_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPage` DROP FOREIGN KEY `CmsPage_templateId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPage` DROP FOREIGN KEY `CmsPage_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPageBlock` DROP FOREIGN KEY `CmsPageBlock_blockId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsPageBlock` DROP FOREIGN KEY `CmsPageBlock_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsSeoSettings` DROP FOREIGN KEY `CmsSeoSettings_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsSiteSettings` DROP FOREIGN KEY `CmsSiteSettings_homepageId_fkey`;

-- DropForeignKey
ALTER TABLE `CmsSiteSettings` DROP FOREIGN KEY `CmsSiteSettings_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsTemplate` DROP FOREIGN KEY `CmsTemplate_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `CmsTemplate` DROP FOREIGN KEY `CmsTemplate_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `Tender` DROP FOREIGN KEY `Tender_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `TenderAttachment` DROP FOREIGN KEY `TenderAttachment_tenderId_fkey`;

-- DropTable
DROP TABLE `Announcement`;

-- DropTable
DROP TABLE `AnnouncementAttachment`;

-- DropTable
DROP TABLE `BlogAttachment`;

-- DropTable
DROP TABLE `BlogPost`;

-- DropTable
DROP TABLE `CmsBlock`;

-- DropTable
DROP TABLE `CmsMedia`;

-- DropTable
DROP TABLE `CmsNavigation`;

-- DropTable
DROP TABLE `CmsPage`;

-- DropTable
DROP TABLE `CmsPageBlock`;

-- DropTable
DROP TABLE `CmsSeoSettings`;

-- DropTable
DROP TABLE `CmsSiteSettings`;

-- DropTable
DROP TABLE `CmsTemplate`;

-- DropTable
DROP TABLE `Tender`;

-- DropTable
DROP TABLE `TenderAttachment`;

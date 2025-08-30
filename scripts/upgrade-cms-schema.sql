-- CMS Schema Upgrade Script
-- This script upgrades the existing database to support enhanced CMS features
-- Run this script after updating the Prisma schema

-- Upgrade BlogPost table
ALTER TABLE `BlogPost` 
ADD COLUMN `headerImage` VARCHAR(500) NULL AFTER `coverImage`,
ADD COLUMN `layout` VARCHAR(50) NOT NULL DEFAULT 'default' AFTER `headerImage`,
ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT FALSE AFTER `status`,
ADD COLUMN `metaTitle` VARCHAR(60) NULL AFTER `featured`,
ADD COLUMN `metaDescription` VARCHAR(160) NULL AFTER `metaTitle`,
ADD COLUMN `metaKeywords` TEXT NULL AFTER `metaDescription`,
ADD COLUMN `canonicalUrl` VARCHAR(500) NULL AFTER `metaKeywords`,
ADD COLUMN `ogTitle` VARCHAR(100) NULL AFTER `canonicalUrl`,
ADD COLUMN `ogDescription` VARCHAR(200) NULL AFTER `ogTitle`,
ADD COLUMN `ogImage` VARCHAR(500) NULL AFTER `ogDescription`,
ADD COLUMN `twitterCard` VARCHAR(20) NULL AFTER `ogImage`,
ADD COLUMN `category` VARCHAR(100) NULL AFTER `twitterCard`,
ADD COLUMN `readingTime` INT NULL AFTER `category`,
ADD COLUMN `viewCount` INT NOT NULL DEFAULT 0 AFTER `readingTime`,
ADD COLUMN `lastViewedAt` DATETIME(3) NULL AFTER `viewCount`,
ADD COLUMN `scheduledAt` DATETIME(3) NULL AFTER `lastViewedAt`,
ADD COLUMN `createdBy` VARCHAR(191) NULL AFTER `scheduledAt`,
ADD COLUMN `updatedBy` VARCHAR(191) NULL AFTER `createdBy`;

-- Upgrade BlogAttachment table
ALTER TABLE `BlogAttachment` 
ADD COLUMN `originalName` VARCHAR(255) NOT NULL DEFAULT '' AFTER `blogId`,
ADD COLUMN `altText` VARCHAR(255) NULL AFTER `url`,
ADD COLUMN `caption` TEXT NULL AFTER `altText`,
ADD COLUMN `width` INT NULL AFTER `caption`,
ADD COLUMN `height` INT NULL AFTER `width`,
ADD COLUMN `duration` INT NULL AFTER `height`;

-- Upgrade Announcement table
ALTER TABLE `Announcement` 
ADD COLUMN `slug` VARCHAR(200) UNIQUE NULL AFTER `title`,
ADD COLUMN `excerpt` VARCHAR(500) NULL AFTER `slug`,
ADD COLUMN `headerImage` VARCHAR(500) NULL AFTER `excerpt`,
ADD COLUMN `layout` VARCHAR(50) NOT NULL DEFAULT 'default' AFTER `headerImage`,
ADD COLUMN `status` VARCHAR(20) NOT NULL DEFAULT 'draft' AFTER `layout`,
ADD COLUMN `publishedAt` DATETIME(3) NULL AFTER `status`,
ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT FALSE AFTER `publishedAt`,
ADD COLUMN `metaTitle` VARCHAR(60) NULL AFTER `featured`,
ADD COLUMN `metaDescription` VARCHAR(160) NULL AFTER `metaTitle`,
ADD COLUMN `metaKeywords` TEXT NULL AFTER `metaDescription`,
ADD COLUMN `ogTitle` VARCHAR(100) NULL AFTER `metaKeywords`,
ADD COLUMN `ogDescription` VARCHAR(200) NULL AFTER `ogTitle`,
ADD COLUMN `ogImage` VARCHAR(500) NULL AFTER `ogDescription`,
ADD COLUMN `category` VARCHAR(100) NULL AFTER `ogImage`,
ADD COLUMN `priority` VARCHAR(20) NOT NULL DEFAULT 'normal' AFTER `category`,
ADD COLUMN `viewCount` INT NOT NULL DEFAULT 0 AFTER `priority`,
ADD COLUMN `lastViewedAt` DATETIME(3) NULL AFTER `viewCount`,
ADD COLUMN `createdBy` VARCHAR(191) NULL AFTER `lastViewedAt`,
ADD COLUMN `updatedBy` VARCHAR(191) NULL AFTER `createdBy`;

-- Upgrade AnnouncementAttachment table
ALTER TABLE `AnnouncementAttachment` 
ADD COLUMN `originalName` VARCHAR(255) NOT NULL DEFAULT '' AFTER `announcementId`,
ADD COLUMN `altText` VARCHAR(255) NULL AFTER `url`,
ADD COLUMN `caption` TEXT NULL AFTER `altText`,
ADD COLUMN `width` INT NULL AFTER `caption`,
ADD COLUMN `height` INT NULL AFTER `width`,
ADD COLUMN `duration` INT NULL AFTER `height`;

-- Upgrade Tender table
ALTER TABLE `Tender` 
ADD COLUMN `slug` VARCHAR(200) UNIQUE NULL AFTER `title`,
ADD COLUMN `excerpt` VARCHAR(500) NULL AFTER `slug`,
ADD COLUMN `headerImage` VARCHAR(500) NULL AFTER `excerpt`,
ADD COLUMN `layout` VARCHAR(50) NOT NULL DEFAULT 'default' AFTER `headerImage`,
ADD COLUMN `tenderType` VARCHAR(100) NULL AFTER `description`,
ADD COLUMN `estimatedValue` VARCHAR(100) NULL AFTER `tenderType`,
ADD COLUMN `currency` VARCHAR(10) NULL AFTER `estimatedValue`,
ADD COLUMN `status` VARCHAR(20) NOT NULL DEFAULT 'draft' AFTER `currency`,
ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT FALSE AFTER `status`,
ADD COLUMN `metaTitle` VARCHAR(60) NULL AFTER `featured`,
ADD COLUMN `metaDescription` VARCHAR(160) NULL AFTER `metaTitle`,
ADD COLUMN `metaKeywords` TEXT NULL AFTER `metaDescription`,
ADD COLUMN `ogTitle` VARCHAR(100) NULL AFTER `metaKeywords`,
ADD COLUMN `ogDescription` VARCHAR(200) NULL AFTER `ogTitle`,
ADD COLUMN `ogImage` VARCHAR(500) NULL AFTER `ogDescription`,
ADD COLUMN `category` VARCHAR(100) NULL AFTER `ogImage`,
ADD COLUMN `sector` VARCHAR(100) NULL AFTER `category`,
ADD COLUMN `viewCount` INT NOT NULL DEFAULT 0 AFTER `sector`,
ADD COLUMN `lastViewedAt` DATETIME(3) NULL AFTER `viewCount`,
ADD COLUMN `createdBy` VARCHAR(191) NULL AFTER `lastViewedAt`,
ADD COLUMN `updatedBy` VARCHAR(191) NULL AFTER `createdBy`;

-- Upgrade TenderAttachment table
ALTER TABLE `TenderAttachment` 
ADD COLUMN `originalName` VARCHAR(255) NOT NULL DEFAULT '' AFTER `tenderId`,
ADD COLUMN `altText` VARCHAR(255) NULL AFTER `url`,
ADD COLUMN `caption` TEXT NULL AFTER `altText`,
ADD COLUMN `width` INT NULL AFTER `caption`,
ADD COLUMN `height` INT NULL AFTER `width`,
ADD COLUMN `duration` INT NULL AFTER `height`;

-- Create indexes for better performance
CREATE INDEX `BlogPost_category_idx` ON `BlogPost`(`category`);
CREATE INDEX `BlogPost_featured_idx` ON `BlogPost`(`featured`);
CREATE INDEX `BlogPost_slug_idx` ON `BlogPost`(`slug`);

CREATE INDEX `Announcement_status_publishedAt_idx` ON `Announcement`(`status`, `publishedAt`);
CREATE INDEX `Announcement_priority_idx` ON `Announcement`(`priority`);
CREATE INDEX `Announcement_category_idx` ON `Announcement`(`category`);

CREATE INDEX `Tender_status_idx` ON `Tender`(`status`);
CREATE INDEX `Tender_tenderType_idx` ON `Tender`(`tenderType`);
CREATE INDEX `Tender_category_idx` ON `Tender`(`category`);
CREATE INDEX `Tender_sector_idx` ON `Tender`(`sector`);

-- Add foreign key constraints for user tracking
ALTER TABLE `BlogPost` 
ADD CONSTRAINT `BlogPost_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `BlogPost_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Announcement` 
ADD CONSTRAINT `Announcement_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `Announcement_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Tender` 
ADD CONSTRAINT `Tender_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `Tender_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Update existing records to have default values
UPDATE `BlogPost` SET 
  `layout` = 'default',
  `featured` = FALSE,
  `viewCount` = 0,
  `createdBy` = `authorId`,
  `updatedBy` = `authorId`
WHERE `layout` IS NULL;

UPDATE `Announcement` SET 
  `layout` = 'default',
  `status` = 'draft',
  `featured` = FALSE,
  `priority` = 'normal',
  `viewCount` = 0,
  `createdBy` = `authorId`,
  `updatedBy` = `authorId`
WHERE `layout` IS NULL;

UPDATE `Tender` SET 
  `layout` = 'default',
  `status` = 'draft',
  `featured` = FALSE,
  `viewCount` = 0,
  `createdBy` = `authorId`,
  `updatedBy` = `authorId`
WHERE `layout` IS NULL;

-- Update attachment tables to have default values
UPDATE `BlogAttachment` SET `originalName` = `filename` WHERE `originalName` = '';
UPDATE `AnnouncementAttachment` SET `originalName` = `filename` WHERE `originalName` = '';
UPDATE `TenderAttachment` SET `originalName` = `filename` WHERE `originalName` = '';

-- Create a view for easy content management
CREATE VIEW `cms_content_overview` AS
SELECT 
  'blog' as content_type,
  id,
  title,
  slug,
  status,
  featured,
  category,
  layout,
  publishedAt,
  createdAt,
  updatedAt,
  viewCount
FROM `BlogPost`
UNION ALL
SELECT 
  'announcement' as content_type,
  id,
  title,
  slug,
  status,
  featured,
  category,
  layout,
  publishedAt,
  createdAt,
  updatedAt,
  viewCount
FROM `Announcement`
UNION ALL
SELECT 
  'tender' as content_type,
  id,
  title,
  slug,
  status,
  featured,
  category,
  layout,
  publishedAt,
  createdAt,
  updatedAt,
  viewCount
FROM `Tender`;

-- Insert sample data for testing (optional)
INSERT INTO `BlogPost` (
  `id`, `title`, `slug`, `excerpt`, `content`, `status`, `featured`, 
  `category`, `layout`, `metaTitle`, `metaDescription`, `createdBy`, `updatedBy`
) VALUES (
  'sample-blog-1',
  'Welcome to Our Enhanced CMS',
  'welcome-enhanced-cms',
  'Discover the new features and capabilities of our upgraded content management system.',
  '<h1>Welcome to Our Enhanced CMS</h1><p>This is a sample blog post showcasing the new WYSIWYG editor and enhanced features.</p>',
  'published',
  TRUE,
  'Technology',
  'featured',
  'Welcome to Our Enhanced CMS',
  'Discover the new features and capabilities of our upgraded content management system.',
  (SELECT id FROM User LIMIT 1),
  (SELECT id FROM User LIMIT 1)
) ON DUPLICATE KEY UPDATE `updatedAt` = NOW();

-- Success message
SELECT 'CMS Schema upgrade completed successfully!' as message;


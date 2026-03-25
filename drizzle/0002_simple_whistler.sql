CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`excerpt` varchar(500),
	`category` varchar(100),
	`tags` varchar(500),
	`featuredImage` varchar(500),
	`authorId` int NOT NULL,
	`viewCount` int DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_postId_unique` UNIQUE(`postId`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donationId` varchar(64) NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(10) DEFAULT 'KES',
	`donorName` varchar(255),
	`donorEmail` varchar(320),
	`donorPhone` varchar(20),
	`paymentMethod` enum('paystack','pesapal','mpesa','card') NOT NULL,
	`paymentStatus` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`transactionId` varchar(255),
	`message` text,
	`receiptSent` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`),
	CONSTRAINT `donations_donationId_unique` UNIQUE(`donationId`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('bootcamp','workshop','training','other') NOT NULL,
	`type` enum('stem','msme','digital','other') NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`location` varchar(500),
	`capacity` int,
	`registeredCount` int DEFAULT 0,
	`imageUrl` varchar(500),
	`status` enum('upcoming','ongoing','completed','cancelled') DEFAULT 'upcoming',
	`createdBy` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `events_eventId_unique` UNIQUE(`eventId`)
);
--> statement-breakpoint
CREATE TABLE `gallery_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`album` varchar(100) NOT NULL,
	`imageUrl` varchar(500) NOT NULL,
	`thumbnailUrl` varchar(500),
	`displayOrder` int DEFAULT 0,
	`uploadedBy` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gallery_images_id` PRIMARY KEY(`id`),
	CONSTRAINT `gallery_images_imageId_unique` UNIQUE(`imageId`)
);
--> statement-breakpoint
CREATE TABLE `msme_lab_features` (
	`id` int AUTO_INCREMENT NOT NULL,
	`featureId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`displayOrder` int DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `msme_lab_features_id` PRIMARY KEY(`id`),
	CONSTRAINT `msme_lab_features_featureId_unique` UNIQUE(`featureId`)
);
--> statement-breakpoint
CREATE TABLE `social_media_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('facebook','instagram','youtube','twitter','linkedin','tiktok') NOT NULL,
	`url` varchar(500) NOT NULL,
	`displayName` varchar(255),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `social_media_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `social_media_links_platform_unique` UNIQUE(`platform`)
);
--> statement-breakpoint
CREATE TABLE `stem_hub` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`address` varchar(500) NOT NULL,
	`phone` varchar(20),
	`email` varchar(320),
	`imageUrl` varchar(500),
	`features` text,
	`capacity` int,
	`operatingHours` varchar(500),
	`isPublished` boolean NOT NULL DEFAULT true,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stem_hub_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`memberId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`bio` text,
	`photoUrl` varchar(500),
	`linkedinUrl` varchar(500),
	`email` varchar(320),
	`displayOrder` int DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `team_members_memberId_unique` UNIQUE(`memberId`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`testimonialId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`role` varchar(255),
	`content` text NOT NULL,
	`imageUrl` varchar(500),
	`category` enum('msme','stem','digital') NOT NULL,
	`rating` int DEFAULT 5,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`),
	CONSTRAINT `testimonials_testimonialId_unique` UNIQUE(`testimonialId`)
);

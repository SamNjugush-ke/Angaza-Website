CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('msme','stem','general') NOT NULL,
	`fileType` varchar(50) NOT NULL,
	`fileSize` int NOT NULL,
	`fileKey` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`uploadedBy` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`downloadCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`),
	CONSTRAINT `resources_resourceId_unique` UNIQUE(`resourceId`)
);

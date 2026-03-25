CREATE TABLE `content_engagement` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentType` enum('blog','event','resource','team','testimonial') NOT NULL,
	`contentId` varchar(64) NOT NULL,
	`contentTitle` varchar(255) NOT NULL,
	`viewCount` int NOT NULL DEFAULT 0,
	`shareCount` int NOT NULL DEFAULT 0,
	`downloadCount` int NOT NULL DEFAULT 0,
	`avgTimeSpent` int DEFAULT 0,
	`bounceRate` int DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `content_engagement_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`totalPageViews` int NOT NULL DEFAULT 0,
	`uniqueVisitors` int NOT NULL DEFAULT 0,
	`totalDonations` int NOT NULL DEFAULT 0,
	`donationCount` int NOT NULL DEFAULT 0,
	`avgDonation` int DEFAULT 0,
	`topReferrer` varchar(500),
	`topPage` varchar(500),
	`avgBounceRate` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_analytics_id` PRIMARY KEY(`id`),
	CONSTRAINT `daily_analytics_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pagePath` varchar(500) NOT NULL,
	`pageTitle` varchar(255) NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`referrer` varchar(500),
	`userAgent` varchar(500),
	`timeSpent` int DEFAULT 0,
	`scrolledToBottom` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);

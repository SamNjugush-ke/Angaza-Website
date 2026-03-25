import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Resources table for storing uploaded files (MSME materials, STEM resources, program documents)
 * Metadata stored in database; actual file bytes stored in S3
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique identifier for the resource */
  resourceId: varchar("resourceId", { length: 64 }).notNull().unique(),
  /** Title/name of the resource */
  title: varchar("title", { length: 255 }).notNull(),
  /** Description of the resource */
  description: text("description"),
  /** Category: 'msme', 'stem', 'general' */
  category: mysqlEnum("category", ["msme", "stem", "general"]).notNull(),
  /** File type/extension */
  fileType: varchar("fileType", { length: 50 }).notNull(),
  /** File size in bytes */
  fileSize: int("fileSize").notNull(),
  /** S3 file key for storage */
  fileKey: varchar("fileKey", { length: 255 }).notNull(),
  /** Public CDN URL for the file */
  url: varchar("url", { length: 500 }).notNull(),
  /** MIME type */
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  /** User who uploaded the resource */
  uploadedBy: int("uploadedBy").notNull(),
  /** Whether the resource is published/visible */
  isPublished: boolean("isPublished").default(true).notNull(),
  /** Download count */
  downloadCount: int("downloadCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

/**
 * Events table for bootcamps, workshops, and training sessions
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  eventId: varchar("eventId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["bootcamp", "workshop", "training", "other"]).notNull(),
  type: mysqlEnum("type", ["stem", "msme", "digital", "other"]).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  location: varchar("location", { length: 500 }),
  capacity: int("capacity"),
  registeredCount: int("registeredCount").default(0),
  imageUrl: varchar("imageUrl", { length: 500 }),
  status: mysqlEnum("status", ["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming"),
  createdBy: int("createdBy").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Blog posts table
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  postId: varchar("postId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: varchar("excerpt", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: varchar("tags", { length: 500 }),
  featuredImage: varchar("featuredImage", { length: 500 }),
  authorId: int("authorId").notNull(),
  viewCount: int("viewCount").default(0),
  isPublished: boolean("isPublished").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Gallery images table
 */
export const galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  imageId: varchar("imageId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  album: varchar("album", { length: 100 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  displayOrder: int("displayOrder").default(0),
  uploadedBy: int("uploadedBy").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

/**
 * Team members table
 */
export const teamMembers = mysqlTable("team_members", {
  id: int("id").autoincrement().primaryKey(),
  memberId: varchar("memberId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  bio: text("bio"),
  photoUrl: varchar("photoUrl", { length: 500 }),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  email: varchar("email", { length: 320 }),
  displayOrder: int("displayOrder").default(0),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

/**
 * Social media links table
 */
export const socialMediaLinks = mysqlTable("social_media_links", {
  id: int("id").autoincrement().primaryKey(),
  platform: mysqlEnum("platform", ["facebook", "instagram", "youtube", "twitter", "linkedin", "tiktok"]).notNull().unique(),
  url: varchar("url", { length: 500 }).notNull(),
  displayName: varchar("displayName", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialMediaLink = typeof socialMediaLinks.$inferSelect;
export type InsertSocialMediaLink = typeof socialMediaLinks.$inferInsert;

/**
 * Testimonials table for MSME beneficiaries
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  testimonialId: varchar("testimonialId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  businessName: varchar("businessName", { length: 255 }),
  role: varchar("role", { length: 255 }),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  category: mysqlEnum("category", ["msme", "stem", "digital"]).notNull(),
  rating: int("rating").default(5),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Donations table for payment tracking
 */
export const donations = mysqlTable("donations", {
  id: int("id").autoincrement().primaryKey(),
  donationId: varchar("donationId", { length: 64 }).notNull().unique(),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("KES"),
  donorName: varchar("donorName", { length: 255 }),
  donorEmail: varchar("donorEmail", { length: 320 }),
  donorPhone: varchar("donorPhone", { length: 20 }),
  paymentMethod: mysqlEnum("paymentMethod", ["paystack", "pesapal", "mpesa", "card"]).notNull(),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed", "refunded"]).default("pending"),
  transactionId: varchar("transactionId", { length: 255 }),
  message: text("message"),
  receiptSent: boolean("receiptSent").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = typeof donations.$inferInsert;

/**
 * STEM Hub information table
 */
export const stemHub = mysqlTable("stem_hub", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  address: varchar("address", { length: 500 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  features: text("features"),
  capacity: int("capacity"),
  operatingHours: varchar("operatingHours", { length: 500 }),
  isPublished: boolean("isPublished").default(true).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StemHub = typeof stemHub.$inferSelect;
export type InsertStemHub = typeof stemHub.$inferInsert;

/**
 * MSME Lab features/products table
 */
export const msmeLabFeatures = mysqlTable("msme_lab_features", {
  id: int("id").autoincrement().primaryKey(),
  featureId: varchar("featureId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  displayOrder: int("displayOrder").default(0),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MsmeLabFeature = typeof msmeLabFeatures.$inferSelect;
export type InsertMsmeLabFeature = typeof msmeLabFeatures.$inferInsert;


/**
 * Page views analytics table for tracking visitor engagement
 */
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  /** Page path (e.g., /home, /programs/stem, /blog/post-slug) */
  pagePath: varchar("pagePath", { length: 500 }).notNull(),
  /** Page title for display */
  pageTitle: varchar("pageTitle", { length: 255 }).notNull(),
  /** Unique session identifier */
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  /** Referrer URL */
  referrer: varchar("referrer", { length: 500 }),
  /** User agent/browser info */
  userAgent: varchar("userAgent", { length: 500 }),
  /** Time spent on page in seconds */
  timeSpent: int("timeSpent").default(0),
  /** Whether user scrolled to bottom */
  scrolledToBottom: boolean("scrolledToBottom").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;

/**
 * Content engagement analytics (blog posts, events, resources)
 */
export const contentEngagement = mysqlTable("content_engagement", {
  id: int("id").autoincrement().primaryKey(),
  /** Type of content: blog, event, resource */
  contentType: mysqlEnum("contentType", ["blog", "event", "resource", "team", "testimonial"]).notNull(),
  /** ID of the content item */
  contentId: varchar("contentId", { length: 64 }).notNull(),
  /** Content title for display */
  contentTitle: varchar("contentTitle", { length: 255 }).notNull(),
  /** Number of views */
  viewCount: int("viewCount").default(0).notNull(),
  /** Number of shares */
  shareCount: int("shareCount").default(0).notNull(),
  /** Number of downloads (for resources) */
  downloadCount: int("downloadCount").default(0).notNull(),
  /** Average time spent viewing (seconds) */
  avgTimeSpent: int("avgTimeSpent").default(0),
  /** Bounce rate (percentage) */
  bounceRate: int("bounceRate").default(0),
  /** Last updated timestamp */
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContentEngagement = typeof contentEngagement.$inferSelect;
export type InsertContentEngagement = typeof contentEngagement.$inferInsert;

/**
 * Daily analytics summary for performance tracking
 */
export const dailyAnalytics = mysqlTable("daily_analytics", {
  id: int("id").autoincrement().primaryKey(),
  /** Date for the analytics (YYYY-MM-DD format) */
  date: varchar("date", { length: 10 }).notNull().unique(),
  /** Total page views for the day */
  totalPageViews: int("totalPageViews").default(0).notNull(),
  /** Unique sessions/visitors */
  uniqueVisitors: int("uniqueVisitors").default(0).notNull(),
  /** Total donations received (in KES) */
  totalDonations: int("totalDonations").default(0).notNull(),
  /** Number of donations */
  donationCount: int("donationCount").default(0).notNull(),
  /** Average donation amount */
  avgDonation: int("avgDonation").default(0),
  /** Top referrer */
  topReferrer: varchar("topReferrer", { length: 500 }),
  /** Top page visited */
  topPage: varchar("topPage", { length: 500 }),
  /** Bounce rate for the day */
  avgBounceRate: int("avgBounceRate").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyAnalytics = typeof dailyAnalytics.$inferSelect;
export type InsertDailyAnalytics = typeof dailyAnalytics.$inferInsert;

import { getDb } from "./db";
import {
  pageViews, InsertPageView, PageView,
  contentEngagement, InsertContentEngagement, ContentEngagement,
  dailyAnalytics, InsertDailyAnalytics, DailyAnalytics,
} from "../drizzle/schema";
import { eq, gte, lte, desc, sql } from "drizzle-orm";

// ============ PAGE VIEWS ============
export async function logPageView(pageView: InsertPageView): Promise<PageView | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(pageViews).values(pageView);
    return pageView as PageView;
  } catch (error) {
    console.error("[DB] Log page view error:", error);
    return null;
  }
}

export async function getPageViewStats(days: number = 30): Promise<any> {
  const db = await getDb();
  if (!db) return null;
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await db.select({
      totalViews: sql<number>`COUNT(*)`,
      uniqueSessions: sql<number>`COUNT(DISTINCT sessionId)`,
      avgTimeSpent: sql<number>`AVG(timeSpent)`,
      bounceRate: sql<number>`SUM(CASE WHEN timeSpent < 5 THEN 1 ELSE 0 END) * 100 / COUNT(*)`,
    })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate));

    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get page view stats error:", error);
    return null;
  }
}

export async function getTopPages(limit: number = 10, days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await db.select({
      pagePath: pageViews.pagePath,
      pageTitle: pageViews.pageTitle,
      viewCount: sql<number>`COUNT(*)`,
      uniqueVisitors: sql<number>`COUNT(DISTINCT sessionId)`,
      avgTimeSpent: sql<number>`AVG(timeSpent)`,
    })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.pagePath)
      .orderBy(desc(sql<number>`COUNT(*)`))
      .limit(limit);
  } catch (error) {
    console.error("[DB] Get top pages error:", error);
    return [];
  }
}

export async function getVisitorTrend(days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await db.select({
      date: sql<string>`DATE(createdAt)`,
      views: sql<number>`COUNT(*)`,
      uniqueVisitors: sql<number>`COUNT(DISTINCT sessionId)`,
    })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(sql<string>`DATE(createdAt)`)
      .orderBy(sql<string>`DATE(createdAt)`);
  } catch (error) {
    console.error("[DB] Get visitor trend error:", error);
    return [];
  }
}

// ============ CONTENT ENGAGEMENT ============
export async function updateContentEngagement(
  contentType: string,
  contentId: string,
  updates: Partial<ContentEngagement>
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(contentEngagement)
      .set(updates)
      .where(
        sql`contentType = ${contentType} AND contentId = ${contentId}`
      );
    return true;
  } catch (error) {
    console.error("[DB] Update content engagement error:", error);
    return false;
  }
}

export async function getContentEngagement(
  contentType: string,
  contentId: string
): Promise<ContentEngagement | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select()
      .from(contentEngagement)
      .where(
        sql`contentType = ${contentType} AND contentId = ${contentId}`
      )
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get content engagement error:", error);
    return null;
  }
}

export async function getTopContent(contentType: string, limit: number = 10): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select()
      .from(contentEngagement)
      .where(eq(contentEngagement.contentType, contentType as any))
      .orderBy(desc(contentEngagement.viewCount))
      .limit(limit);
  } catch (error) {
    console.error("[DB] Get top content error:", error);
    return [];
  }
}

export async function getContentPerformance(days: number = 30): Promise<any> {
  const db = await getDb();
  if (!db) return null;
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await db.select({
      contentType: contentEngagement.contentType,
      totalViews: sql<number>`SUM(viewCount)`,
      totalShares: sql<number>`SUM(shareCount)`,
      totalDownloads: sql<number>`SUM(downloadCount)`,
      avgEngagement: sql<number>`AVG(viewCount + shareCount + downloadCount)`,
    })
      .from(contentEngagement)
      .where(gte(contentEngagement.lastUpdated, startDate))
      .groupBy(contentEngagement.contentType);

    return result || [];
  } catch (error) {
    console.error("[DB] Get content performance error:", error);
    return [];
  }
}

// ============ DAILY ANALYTICS ============
export async function createDailyAnalytics(analytics: InsertDailyAnalytics): Promise<DailyAnalytics | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(dailyAnalytics).values(analytics);
    const result = await db.select()
      .from(dailyAnalytics)
      .where(eq(dailyAnalytics.date, analytics.date))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create daily analytics error:", error);
    return null;
  }
}

export async function getDailyAnalytics(date: string): Promise<DailyAnalytics | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select()
      .from(dailyAnalytics)
      .where(eq(dailyAnalytics.date, date))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get daily analytics error:", error);
    return null;
  }
}

export async function getAnalyticsTrend(days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    return await db.select()
      .from(dailyAnalytics)
      .where(gte(dailyAnalytics.date, startDateStr))
      .orderBy(dailyAnalytics.date);
  } catch (error) {
    console.error("[DB] Get analytics trend error:", error);
    return [];
  }
}

export async function getAnalyticsSummary(days: number = 30): Promise<any> {
  const db = await getDb();
  if (!db) return null;
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    const result = await db.select({
      totalPageViews: sql<number>`SUM(totalPageViews)`,
      totalUniqueVisitors: sql<number>`SUM(uniqueVisitors)`,
      totalDonations: sql<number>`SUM(totalDonations)`,
      totalDonationCount: sql<number>`SUM(donationCount)`,
      avgDonation: sql<number>`AVG(avgDonation)`,
      avgBounceRate: sql<number>`AVG(avgBounceRate)`,
    })
      .from(dailyAnalytics)
      .where(gte(dailyAnalytics.date, startDateStr));

    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get analytics summary error:", error);
    return null;
  }
}

// ============ DONATION ANALYTICS ============
export async function getDonationStats(days: number = 30): Promise<any> {
  const db = await getDb();
  if (!db) return null;
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { donations } = await import("../drizzle/schema");

    const result = await db.select({
      totalAmount: sql<number>`SUM(amount)`,
      totalCount: sql<number>`COUNT(*)`,
      avgAmount: sql<number>`AVG(amount)`,
      maxAmount: sql<number>`MAX(amount)`,
      minAmount: sql<number>`MIN(amount)`,
    })
      .from(donations)
      .where(
        gte(donations.createdAt, startDate)
      );

    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get donation stats error:", error);
    return null;
  }
}

export async function getDonationTrend(days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { donations } = await import("../drizzle/schema");

    return await db.select({
      date: sql<string>`DATE(createdAt)`,
      totalAmount: sql<number>`SUM(amount)`,
      count: sql<number>`COUNT(*)`,
      avgAmount: sql<number>`AVG(amount)`,
    })
      .from(donations)
      .where(gte(donations.createdAt, startDate))
      .groupBy(sql<string>`DATE(createdAt)`)
      .orderBy(sql<string>`DATE(createdAt)`);
  } catch (error) {
    console.error("[DB] Get donation trend error:", error);
    return [];
  }
}

export async function getDonationByMethod(days: number = 30): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { donations } = await import("../drizzle/schema");

    return await db.select({
      method: donations.paymentMethod,
      totalAmount: sql<number>`SUM(amount)`,
      count: sql<number>`COUNT(*)`,
      avgAmount: sql<number>`AVG(amount)`,
    })
      .from(donations)
      .where(gte(donations.createdAt, startDate))
      .groupBy(donations.paymentMethod);
  } catch (error) {
    console.error("[DB] Get donation by method error:", error);
    return [];
  }
}

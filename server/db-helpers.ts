import { eq, desc, and, like } from "drizzle-orm";
import { getDb } from "./db";
import {
  events, InsertEvent, Event,
  blogPosts, InsertBlogPost, BlogPost,
  galleryImages, InsertGalleryImage, GalleryImage,
  teamMembers, InsertTeamMember, TeamMember,
  socialMediaLinks, InsertSocialMediaLink, SocialMediaLink,
  testimonials, InsertTestimonial, Testimonial,
  donations, InsertDonation, Donation,
  stemHub, InsertStemHub, StemHub,
  msmeLabFeatures, InsertMsmeLabFeature, MsmeLabFeature,
} from "../drizzle/schema";

// ============ EVENTS ============
export async function createEvent(event: InsertEvent): Promise<Event | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(events).values(event);
    const result = await db.select().from(events).where(eq(events.eventId, event.eventId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create event error:", error);
    return null;
  }
}

export async function getUpcomingEvents(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(events)
      .where(and(eq(events.isPublished, true), eq(events.status, "upcoming")))
      .orderBy(events.startDate)
      .limit(limit);
  } catch (error) {
    console.error("[DB] Get upcoming events error:", error);
    return [];
  }
}

export async function getEventById(eventId: string): Promise<Event | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select().from(events).where(eq(events.eventId, eventId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get event error:", error);
    return null;
  }
}

export async function updateEvent(eventId: string, updates: Partial<Event>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(events).set(updates).where(eq(events.eventId, eventId));
    return true;
  } catch (error) {
    console.error("[DB] Update event error:", error);
    return false;
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(events).where(eq(events.eventId, eventId));
    return true;
  } catch (error) {
    console.error("[DB] Delete event error:", error);
    return false;
  }
}

// ============ BLOG POSTS ============
export async function createBlogPost(post: InsertBlogPost): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(blogPosts).values(post);
    const result = await db.select().from(blogPosts).where(eq(blogPosts.postId, post.postId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create blog post error:", error);
    return null;
  }
}

export async function getBlogPosts(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[DB] Get blog posts error:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get blog post error:", error);
    return null;
  }
}

export async function updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(blogPosts).set(updates).where(eq(blogPosts.postId, postId));
    return true;
  } catch (error) {
    console.error("[DB] Update blog post error:", error);
    return false;
  }
}

export async function deleteBlogPost(postId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(blogPosts).where(eq(blogPosts.postId, postId));
    return true;
  } catch (error) {
    console.error("[DB] Delete blog post error:", error);
    return false;
  }
}

// ============ GALLERY ============
export async function createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(galleryImages).values(image);
    const result = await db.select().from(galleryImages).where(eq(galleryImages.imageId, image.imageId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create gallery image error:", error);
    return null;
  }
}

export async function getGalleryByAlbum(album: string) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(galleryImages)
      .where(and(eq(galleryImages.album, album), eq(galleryImages.isPublished, true)))
      .orderBy(galleryImages.displayOrder);
  } catch (error) {
    console.error("[DB] Get gallery error:", error);
    return [];
  }
}

export async function deleteGalleryImage(imageId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(galleryImages).where(eq(galleryImages.imageId, imageId));
    return true;
  } catch (error) {
    console.error("[DB] Delete gallery image error:", error);
    return false;
  }
}

// ============ TEAM MEMBERS ============
export async function createTeamMember(member: InsertTeamMember): Promise<TeamMember | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(teamMembers).values(member);
    const result = await db.select().from(teamMembers).where(eq(teamMembers.memberId, member.memberId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create team member error:", error);
    return null;
  }
}

export async function getTeamMembers() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(teamMembers)
      .where(eq(teamMembers.isPublished, true))
      .orderBy(teamMembers.displayOrder);
  } catch (error) {
    console.error("[DB] Get team members error:", error);
    return [];
  }
}

export async function updateTeamMember(memberId: string, updates: Partial<TeamMember>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(teamMembers).set(updates).where(eq(teamMembers.memberId, memberId));
    return true;
  } catch (error) {
    console.error("[DB] Update team member error:", error);
    return false;
  }
}

export async function deleteTeamMember(memberId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(teamMembers).where(eq(teamMembers.memberId, memberId));
    return true;
  } catch (error) {
    console.error("[DB] Delete team member error:", error);
    return false;
  }
}

// ============ SOCIAL MEDIA ============
export async function getSocialMediaLinks() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(socialMediaLinks).where(eq(socialMediaLinks.isActive, true));
  } catch (error) {
    console.error("[DB] Get social media links error:", error);
    return [];
  }
}

export async function updateSocialMediaLink(platform: string, url: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const existing = await db.select().from(socialMediaLinks).where(eq(socialMediaLinks.platform, platform as any)).limit(1);
    if (existing.length > 0) {
      await db.update(socialMediaLinks).set({ url }).where(eq(socialMediaLinks.platform, platform as any));
    } else {
      await db.insert(socialMediaLinks).values({ platform: platform as any, url });
    }
    return true;
  } catch (error) {
    console.error("[DB] Update social media link error:", error);
    return false;
  }
}

// ============ TESTIMONIALS ============
export async function createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(testimonials).values(testimonial);
    const result = await db.select().from(testimonials).where(eq(testimonials.testimonialId, testimonial.testimonialId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create testimonial error:", error);
    return null;
  }
}

export async function getTestimonialsByCategory(category: string, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(testimonials)
      .where(and(eq(testimonials.category, category as any), eq(testimonials.isPublished, true)))
      .limit(limit);
  } catch (error) {
    console.error("[DB] Get testimonials error:", error);
    return [];
  }
}

export async function updateTestimonial(testimonialId: string, updates: Partial<Testimonial>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(testimonials).set(updates).where(eq(testimonials.testimonialId, testimonialId));
    return true;
  } catch (error) {
    console.error("[DB] Update testimonial error:", error);
    return false;
  }
}

export async function deleteTestimonial(testimonialId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(testimonials).where(eq(testimonials.testimonialId, testimonialId));
    return true;
  } catch (error) {
    console.error("[DB] Delete testimonial error:", error);
    return false;
  }
}

// ============ DONATIONS ============
export async function createDonation(donation: InsertDonation): Promise<Donation | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(donations).values(donation);
    const result = await db.select().from(donations).where(eq(donations.donationId, donation.donationId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create donation error:", error);
    return null;
  }
}

export async function getDonationById(donationId: string): Promise<Donation | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select().from(donations).where(eq(donations.donationId, donationId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get donation error:", error);
    return null;
  }
}

export async function updateDonationStatus(donationId: string, status: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(donations).set({ paymentStatus: status as any }).where(eq(donations.donationId, donationId));
    return true;
  } catch (error) {
    console.error("[DB] Update donation status error:", error);
    return false;
  }
}

// ============ STEM HUB ============
export async function getStemHub(): Promise<StemHub | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.select().from(stemHub).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Get STEM Hub error:", error);
    return null;
  }
}

export async function updateStemHub(updates: Partial<StemHub>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const existing = await getStemHub();
    if (existing) {
      await db.update(stemHub).set(updates).where(eq(stemHub.id, existing.id));
    } else {
      await db.insert(stemHub).values({ title: "Angaza STEM Hub", ...updates } as any);
    }
    return true;
  } catch (error) {
    console.error("[DB] Update STEM Hub error:", error);
    return false;
  }
}

// ============ MSME LAB FEATURES ============
export async function getMsmeLabFeatures() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(msmeLabFeatures)
      .where(eq(msmeLabFeatures.isPublished, true))
      .orderBy(msmeLabFeatures.displayOrder);
  } catch (error) {
    console.error("[DB] Get MSME Lab features error:", error);
    return [];
  }
}

export async function createMsmeLabFeature(feature: InsertMsmeLabFeature): Promise<MsmeLabFeature | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(msmeLabFeatures).values(feature);
    const result = await db.select().from(msmeLabFeatures).where(eq(msmeLabFeatures.featureId, feature.featureId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Create MSME Lab feature error:", error);
    return null;
  }
}

export async function updateMsmeLabFeature(featureId: string, updates: Partial<MsmeLabFeature>): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(msmeLabFeatures).set(updates).where(eq(msmeLabFeatures.featureId, featureId));
    return true;
  } catch (error) {
    console.error("[DB] Update MSME Lab feature error:", error);
    return false;
  }
}

export async function deleteMsmeLabFeature(featureId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(msmeLabFeatures).where(eq(msmeLabFeatures.featureId, featureId));
    return true;
  } catch (error) {
    console.error("[DB] Delete MSME Lab feature error:", error);
    return false;
  }
}

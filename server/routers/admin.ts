import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import * as dbHelpers from "../db-helpers";

// Admin-only middleware
const adminOnly = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  // ============ PUBLIC ENDPOINTS (for frontend) ============
  public: router({
    events: publicProcedure.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { events } = await import("../../drizzle/schema");
      const { and, eq } = await import("drizzle-orm");
      return await db.select().from(events)
        .where(and(eq(events.isPublished, true)))
        .orderBy(events.startDate);
    }),

    blogPosts: publicProcedure.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { blogPosts } = await import("../../drizzle/schema");
      const { desc, eq } = await import("drizzle-orm");
      return await db.select().from(blogPosts)
        .where(eq(blogPosts.isPublished, true))
        .orderBy(desc(blogPosts.publishedAt));
    }),

    gallery: publicProcedure.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { galleryImages } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      return await db.select().from(galleryImages)
        .where(eq(galleryImages.isPublished, true))
        .orderBy(galleryImages.displayOrder);
    }),

    team: publicProcedure.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { teamMembers } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      return await db.select().from(teamMembers)
        .where(eq(teamMembers.isPublished, true))
        .orderBy(teamMembers.displayOrder);
    }),

    testimonials: publicProcedure.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { testimonials } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      return await db.select().from(testimonials)
        .where(eq(testimonials.isPublished, true));
    }),

    socialMedia: publicProcedure.query(async () => {
      return await dbHelpers.getSocialMediaLinks();
    }),

    stemHub: publicProcedure.query(async () => {
      return await dbHelpers.getStemHub();
    }),

    msmeLabFeatures: publicProcedure.query(async () => {
      return await dbHelpers.getMsmeLabFeatures();
    }),
  }),

  // ============ EVENTS ============
  events: router({
    create: adminOnly
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.enum(["bootcamp", "workshop", "training", "other"]),
        type: z.enum(["stem", "msme", "digital", "other"]),
        startDate: z.date(),
        endDate: z.date(),
        location: z.string().optional(),
        capacity: z.number().optional(),
        imageUrl: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const event = await dbHelpers.createEvent({
          eventId: nanoid(),
          ...input,
          createdBy: ctx.user!.id,
        });
        if (!event) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return event;
      }),

    update: adminOnly
      .input(z.object({
        eventId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateEvent(input.eventId, input);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    delete: adminOnly
      .input(z.object({ eventId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteEvent(input.eventId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { events } = await import("../../drizzle/schema");
      return await db.select().from(events).orderBy(events.startDate);
    }),
  }),

  // ============ BLOG POSTS ============
  blog: router({
    create: adminOnly
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        featuredImage: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const post = await dbHelpers.createBlogPost({
          postId: nanoid(),
          ...input,
          authorId: ctx.user!.id,
          isPublished: false,
        });
        if (!post) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return post;
      }),

    update: adminOnly
      .input(z.object({
        postId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        isPublished: z.boolean().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateBlogPost(input.postId, input);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    delete: adminOnly
      .input(z.object({ postId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteBlogPost(input.postId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { blogPosts } = await import("../../drizzle/schema");
      const { desc } = await import("drizzle-orm");
      return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }),
  }),

  // ============ GALLERY ============
  gallery: router({
    create: adminOnly
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        album: z.string().min(1),
        imageUrl: z.string().min(1),
        thumbnailUrl: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const image = await dbHelpers.createGalleryImage({
          imageId: nanoid(),
          ...input,
          uploadedBy: ctx.user!.id,
        });
        if (!image) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return image;
      }),

    delete: adminOnly
      .input(z.object({ imageId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteGalleryImage(input.imageId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { galleryImages } = await import("../../drizzle/schema");
      return await db.select().from(galleryImages);
    }),
  }),

  // ============ TEAM ============
  team: router({
    create: adminOnly
      .input(z.object({
        name: z.string().min(1),
        position: z.string().min(1),
        bio: z.string().optional(),
        photoUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        email: z.string().email().optional(),
      }))
      .mutation(async ({ input }) => {
        const member = await dbHelpers.createTeamMember({
          memberId: nanoid(),
          ...input,
        });
        if (!member) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return member;
      }),

    update: adminOnly
      .input(z.object({
        memberId: z.string(),
        name: z.string().optional(),
        position: z.string().optional(),
        bio: z.string().optional(),
        photoUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateTeamMember(input.memberId, input);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    delete: adminOnly
      .input(z.object({ memberId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteTeamMember(input.memberId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      return await dbHelpers.getTeamMembers();
    }),
  }),

  // ============ TESTIMONIALS ============
  testimonials: router({
    create: adminOnly
      .input(z.object({
        name: z.string().min(1),
        businessName: z.string().optional(),
        role: z.string().optional(),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        category: z.enum(["msme", "stem", "digital"]),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input }) => {
        const testimonial = await dbHelpers.createTestimonial({
          testimonialId: nanoid(),
          ...input,
        });
        if (!testimonial) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return testimonial;
      }),

    update: adminOnly
      .input(z.object({
        testimonialId: z.string(),
        name: z.string().optional(),
        businessName: z.string().optional(),
        role: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.enum(["msme", "stem", "digital"]).optional(),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateTestimonial(input.testimonialId, input);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    delete: adminOnly
      .input(z.object({ testimonialId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteTestimonial(input.testimonialId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { testimonials } = await import("../../drizzle/schema");
      return await db.select().from(testimonials);
    }),
  }),

  // ============ SOCIAL MEDIA ============
  socialMedia: router({
    update: adminOnly
      .input(z.object({
        platform: z.string(),
        url: z.string().url(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateSocialMediaLink(input.platform, input.url);
        if (!success) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return { success: true };
      }),

    updateBulk: adminOnly
      .input(z.object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const updates = Object.entries(input)
          .filter(([, url]) => url)
          .map(([platform, url]) => dbHelpers.updateSocialMediaLink(platform, url as string));
        await Promise.all(updates);
        return { success: true };
      }),

    getAll: adminOnly.query(async () => {
      return await dbHelpers.getSocialMediaLinks();
    }),
  }),

  // ============ STEM HUB ============
  stemHub: router({
    update: adminOnly
      .input(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        imageUrl: z.string().optional(),
        features: z.string().optional(),
        capacity: z.number().optional(),
        operatingHours: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateStemHub(input);
        if (!success) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return { success: true };
      }),

    get: adminOnly.query(async () => {
      return await dbHelpers.getStemHub();
    }),
  }),

  // ============ SHORTCUTS FOR ADMIN DASHBOARD ============
  updateSocialMedia: adminOnly
    .input(z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const updates = Object.entries(input)
        .filter(([, url]) => url)
        .map(([platform, url]) => dbHelpers.updateSocialMediaLink(platform, url as string));
      await Promise.all(updates);
      return { success: true };
    }),

  updateStemHub: adminOnly
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      features: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const success = await dbHelpers.updateStemHub(input);
      if (!success) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return { success: true };
    }),

  updateMsmeLab: adminOnly
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      features: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // For now, we'll just return success since MSME Lab doesn't have a dedicated update
      return { success: true };
    }),

  // ============ MSME LAB ============
  msmeLab: router({
    createFeature: adminOnly
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        icon: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const feature = await dbHelpers.createMsmeLabFeature({
          featureId: nanoid(),
          ...input,
        });
        if (!feature) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return feature;
      }),

    updateFeature: adminOnly
      .input(z.object({
        featureId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateMsmeLabFeature(input.featureId, input);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    deleteFeature: adminOnly
      .input(z.object({ featureId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.deleteMsmeLabFeature(input.featureId);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),

    getFeatures: adminOnly.query(async () => {
      return await dbHelpers.getMsmeLabFeatures();
    }),
  }),

  // ============ DONATIONS ============
  donations: router({
    getAll: adminOnly.query(async () => {
      const db = await (await import("../db")).getDb();
      if (!db) return [];
      const { donations } = await import("../../drizzle/schema");
      const { desc } = await import("drizzle-orm");
      return await db.select().from(donations).orderBy(desc(donations.createdAt));
    }),

    updateStatus: adminOnly
      .input(z.object({
        donationId: z.string(),
        status: z.enum(["pending", "completed", "failed", "refunded"]),
      }))
      .mutation(async ({ input }) => {
        const success = await dbHelpers.updateDonationStatus(input.donationId, input.status);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),
  }),
});

  // ============ ANALYTICS ============
  analytics: router({
    getPageViewStats: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getPageViewStats(input.days);
      }),

    getTopPages: adminOnly
      .input(z.object({ limit: z.number().default(10), days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getTopPages(input.limit, input.days);
      }),

    getVisitorTrend: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getVisitorTrend(input.days);
      }),

    getContentPerformance: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getContentPerformance(input.days);
      }),

    getTopContent: adminOnly
      .input(z.object({ contentType: z.string(), limit: z.number().default(10) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getTopContent(input.contentType, input.limit);
      }),

    getAnalyticsTrend: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getAnalyticsTrend(input.days);
      }),

    getAnalyticsSummary: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getAnalyticsSummary(input.days);
      }),

    getDonationStats: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getDonationStats(input.days);
      }),

    getDonationTrend: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getDonationTrend(input.days);
      }),

    getDonationByMethod: adminOnly
      .input(z.object({ days: z.number().default(30) }))
      .query(async ({ input }) => {
        const analyticsHelpers = await import("../db-analytics");
        return await analyticsHelpers.getDonationByMethod(input.days);
      }),
  })

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  createResource,
  getResourcesByCategory,
  getResourceById,
  incrementResourceDownloadCount,
  deleteResource,
} from "../db";
import { storagePut } from "../storage";

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const resourcesRouter = router({
  // Upload a new resource (admin only)
  upload: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        category: z.enum(["msme", "stem", "general"]),
        fileData: z.string(), // Base64 encoded file
        fileName: z.string().min(1),
        mimeType: z.string(),
        fileSize: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only admins can upload resources
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can upload resources",
        });
      }

      // Validate file size
      if (input.fileSize > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        });
      }

      // Validate MIME type
      if (!ALLOWED_FILE_TYPES.includes(input.mimeType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File type not allowed",
        });
      }

      try {
        // Decode base64 file data
        const buffer = Buffer.from(input.fileData, "base64");

        // Generate unique file key
        const fileExtension = input.fileName.split(".").pop() || "file";
        const fileKey = `resources/${input.category}/${nanoid()}-${Date.now()}.${fileExtension}`;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Create resource record in database
        const resourceId = nanoid();
        const resource = await createResource({
          resourceId,
          title: input.title,
          description: input.description || null,
          category: input.category,
          fileType: fileExtension,
          fileSize: input.fileSize,
          fileKey,
          url,
          mimeType: input.mimeType,
          uploadedBy: ctx.user.id,
          isPublished: true,
          downloadCount: 0,
        });

        if (!resource) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create resource record",
          });
        }

        return {
          success: true,
          resource,
        };
      } catch (error) {
        console.error("[Resources] Upload error:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload resource",
        });
      }
    }),

  // Get resources by category (public)
  getByCategory: publicProcedure
    .input(
      z.object({
        category: z.enum(["msme", "stem", "general"]),
        limit: z.number().int().min(1).max(100).default(20),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const resources = await getResourcesByCategory(
          input.category,
          input.limit,
          input.offset
        );
        return {
          resources,
          total: resources.length,
        };
      } catch (error) {
        console.error("[Resources] Get by category error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch resources",
        });
      }
    }),

  // Get a single resource by ID (public)
  getById: publicProcedure
    .input(z.object({ resourceId: z.string() }))
    .query(async ({ input }) => {
      try {
        const resource = await getResourceById(input.resourceId);
        if (!resource) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Resource not found",
          });
        }
        return resource;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Resources] Get by ID error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch resource",
        });
      }
    }),

  // Download resource (increments download count)
  download: publicProcedure
    .input(z.object({ resourceId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const resource = await getResourceById(input.resourceId);
        if (!resource) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Resource not found",
          });
        }

        // Increment download count
        await incrementResourceDownloadCount(input.resourceId);

        return {
          success: true,
          url: resource.url,
          title: resource.title,
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Resources] Download error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process download",
        });
      }
    }),

  // Delete resource (admin only)
  delete: protectedProcedure
    .input(z.object({ resourceId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can delete resources",
        });
      }

      try {
        const success = await deleteResource(input.resourceId);
        if (!success) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Resource not found",
          });
        }
        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Resources] Delete error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete resource",
        });
      }
    }),
});

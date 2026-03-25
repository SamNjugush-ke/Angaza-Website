import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { 
  createGalleryImage, 
  getGalleryImages, 
  getGalleryImageById, 
  updateGalleryImage, 
  deleteGalleryImage,
  getGalleryAlbums
} from "../db";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";

export const galleryRouter = router({
  // Get all gallery images or filter by album
  getImages: publicProcedure
    .input(z.object({ album: z.string() }).optional())
    .query(async ({ input }) => {
      return await getGalleryImages(input?.album);
    }),

  // Get gallery albums
  getAlbums: publicProcedure.query(async () => {
    return await getGalleryAlbums();
  }),

  // Get single image
  getImage: publicProcedure
    .input(z.object({ imageId: z.string() }))
    .query(async ({ input }) => {
      return await getGalleryImageById(input.imageId);
    }),

  // Upload image (admin only)
  uploadImage: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      album: z.string().min(1),
      imageData: z.string(), // base64 or file data
      fileName: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user is admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admins can upload images");
      }

      try {
        // Convert base64 to buffer if needed
        let buffer: Buffer;
        if (input.imageData.startsWith("data:")) {
          const base64Data = input.imageData.split(",")[1];
          buffer = Buffer.from(base64Data, "base64");
        } else {
          buffer = Buffer.from(input.imageData, "base64");
        }

        // Upload to S3
        const fileKey = `gallery/${input.album}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, "image/jpeg");

        // Create gallery image record
        const imageId = nanoid();
        const galleryImage = await createGalleryImage({
          imageId,
          title: input.title,
          description: input.description,
          album: input.album,
          imageUrl: url,
          thumbnailUrl: url, // Could generate thumbnail separately
          uploadedBy: ctx.user.id,
          isPublished: true,
          displayOrder: 0,
        });

        return galleryImage;
      } catch (error) {
        console.error("[Gallery] Upload failed:", error);
        throw new Error("Failed to upload image");
      }
    }),

  // Update image (admin only)
  updateImage: protectedProcedure
    .input(z.object({
      imageId: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      displayOrder: z.number().optional(),
      isPublished: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admins can update images");
      }

      const { imageId, ...updates } = input;
      return await updateGalleryImage(imageId, updates);
    }),

  // Delete image (admin only)
  deleteImage: protectedProcedure
    .input(z.object({ imageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Only admins can delete images");
      }

      return await deleteGalleryImage(input.imageId);
    }),
});

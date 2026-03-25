import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, resources, InsertResource, Resource, galleryImages, GalleryImage, InsertGalleryImage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Resource management queries
export async function createResource(resource: InsertResource): Promise<Resource | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create resource: database not available");
    return null;
  }

  try {
    const result = await db.insert(resources).values(resource);
    const created = await db.select().from(resources).where(eq(resources.id, result[0].insertId)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create resource:", error);
    throw error;
  }
}

export async function getResourcesByCategory(category: "msme" | "stem" | "general", limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get resources: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(resources)
      .where(and(eq(resources.category, category), eq(resources.isPublished, true)))
      .orderBy(desc(resources.createdAt))
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get resources:", error);
    return [];
  }
}

export async function getResourceById(resourceId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get resource: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(resources).where(eq(resources.resourceId, resourceId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get resource:", error);
    return undefined;
  }
}

export async function incrementResourceDownloadCount(resourceId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update resource: database not available");
    return;
  }

  try {
    const resource = await getResourceById(resourceId);
    if (!resource) return;
    
    await db
      .update(resources)
      .set({ downloadCount: resource.downloadCount + 1 })
      .where(eq(resources.resourceId, resourceId));
  } catch (error) {
    console.error("[Database] Failed to increment download count:", error);
  }
}

export async function deleteResource(resourceId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete resource: database not available");
    return false;
  }

  try {
    await db.delete(resources).where(eq(resources.resourceId, resourceId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete resource:", error);
    return false;
  }
}


// Gallery queries

export async function createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage | null> {
  const db = await getDb();
  if (!db) return null;
  
  try {
    await db.insert(galleryImages).values(image);
    const result = await db.select().from(galleryImages).where(eq(galleryImages.imageId, image.imageId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to create gallery image:", error);
    throw error;
  }
}

export async function getGalleryImages(album?: string): Promise<GalleryImage[]> {
  const db = await getDb();
  if (!db) return [];
  
  try {
    if (album) {
      return await db.select().from(galleryImages)
        .where(eq(galleryImages.album, album));
    }
    return await db.select().from(galleryImages);
  } catch (error) {
    console.error("[Database] Failed to get gallery images:", error);
    return [];
  }
}

export async function getGalleryImageById(imageId: string): Promise<GalleryImage | null> {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const result = await db.select().from(galleryImages).where(eq(galleryImages.imageId, imageId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get gallery image:", error);
    return null;
  }
}

export async function updateGalleryImage(imageId: string, updates: Partial<InsertGalleryImage>): Promise<GalleryImage | null> {
  const db = await getDb();
  if (!db) return null;
  
  try {
    await db.update(galleryImages).set(updates).where(eq(galleryImages.imageId, imageId));
    return getGalleryImageById(imageId);
  } catch (error) {
    console.error("[Database] Failed to update gallery image:", error);
    throw error;
  }
}

export async function deleteGalleryImage(imageId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  try {
    await db.delete(galleryImages).where(eq(galleryImages.imageId, imageId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete gallery image:", error);
    throw error;
  }
}

export async function getGalleryAlbums(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const result = await db.selectDistinct({ album: galleryImages.album }).from(galleryImages);
    return result.map(r => r.album);
  } catch (error) {
    console.error("[Database] Failed to get gallery albums:", error);
    return [];
  }
}

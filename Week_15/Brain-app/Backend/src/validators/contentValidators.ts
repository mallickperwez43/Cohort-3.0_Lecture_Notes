import { z } from "zod";

const contentTypeEnum = z.enum(['image', 'video', 'article', 'audio']);

export const createContentSchema = z.object({
    title: z.string().min(3, "Title should be at least 3 characters"),
    link: z.string("Please enter a valid URL (e.g., https://google.com)"),
    type: contentTypeEnum,
    tags: z.array(z.string()).default([]),
});

// 3. Define the Update Schema (remains partial)
export const updateContentSchema = createContentSchema.partial();

// 4. Define the Share Schema
export const shareLinkSchema = z.object({
    share: z.boolean({
        message: "Share status is required"
    })
});

/**
 * TypeScript Type Inference
 * These lines export the TS types based on your schemas.
 * Now you can use 'CreateContentInput' in your controller 
 * and it will stay perfectly in sync with your validation rules.
 */
export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type ShareLinkInput = z.infer<typeof shareLinkSchema>;
import { z } from "zod";

const contentTypeEnum = z.enum(['image', 'video', 'article', 'audio']);

export const createContentSchema = z.object({
    title: z.string().min(3, "Title should be at least 3 characters"),
    link: z.string("Please enter a valid URL (e.g., https://google.com)"),
    type: contentTypeEnum,
    tags: z.array(z.string()).default([]),
});

export const updateContentSchema = createContentSchema.partial();

export const shareLinkSchema = z.object({
    share: z.coerce.boolean({
        message: "Share status is required"
    })
});


export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type ShareLinkInput = z.infer<typeof shareLinkSchema>;
import { z } from 'zod';

export const postFrontmatterSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.iso.date(),
    tags: z.array(z.string()).default([]),
    slug: z.string().min(1),
    cover: z.string().url().optional(),
    published: z.boolean(),
    devto_id: z.number().int().positive().optional(),
});

export const postMetaSchema = postFrontmatterSchema.extend({
    readingTimeMinutes: z.number().int().positive(),
});

export const postSchema = postMetaSchema.extend({
    renderedBody: z.string(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type PostMeta = z.infer<typeof postMetaSchema>;
export type Post = z.infer<typeof postSchema>;

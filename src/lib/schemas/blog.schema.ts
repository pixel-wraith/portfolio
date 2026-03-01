import { z } from "zod";

export const blogPostUserSchema = z.object({
    github_username: z.string().nullable(),
    name: z.string(),
    profile_image: z.string(),
    profile_image_90: z.string(),
    twitter_username: z.string().nullable(),
    user_id: z.number(),
    username: z.string(),
    website_url: z.string().nullable(),
});

export const blogPostSchema = z.object({
    body_markdown: z.string().optional(),
    canonical_url: z.string(),
    comments_count: z.number(),
    cover_image: z.string().nullable(),
    description: z.string(),
    id: z.number(),
    page_views_count: z.number(),
    path: z.string(),
    positive_reactions_count: z.number(),
    public_reactions_count: z.number(),
    published: z.boolean(),
    published_at: z.string(),
    published_timestamp: z.string(),
    reading_time_minutes: z.number(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
    tag_list: z.array(z.string()),
    title: z.string(),
    type_of: z.string(),
    url: z.string(),
    user: blogPostUserSchema,
});

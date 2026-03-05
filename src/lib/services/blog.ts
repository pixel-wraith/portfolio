import type { z } from 'zod';

import { env } from '$env/dynamic/private';
import { logger } from '$lib/logger';

import { blogPostSchema } from '../schemas/blog.schema';

// Re-export schemas for convenience in server-side code
export { blogPostSchema, blogPostUserSchema } from '../schemas/blog.schema';

export class BlogService {
    public getPosts = async (page = 1, perPage = 10): Promise<z.infer<typeof blogPostSchema>[]> => {
        try {
            const res = await fetch(`https://dev.to/api/articles/me?page=${page}&per_page=${perPage}`, {
                headers: {
                    'api-key': env.DEV_TO_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            const posts = await res.json();

            return blogPostSchema.array().parse((posts ?? []).filter((post: z.infer<typeof blogPostSchema>) => post.type_of === 'article'));
        } catch (error) {
            logger.error('error', { error });
            return [];
        }
    };

    public getPostById = async (id: string): Promise<z.infer<typeof blogPostSchema> | null> => {
        try {
            const res = await fetch(`https://dev.to/api/articles/${id}`, {
                headers: {
                    'api-key': env.DEV_TO_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            return blogPostSchema.parse(await res.json());
        } catch (error) {
            logger.error('error', { error });
            return null;
        }
    };
}

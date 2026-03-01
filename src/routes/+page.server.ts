import type { bookSchema } from '$lib/schemas/book.schema';
import type { blogPostSchema } from '$lib/services/blog';
import type { z } from 'zod';

import { BlogService } from '$lib/services/blog';
import { LibraryService } from '$lib/services/library';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { PageServerLoad } from './$types';

dayjs.extend(utc);

export const load: PageServerLoad = async () => {
    let posts: z.infer<typeof blogPostSchema>[] = [];
    let currentlyReading: z.infer<typeof bookSchema>[] = [];

    try {
        const blogService = new BlogService();
        // get the 3 most recent blog posts
        posts = await blogService.getPosts(1, 3);
    } catch {
        // swallowing error
    }

    try {
        const libraryService = new LibraryService();
        currentlyReading = await libraryService.getCurrentlyReading();
    } catch {
        // swallowing
    }

    return {
        blog: {
            posts,
        },
        currentlyReading,
    };
};
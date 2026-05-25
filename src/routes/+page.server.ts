import type { bookSchema } from '$lib/schemas/book.schema';
import type { z } from 'zod';

import { getRecentPosts } from '$lib/posts/loader';
import { LibraryService } from '$lib/services/library';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts = getRecentPosts(3);

    let currentlyReading: z.infer<typeof bookSchema>[] = [];
    try {
        const libraryService = new LibraryService();
        currentlyReading = await libraryService.getCurrentlyReading();
    } catch {
        // swallowing
    }

    return {
        blog: { posts },
        currentlyReading,
    };
};

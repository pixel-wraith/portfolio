import type { EntryGenerator, PageServerLoad } from './$types';

import { getAllSlugs, getPostBySlug } from '$lib/posts/loader';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries: EntryGenerator = () => {
    return getAllSlugs().map(slug => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
    const result = await getPostBySlug(params.slug);
    if (!result) {
        error(404, 'Post not found');
    }

    return result;
};

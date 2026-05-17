import { error } from '@sveltejs/kit';
import { getAllSlugs, getPostBySlug } from '$lib/posts/loader';

import type { EntryGenerator, PageServerLoad } from './$types';

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

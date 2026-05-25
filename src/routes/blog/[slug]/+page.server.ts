import { error } from '@sveltejs/kit';
import { getAllSlugs, getPostBySlug } from '$lib/posts/loader';

import type { EntryGenerator, PageServerLoad } from './$types';

const slugs = getAllSlugs();
const hasSlugs = slugs.length > 0;

// Only prerender when there are published posts; otherwise SvelteKit errors
// on "prerenderable route with no entries". When the repo has no visible
// posts (all drafts, or none at all), the route falls back to SSR and the
// load function 404s any request.
export const prerender = hasSlugs;

export const entries: EntryGenerator = () => {
    return slugs.map(slug => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
    const result = await getPostBySlug(params.slug);
    if (!result) {
        error(404, 'Post not found');
    }

    return result;
};

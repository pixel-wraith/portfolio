import { error } from '@sveltejs/kit';
import { getAllTags, getPostsByTag } from '$lib/posts/loader';

import type { EntryGenerator, PageServerLoad } from './$types';

const ALL_TAGS = getAllTags();
const HAS_ANY_TAGS = ALL_TAGS.length > 0;

// Only prerender when there is at least one tag across the corpus; otherwise
// SvelteKit errors on "prerenderable route with no entries". Same pattern as
// /blog/page/[page]: if nothing to enumerate, fall back to SSR and 404.
export const prerender = HAS_ANY_TAGS;

export const entries: EntryGenerator = () => {
    return ALL_TAGS.map(tag => ({ tag }));
};

export const load: PageServerLoad = ({ params }) => {
    const posts = getPostsByTag(params.tag);
    if (posts.length === 0) {
        error(404, `No posts tagged "${params.tag}"`);
    }

    return { tag: params.tag, posts };
};

import { error } from '@sveltejs/kit';
import { getAllPosts } from '$lib/posts/loader';

import type { EntryGenerator, PageServerLoad } from './$types';

const { totalPages } = getAllPosts({ page: 1 });
const hasExtraPages = totalPages > 1;

// Only prerender when pages 2+ actually exist; otherwise SvelteKit errors
// on "prerenderable route with no entries". When there are no extra pages,
// the route falls back to SSR and the load function 404s any request.
export const prerender = hasExtraPages;

export const entries: EntryGenerator = () => {
    if (!hasExtraPages) {
        return [];
    }

    return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
};

export const load: PageServerLoad = ({ params }) => {
    const pageNum = Number.parseInt(params.page, 10);
    if (!Number.isInteger(pageNum) || pageNum < 2 || String(pageNum) !== params.page) {
        error(404, 'Page not found');
    }

    try {
        return getAllPosts({ page: pageNum });
    } catch {
        error(404, 'Page not found');
    }
};

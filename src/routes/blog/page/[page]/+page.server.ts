import type { EntryGenerator, PageServerLoad } from './$types';

import { getAllPosts } from '$lib/posts/loader';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries: EntryGenerator = () => {
    const { totalPages } = getAllPosts({ page: 1 });
    if (totalPages <= 1) {
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

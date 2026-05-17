import type { PageServerLoad } from './$types';

import { getAllPosts } from '$lib/posts/loader';

export const prerender = true;

export const load: PageServerLoad = () => {
    return getAllPosts({ page: 1 });
};

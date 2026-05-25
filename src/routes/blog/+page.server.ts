import { getAllPosts } from '$lib/posts/loader';

import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
    return getAllPosts({ page: 1 });
};

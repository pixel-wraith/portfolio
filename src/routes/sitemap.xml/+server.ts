import type { ISitemapEntry } from '$lib/posts/sitemap';

import { SITE_URL } from '$lib/constants/site';
import { getAllPosts } from '$lib/posts/loader';
import { buildSitemapXml } from '$lib/posts/sitemap';

export const prerender = true;

const STATIC_ROUTES = ['/', '/about', '/experience', '/uses', '/blog'];

// Larger than any plausible post count; getAllPosts({ page: 1 }) returns
// all visible posts in one slice when perPage exceeds the total.
const ALL_POSTS_LIMIT = 10_000;

export function GET(): Response {
    const entries: ISitemapEntry[] = STATIC_ROUTES.map(route => ({
        loc: `${SITE_URL}${route}`,
    }));

    const { items: posts } = getAllPosts({ page: 1, perPage: ALL_POSTS_LIMIT });
    for (const post of posts) {
        entries.push({
            loc: `${SITE_URL}/blog/${post.slug}`,
            lastmod: post.date,
        });
    }

    // Tag pages (/blog/tag/{tag}) land in #9 and will be appended here then.

    const xml = buildSitemapXml(entries);

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
}

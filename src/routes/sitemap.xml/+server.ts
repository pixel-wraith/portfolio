import type { ISitemapEntry } from '$lib/posts/sitemap';

import { SITE_URL } from '$lib/constants/site';
import { getAllPostsMeta } from '$lib/posts/loader';
import { buildSitemapXml } from '$lib/posts/sitemap';

export const prerender = true;

// Authoritative list of top-level static routes for the sitemap. Not derived
// from the route tree (SvelteKit has no runtime introspection for that), so
// when you add a new top-level page (e.g. /resume), add it here too or it
// will be silently omitted from the sitemap.
const STATIC_ROUTES = ['/', '/about', '/experience', '/uses', '/blog'];

export function GET(): Response {
    const entries: ISitemapEntry[] = STATIC_ROUTES.map(route => ({
        loc: `${SITE_URL}${route}`,
    }));

    for (const post of getAllPostsMeta()) {
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

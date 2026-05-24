import type { ISitemapEntry } from '$lib/posts/sitemap';

import { SITE_URL } from '$lib/constants/site';
import { getAllPostsMeta } from '$lib/posts/loader';
import { buildSitemapXml } from '$lib/posts/sitemap';

import { STATIC_ROUTES } from './static-routes';

export const prerender = true;

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
